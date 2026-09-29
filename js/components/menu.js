/* =========================================================
   COMPONENTE: MENU (versão celular)
   Em telas pequenas, o menu fica recolhido atrás de um
   botão ☰. Este módulo abre e fecha o menu.
   ========================================================= */

const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menuPrincipal");


export function abrirMenu() {

    menu.classList.add("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "true");
    botaoMenu.setAttribute("aria-label", "Fechar menu");

}


export function fecharMenu() {

    menu.classList.remove("menu-aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");

}


export function iniciarMenu() {

    /* clique no ☰: alterna entre aberto e fechado */
    botaoMenu.addEventListener("click", function () {

        if (menu.classList.contains("menu-aberto")) {
            fecharMenu();
        } else {
            abrirMenu();
        }

    });

    /* ao trocar de página, o menu se fecha sozinho */
    window.addEventListener("hashchange", fecharMenu);

    document.addEventListener("keydown", function (evento) {

        if (evento.key === "Escape") {
            fecharMenu();
        }

    });

}
