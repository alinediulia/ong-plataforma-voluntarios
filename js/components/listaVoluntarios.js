/* =========================================================
   COMPONENTE: LISTA DE VOLUNTÁRIOS
   Recebe o array salvo no localStorage e devolve o HTML.
   ========================================================= */

import { escaparHTML } from "../utils/escaparHTML.js";


const nomesAreas = {
    educacao: "Educação",
    arrecadacao: "Arrecadação",
    eventos: "Eventos",
    comunicacao: "Comunicação",
    outros: "Outros"
};


function itemVoluntario(voluntario) {

    const area = nomesAreas[voluntario.area] || "Outros";
    const data = new Date(voluntario.dataCadastro).toLocaleDateString("pt-BR");

    return `
        <li class="voluntario">
            <div>
                <strong>${escaparHTML(voluntario.nome)}</strong>
                <p>${escaparHTML(voluntario.cidade)} - ${escaparHTML(voluntario.estado)} · cadastrado em ${data}</p>
            </div>

            <span class="badge badge-categoria">${area}</span>

            <button type="button" class="voluntario-remover"
                data-remover-id="${Number(voluntario.id)}"
                aria-label="Remover ${escaparHTML(voluntario.nome)}">
                Remover
            </button>
        </li>
    `;

}


export function listaVoluntarios(voluntarios) {

    if (voluntarios.length === 0) {
        return `
            <div class="alert alert-info" role="status">
                <span class="alert-icone" aria-hidden="true">i</span>
                <p class="alert-texto">Nenhum voluntário cadastrado ainda. Seja o primeiro!</p>
            </div>
        `;
    }

    return `
        <p>${voluntarios.length} voluntário(s) cadastrado(s) neste navegador.</p>
        <ul class="voluntarios">
            ${voluntarios.map(itemVoluntario).join("")}
        </ul>
    `;

}
