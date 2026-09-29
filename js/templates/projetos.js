/* =========================================================
   TEMPLATE: PROJETOS
   ========================================================= */

import { listaProjetos } from "../dados/projetos.js";
import { listaDeCards } from "../components/cardProjeto.js";

export const projetos = {

    titulo: "Projetos",

    html() {
        return `
            <section id="apresentacao" class="pagina">
                <h1>Nossos Projetos</h1>
                <p>
                    Conheça as iniciativas desenvolvidas pela nossa ONG para promover a
                    inclusão social e contribuir para uma comunidade mais justa e solidária.
                </p>
            </section>

            <section id="projetos" class="pagina">
                <h2>Conheça nossas iniciativas</h2>

                <div class="cards">
                    ${listaDeCards(listaProjetos)}
                </div>
            </section>

            <section id="doacoes" class="pagina">
                <h2>Faça uma doação</h2>
                <p>Sua contribuição ajuda a manter nossos projetos e ampliar o atendimento às pessoas que precisam.</p>
                <h3>Como contribuir</h3>
                <ul>
                    <li>Doação financeira</li>
                    <li>Doação de alimentos</li>
                    <li>Doação de roupas e materiais</li>
                </ul>
                <p>Para saber mais sobre como contribuir, <a href="#/contato" data-link>entre em contato conosco</a>.</p>
            </section>

            <section id="voluntariado" class="pagina">
                <h2>Seja um voluntário</h2>
                <p>Você pode fazer parte dos nossos projetos oferecendo seu tempo, conhecimento e habilidades.</p>
                <h3>Como participar</h3>
                <ol>
                    <li>Acesse a página de cadastro.</li>
                    <li>Preencha seus dados.</li>
                    <li>Informe seu interesse em atuar como voluntário.</li>
                    <li>Aguarde nosso contato.</li>
                </ol>
                <a href="#/cadastro" data-link class="botao">Quero ser voluntário</a>
            </section>
        `;
    }

};
