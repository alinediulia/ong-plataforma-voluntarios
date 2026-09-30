/* =========================================================
   COMPONENTE: TEMA DE CORES
   Opções: automático (segue o sistema), claro, escuro e
   alto contraste. O tema é aplicado pelo atributo data-tema
   no <html>; as cores de cada tema estão em css/temas.css.
   ========================================================= */

import { lerTema, salvarTema } from "../storage.js";

const TEMAS_VALIDOS = ["auto", "claro", "escuro", "alto-contraste"];

const seletor = document.getElementById("seletorTema");

/* preferências do sistema operacional */
const sistemaEscuro = window.matchMedia("(prefers-color-scheme: dark)");
const sistemaAltoContraste = window.matchMedia("(prefers-contrast: more)");


/* "auto" vira o tema real, de acordo com o sistema */

function resolverTema(preferencia) {

    if (preferencia !== "auto") {
        return preferencia;
    }

    if (sistemaAltoContraste.matches) {
        return "alto-contraste";
    }

    return sistemaEscuro.matches ? "escuro" : "claro";

}


/* Aplica o tema e avisa quem precisa redesenhar (ex.: gráfico) */

function aplicarTema(preferencia) {

    document.documentElement.dataset.tema = resolverTema(preferencia);

    window.dispatchEvent(new CustomEvent("temaalterado"));

}


export function iniciarTema() {

    let preferencia = lerTema();

    if (!TEMAS_VALIDOS.includes(preferencia)) {
        preferencia = "auto";
    }

    seletor.value = preferencia;
    aplicarTema(preferencia);

    /* o usuário escolheu um tema no seletor */
    seletor.addEventListener("change", function () {
        preferencia = seletor.value;
        salvarTema(preferencia);
        aplicarTema(preferencia);
    });

    /* no modo automático, acompanha mudanças no sistema */
    function aoMudarSistema() {
        if (preferencia === "auto") {
            aplicarTema(preferencia);
        }
    }

    sistemaEscuro.addEventListener("change", aoMudarSistema);
    sistemaAltoContraste.addEventListener("change", aoMudarSistema);

}
