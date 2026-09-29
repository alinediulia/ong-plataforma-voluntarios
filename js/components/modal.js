/* =========================================================
   COMPONENTE: MODAL
   O HTML do modal fica fixo no index.html.
   ========================================================= */

const modal = document.getElementById("modal");
const fecharModalBotao = document.getElementById("fecharModal");
const confirmarModal = document.getElementById("confirmarModal");

/* guarda quem abriu o modal para devolver o foco depois */
let elementoAnterior = null;


/* Com o modal aberto, o resto da página fica "inerte":
   não recebe clique, foco nem é lido por leitores de tela */

function bloquearFundo(bloquear) {

    document.querySelectorAll("body > *:not(#modal):not(script)").forEach(function (elemento) {
        elemento.inert = bloquear;
    });

}


/* Mantém o Tab circulando só entre os botões do modal */

function prenderFoco(evento) {

    if (evento.key !== "Tab" || !modal.classList.contains("aberto")) {
        return;
    }

    const focaveis = modal.querySelectorAll("button, a[href], input, select, textarea");
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
    }

}


export function abrirModal() {

    elementoAnterior = document.activeElement;

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");
    bloquearFundo(true);

    /* leva o foco para dentro do modal (acessibilidade) */
    confirmarModal.focus();

}


export function fecharModal() {

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");
    bloquearFundo(false);

    /* devolve o foco para quem abriu, se ele ainda estiver na tela */
    if (modal.contains(document.activeElement) && elementoAnterior && document.contains(elementoAnterior)) {
        elementoAnterior.focus();
    }

}


export function iniciarModal() {

    fecharModalBotao.addEventListener("click", fecharModal);
    confirmarModal.addEventListener("click", fecharModal);

    /* Fechar clicando fora do conteúdo */
    modal.addEventListener("click", function (evento) {

        if (evento.target === modal) {
            fecharModal();
        }

    });

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {
            fecharModal();
        }

        prenderFoco(evento);

    });

}
