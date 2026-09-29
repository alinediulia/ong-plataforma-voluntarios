/* =========================================================
   BUILD DE PRODUÇÃO
   Gera a pasta dist/ com:
   - JS: todos os módulos unidos em um arquivo e minificados
   - CSS: arquivos minificados
   - HTML e imagens: copiados
   Uso: npm run build
   ========================================================= */

import { build } from "esbuild";
import { rm, mkdir, cp, readdir, stat } from "node:fs/promises";
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
    entryPoints: ["css/style.css", "css/cadastros.css"],
    minify: true,
    outdir: join(DESTINO, "css"),
    logLevel: "warning"
});


/* 4. HTML e imagens: copiados como estão */

await cp("html", join(DESTINO, "html"), { recursive: true });
await cp("img", join(DESTINO, "img"), { recursive: true });


/* 5. Relatório de tamanho (código-fonte x produção) */

const linhas = [
    ["JavaScript", "js", "js"],
    ["CSS", "css", "css"]
];

console.log("\nBuild concluída em dist/\n");

for (const [nome, origem, destino] of linhas) {
    const antes = await tamanhoDaPasta(origem);
    const depois = await tamanhoDaPasta(join(DESTINO, destino));
    const reducao = Math.round((1 - depois / antes) * 100);
    console.log(`${nome.padEnd(11)} ${emKB(antes).padStart(9)} → ${emKB(depois).padStart(9)}  (-${reducao}%)`);
}

console.log();
