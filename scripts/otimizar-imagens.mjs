/* =========================================================
   OTIMIZAÇÃO DE IMAGENS
   Lê as fotos originais em img/originais/ e gera, em img/:
   - uma versão WebP (formato principal, bem menor)
   - uma versão JPEG otimizada (reserva para navegadores antigos)

   Cada imagem é redimensionada para o DOBRO da largura em que
   aparece na tela, para ficar nítida em telas de alta densidade
   (celulares e notebooks "retina"), sem desperdiçar bytes.

   Uso: npm run imagens
   ========================================================= */

import sharp from "sharp";
import { stat } from "node:fs/promises";
import { join } from "node:path";

const ORIGEM = "img/originais";
const DESTINO = "img";

/* largura = 2 × a largura exibida na página */
const imagens = [
    { arquivo: "logo.jpg", nome: "logo", largura: 240 },                                    // exibida com 120px
    { arquivo: "ong.jpg", nome: "ong", largura: 400 },                                      // exibida com 200px
    { arquivo: "projeto-educacao.jpg", nome: "projeto-educacao", largura: 720 },            // cartão com até 360px
    { arquivo: "projeto-solidariedade.jpeg", nome: "projeto-solidariedade", largura: 720 },
    { arquivo: "projeto-voluntariado.jpg", nome: "projeto-voluntariado", largura: 720 }
];

function emKB(bytes) {
    return (bytes / 1024).toFixed(0).padStart(4) + " KB";
}

let totalOriginal = 0;
let totalWebp = 0;
let totalJpeg = 0;

console.log("\nImagem                    Original    WebP    JPEG   Dimensões");

for (const imagem of imagens) {

    const entrada = join(ORIGEM, imagem.arquivo);

    /* withoutEnlargement: nunca aumenta uma imagem menor que a largura pedida */
    const redimensionada = sharp(entrada).resize({ width: imagem.largura, withoutEnlargement: true });

    const webp = await redimensionada.clone()
        .webp({ quality: 75, effort: 6 })
        .toFile(join(DESTINO, imagem.nome + ".webp"));

    await redimensionada.clone()
        .jpeg({ quality: 78, mozjpeg: true, progressive: true })
        .toFile(join(DESTINO, imagem.nome + ".jpg"));

    const original = (await stat(entrada)).size;
    const jpeg = (await stat(join(DESTINO, imagem.nome + ".jpg"))).size;

    totalOriginal += original;
    totalWebp += webp.size;
    totalJpeg += jpeg;

    console.log(
        imagem.nome.padEnd(24),
        emKB(original).padStart(9),
        emKB(webp.size),
        emKB(jpeg),
        "  " + webp.width + "×" + webp.height
    );

}

const reducao = Math.round((1 - totalWebp / totalOriginal) * 100);

console.log("-".repeat(64));
console.log("Total".padEnd(24), emKB(totalOriginal).padStart(9), emKB(totalWebp), emKB(totalJpeg));
console.log(`\nWebP: ${reducao}% menor que os originais.\n`);
