/* =========================================================
   BUILD DE PRODUÇÃO
   Gera a pasta dist/ com:
   - JS: todos os módulos unidos em um arquivo e minificados
   - CSS: arquivos minificados
   - HTML: minificado (incluindo o script do <head>)
   - imagens: copia só as versões otimizadas (npm run imagens)
   Uso: npm run build
   ========================================================= */

import { build } from "esbuild";
import { minify } from "html-minifier-terser";
import { rm, mkdir, cp, readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const DESTINO = "dist";


/* Soma o tamanho de todos os arquivos de uma pasta */

async function tamanhoDaPasta(pasta) {

    let total = 0;

    for (const item of await readdir(pasta, { withFileTypes: true })) {
        const caminho = join(pasta, item.name);
        total += item.isDirectory() ? await tamanhoDaPasta(caminho) : (await stat(caminho)).size;
    }

    return total;

}

function emKB(bytes) {
    return (bytes / 1024).toFixed(1) + " KB";
}


/* 1. Limpa a build anterior */

await rm(DESTINO, { recursive: true, force: true });
await mkdir(DESTINO);


/* 2. JavaScript: junta os módulos a partir do main.js e minifica */

await build({
    entryPoints: ["js/main.js"],
    bundle: true,
    minify: true,
    format: "esm",
    target: "es2020",
    outfile: join(DESTINO, "js/main.js"),
    logLevel: "warning"
});


/* 3. CSS: minifica cada arquivo */

await build({
    entryPoints: ["css/style.css", "css/cadastros.css", "css/temas.css"],
    minify: true,
    outdir: join(DESTINO, "css"),
    logLevel: "warning"
});


/* 4. HTML: remove comentários e espaços e minifica o script do <head> */

await mkdir(join(DESTINO, "html"));

for (const arquivo of await readdir("html")) {

    if (!arquivo.endsWith(".html")) {
        continue;
    }

    const original = await readFile(join("html", arquivo), "utf8");

    const minificado = await minify(original, {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyJS: true,
        minifyCSS: true
    });

    await writeFile(join(DESTINO, "html", arquivo), minificado);

}


/* 5. Imagens: copia as versões otimizadas (WebP e JPEG).
      Os originais em img/originais/ não vão para produção. */

await cp("img", join(DESTINO, "img"), {
    recursive: true,
    filter: (caminho) => !caminho.includes("originais")
});


/* 6. Relatório de tamanho (código-fonte x produção) */

const linhas = [
    ["JavaScript", "js", "js"],
    ["CSS", "css", "css"],
    ["HTML", "html", "html"],
    ["Imagens*", "img/originais", "img"]
];

console.log("\nBuild concluída em dist/\n");

for (const [nome, origem, destino] of linhas) {
    const antes = await tamanhoDaPasta(origem);
    const depois = await tamanhoDaPasta(join(DESTINO, destino));
    const reducao = Math.round((1 - depois / antes) * 100);
    console.log(`${nome.padEnd(11)} ${emKB(antes).padStart(9)} → ${emKB(depois).padStart(9)}  (-${reducao}%)`);
}

console.log("\n* WebP + JPEG somados; o navegador baixa só um dos dois (WebP).");
console.log();
