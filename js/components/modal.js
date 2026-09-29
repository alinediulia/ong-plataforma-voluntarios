/* =========================================================
   COMPONENTE: MODAL
   O HTML do modal fica fixo no index.html.
   ========================================================= */

const modal = document.getElementById("modal");
const fecharModalBotao = document.getElementById("fecharModal");
const confirmarModal = document.getElementById("confirmarModal");

/* guarda quem abriu o modal para devolver o foco depois */
let elementoAnterior = null;


export function abrirModal() {

    elementoAnterior = document.activeElement;

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");

    /* leva o foco para dentro do modal (acessibilidade) */
    confirmarModal.focus();

}


export function fecharModal() {

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");

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

    });

}
