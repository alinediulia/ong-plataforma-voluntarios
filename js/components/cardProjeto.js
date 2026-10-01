/* =========================================================
   COMPONENTE: CARTÃO DE PROJETO
   Recebe um objeto de projeto e devolve o HTML do cartão.
   ========================================================= */

import { escaparHTML } from "../utils/escaparHTML.js";


/* Cada status corresponde a uma variação de badge do CSS */

const badgesStatus = {
    ativo: { classe: "badge-ativo", texto: "Projeto ativo" },
    andamento: { classe: "badge-andamento", texto: "Em andamento" },
    concluido: { classe: "badge-concluido", texto: "Concluído" },
    urgente: { classe: "badge-urgente", texto: "Urgente" }
};


export function cardProjeto(projeto) {

    const badge = badgesStatus[projeto.status] || badgesStatus.andamento;

    /* "../img/foto.jpg" → "../img/foto.webp" (gerada por npm run imagens) */
    const imagemWebp = projeto.imagem.replace(/\.(jpe?g|png)$/i, ".webp");

    return `
        <article class="card">
            <picture>
                <source srcset="${escaparHTML(imagemWebp)}" type="image/webp">
                <img class="card-imagem"
                    src="${escaparHTML(projeto.imagem)}"
                    alt="${escaparHTML(projeto.textoAlternativo)}"
                    width="720" height="480"
                    loading="lazy" decoding="async">
            </picture>

            <div class="card-corpo">
                <div class="badges">
                    <span class="badge ${badge.classe}">${badge.texto}</span>
                    <span class="badge badge-categoria">${escaparHTML(projeto.categoria)}</span>
                </div>

                <h3>${escaparHTML(projeto.titulo)}</h3>
                <p>${escaparHTML(projeto.descricao)}</p>
            </div>
        </article>
    `;

}


/* Gera os cartões de uma lista inteira de projetos */

export function listaDeCards(projetos) {

    if (projetos.length === 0) {
        return `<p>Nenhum projeto cadastrado no momento.</p>`;
    }

    return projetos.map(cardProjeto).join("");

}
