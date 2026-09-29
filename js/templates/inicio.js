/* =========================================================
   TEMPLATE: INÍCIO
   Sobre a ONG + demonstração dos componentes de feedback
   ========================================================= */

import { mostrarToast } from "../components/toast.js";
import { abrirModal } from "../components/modal.js";

export const inicio = {

    titulo: "Início",

    html() {
        return `
            <section id="sobre" class="pagina">
                <h1>Sobre a ONG</h1>
                <img width="200" src="../img/ong.jpg" alt="Voluntários da ONG realizando uma ação social">
                <p>
                    Nossa ONG atua na promoção da inclusão social e na melhoria da
                    qualidade de vida da comunidade, desenvolvendo projetos e ações
                    voltados para pessoas em situação de vulnerabilidade.
                </p>
                <a href="#/cadastro" data-link class="botao">Quero ser voluntário</a>
            </section>

            <section id="feedback" class="feedback-section">
                <div class="feedback-container">

                    <h2>Componentes de Feedback</h2>
                    <p>
                        Exemplos de mensagens e elementos utilizados para
                        informar o usuário sobre ações realizadas na plataforma.
                    </p>

                    <div class="feedback-bloco">
                        <h3>Badges</h3>
                        <p>
                            As badges são utilizadas para categorizar
                            semanticamente informações dos projetos.
                        </p>
                        <div class="badges">
                            <span class="badge badge-ativo">Projeto ativo</span>
                            <span class="badge badge-andamento">Em andamento</span>
                            <span class="badge badge-concluido">Concluído</span>
                            <span class="badge badge-urgente">Urgente</span>
                            <span class="badge badge-categoria">Educação</span>
                        </div>
                    </div>

                    <div class="feedback-bloco">
                        <h3>Alertas</h3>

                        <div class="alert alert-sucesso">
                            <span class="alert-icone" aria-hidden="true">✓</span>
                            <p class="alert-texto"><strong>Sucesso!</strong> Cadastro realizado com sucesso.</p>
                        </div>

                        <div class="alert alert-info">
                            <span class="alert-icone" aria-hidden="true">i</span>
                            <p class="alert-texto"><strong>Informação:</strong> As inscrições para novos voluntários estão abertas.</p>
                        </div>

                        <div class="alert alert-aviso">
                            <span class="alert-icone" aria-hidden="true">!</span>
                            <p class="alert-texto"><strong>Atenção:</strong> As vagas para este projeto estão próximas do limite.</p>
                        </div>

                        <div class="alert alert-erro">
                            <span class="alert-icone" aria-hidden="true">×</span>
                            <p class="alert-texto"><strong>Erro:</strong> Não foi possível concluir a solicitação.</p>
                        </div>
                    </div>

                    <div class="feedback-bloco">
                        <h3>Toast</h3>
                        <p>
                            O toast apresenta uma mensagem rápida sem
                            bloquear a interação com a página.
                        </p>
                        <div class="feedback-acoes">
                            <button type="button" class="botao" id="btnToast">Exibir notificação</button>
                            <button type="button" class="botao botao-secundario" id="btnToastErro">Exibir notificação de erro</button>
                        </div>
                    </div>

                    <div class="feedback-bloco">
                        <h3>Modal</h3>
                        <p>
                            O modal apresenta uma mensagem que necessita
                            da atenção ou confirmação do usuário.
                        </p>
                        <button type="button" class="botao" id="btnModal">Abrir modal</button>
                    </div>

                </div>
            </section>
        `;
    },

    /* Os botões só existem depois que o HTML foi injetado */
    iniciar() {

        document.getElementById("btnToast").addEventListener("click", function () {
            mostrarToast("sucesso");
        });

        document.getElementById("btnToastErro").addEventListener("click", function () {
            mostrarToast("erro");
        });

        document.getElementById("btnModal").addEventListener("click", abrirModal);

    }

};
