/* =========================================================
   ROTEADOR DA SPA
   Lê o endereço depois do # (ex.: #/projetos), escolhe o
   template correspondente e injeta o HTML na div principal.
   ========================================================= */

import { inicio } from "./templates/inicio.js";
import { projetos } from "./templates/projetos.js";
import { cadastro } from "./templates/cadastro.js";
import { contato } from "./templates/contato.js";
import { naoEncontrada } from "./templates/naoEncontrada.js";


/* Mapa de rotas: caminho → template */

const rotas = {
    "/": inicio,
    "/projetos": projetos,
    "/cadastro": cadastro,
    "/contato": contato
};


/* Área onde o conteúdo de cada tela é injetado */

const app = document.getElementById("app");
const anuncioRota = document.getElementById("anuncioRota");


/* Leva o foco para o título da tela (ou para a área principal).
   Assim, quem usa teclado ou leitor de tela começa pelo conteúdo novo. */

function focarConteudo() {

    const titulo = app.querySelector("h1") || app;

    titulo.setAttribute("tabindex", "-1");
    titulo.focus({ preventScroll: true });

}


/* Descobre a rota atual a partir do endereço */

function rotaAtual() {

    /* "#/projetos" → "/projetos" | sem hash → "/" */
    return window.location.hash.slice(1) || "/";

}


/* Desenha a tela correspondente à rota atual */

function renderizar() {

    const caminho = rotaAtual();
    const pagina = rotas[caminho] || naoEncontrada;

    /* 1. Injeta o HTML do template na div principal */
    app.innerHTML = pagina.html();

    /* 2. Liga os eventos dos elementos que acabaram de ser criados */
    if (pagina.iniciar) {
        pagina.iniciar();
    }

    /* 3. Atualiza título da aba, menu, rolagem e foco */
    document.title = pagina.titulo + " | ONG";
    marcarLinkAtivo(caminho);
    window.scrollTo(0, 0);

    /* 4. Acessibilidade: foco no título e anúncio da nova página */
    focarConteudo();
    anuncioRota.textContent = "Página carregada: " + pagina.titulo;

}


/* Destaca no menu o link da página atual */

function marcarLinkAtivo(caminho) {

    const links = document.querySelectorAll(".menu a[data-link]");

    links.forEach(function (link) {

        if (link.getAttribute("href") === "#" + caminho) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }

    });

}


/* Navega para outra rota sem recarregar a página */

export function navegar(caminho) {

    if (rotaAtual() === caminho) {
        /* clicou na página em que já está: só redesenha */
        renderizar();
    } else {
        /* muda o hash; o evento "hashchange" chama renderizar() */
        window.location.hash = caminho;
    }

}


/* Liga o roteador */

export function iniciarRouter() {

    /* Intercepta os cliques nos links internos (data-link) */
    document.addEventListener("click", function (evento) {

        /* "Pular para o conteúdo": não é uma rota, só move o foco */
        if (evento.target.closest("#pularConteudo")) {
            evento.preventDefault();
            focarConteudo();
            return;
        }

        const link = evento.target.closest("a[data-link]");

        if (!link) {
            return;
        }

        evento.preventDefault();

        /* "#/projetos" → "/projetos" */
        navegar(link.getAttribute("href").slice(1));

    });

    /* Voltar/avançar do navegador ou hash digitado na barra */
    window.addEventListener("hashchange", renderizar);

    /* Primeira renderização, ao abrir o site */
    renderizar();

}
