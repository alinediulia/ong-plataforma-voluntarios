/* =========================================================
   TEMPLATE: CADASTRO DE VOLUNTÁRIO
   ========================================================= */

import { abrirModal } from "../components/modal.js";
import { mostrarToast } from "../components/toast.js";
import { ativarValidacao, validarFormulario, limparValidacao, validarCampo } from "../validacao.js";
import { listaVoluntarios } from "../components/listaVoluntarios.js";
import { renderizarGrafico } from "../components/graficoVoluntarios.js";
import {
    listarVoluntarios,
    salvarVoluntario,
    removerVoluntario,
    lerRascunho,
    salvarRascunho,
    limparRascunho
} from "../storage.js";


/* Campos que NÃO são guardados no navegador (dado sensível) */

const CAMPOS_NAO_SALVOS = ["cpf"];


/* Lê os campos do formulário e monta um objeto { nome: "...", email: "..." } */

function dadosDoFormulario(form) {

    const dados = Object.fromEntries(new FormData(form));

    CAMPOS_NAO_SALVOS.forEach(function (campo) {
        delete dados[campo];
    });

    return dados;

}


/* Preenche o formulário com os dados de um objeto */

function preencherFormulario(form, dados) {

    Object.keys(dados).forEach(function (nome) {

        const campo = form.elements[nome];

        if (campo && dados[nome] !== "") {
            campo.value = dados[nome];
            validarCampo(campo);
        }

    });

}


/* Redesenha a lista de voluntários a partir do localStorage */

function atualizarLista() {

    const voluntarios = listarVoluntarios();

    document.getElementById("listaVoluntarios").innerHTML = listaVoluntarios(voluntarios);
    renderizarGrafico(document.getElementById("graficoVoluntarios"), voluntarios);

}

export const cadastro = {

    titulo: "Seja Voluntário",

    html() {
        return `
            <section class="formulario pagina">
                <h1>Seja um Voluntário</h1>

                <p>
                    Preencha o formulário abaixo para fazer parte da nossa rede
                    de voluntários.
                </p>

                <p class="instrucao-formulario" id="instrucaoFormulario">
                    Todos os campos são obrigatórios.
                </p>

                <form id="formCadastro" novalidate aria-describedby="instrucaoFormulario">

                    <fieldset>
                        <legend>Dados pessoais</legend>

                        <label for="nome">Nome completo:</label>
                        <input type="text" id="nome" name="nome" autocomplete="name" required minlength="3"
                            placeholder="Digite seu nome completo">

                        <label for="email">E-mail:</label>
                        <input type="email" id="email" name="email" autocomplete="email" required placeholder="exemplo@email.com">

                        <label for="cpf">CPF:</label>
                        <input type="text" id="cpf" name="cpf" inputmode="numeric" required pattern="[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}"
                            placeholder="000.000.000-00">

                        <label for="telefone">Telefone:</label>
                        <input type="tel" id="telefone" name="telefone" autocomplete="tel-national" required pattern="\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}"
                            placeholder="(34) 99999-9999">

                        <label for="nascimento">Data de nascimento:</label>
                        <input type="date" id="nascimento" name="nascimento" autocomplete="bday" required>

                    </fieldset>

                    <fieldset>
                        <legend>Endereço</legend>

                        <label for="endereco">Endereço:</label>
                        <input type="text" id="endereco" name="endereco" autocomplete="street-address" required placeholder="Rua, número e complemento">

                        <label for="cidade">Cidade:</label>
                        <input type="text" id="cidade" name="cidade" autocomplete="address-level2" required placeholder="Digite sua cidade">

                        <label for="estado">Estado:</label>
                        <select id="estado" name="estado" autocomplete="address-level1" required>
                            <option value="">Selecione</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="GO">Goiás</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="BA">Bahia</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="PR">Paraná</option>
                        </select>

                        <label for="cep">CEP:</label>
                        <input type="text" id="cep" name="cep" autocomplete="postal-code" inputmode="numeric" required pattern="[0-9]{5}-[0-9]{3}" placeholder="00000-000">

                    </fieldset>

                    <fieldset>
                        <legend>Interesse em participar</legend>

                        <label for="area">Área de interesse:</label>

                        <select id="area" name="area" required>
                            <option value="">Selecione uma opção</option>
                            <option value="educacao">Educação</option>
                            <option value="arrecadacao">Arrecadação</option>
                            <option value="eventos">Eventos</option>
                            <option value="comunicacao">Comunicação</option>
                            <option value="outros">Outros</option>
                        </select>

                        <label for="mensagem">Por que deseja ser voluntário?</label>

                        <textarea id="mensagem" name="mensagem" rows="5" placeholder="Conte um pouco sobre seu interesse..."
                            required></textarea>

                    </fieldset>

                    <div class="acoes">
                        <button type="submit" class="botao">
                            Enviar cadastro
                        </button>

                        <button type="reset" class="botao botao-secundario">
                            Limpar
                        </button>
                    </div>

                </form>
            </section>

            <section class="pagina" aria-labelledby="tituloVoluntarios">
                <h2 id="tituloVoluntarios">Voluntários cadastrados</h2>
                <div id="graficoVoluntarios"></div>
                <div id="listaVoluntarios">
                    ${listaVoluntarios(listarVoluntarios())}
                </div>
            </section>
        `;
    },

    /* O formulário só existe depois que o HTML foi injetado */
    iniciar() {

        const form = document.getElementById("formCadastro");

        /* máscaras e validação em tempo real (eventos input/focusout) */
        ativarValidacao(form);

        /* gráfico com os voluntários já salvos */
        renderizarGrafico(document.getElementById("graficoVoluntarios"), listarVoluntarios());

        /* restaura o rascunho salvo, se houver */
        const rascunho = lerRascunho();

        if (rascunho) {
            preencherFormulario(form, rascunho);
            mostrarToast("info", "Recuperamos os dados que você começou a preencher.");
        }

        /* a cada alteração, salva o rascunho */
        form.addEventListener("input", function () {
            salvarRascunho(dadosDoFormulario(form));
        });

        form.addEventListener("submit", function (evento) {

            /* impede o envio padrão, que recarregaria a página */
            evento.preventDefault();

            const primeiroInvalido = validarFormulario(form);

            if (primeiroInvalido) {
                primeiroInvalido.focus();
                mostrarToast("erro", "Verifique os campos destacados.");
                return;
            }

            if (!salvarVoluntario(dadosDoFormulario(form))) {
                mostrarToast("erro", "Não foi possível salvar o cadastro neste navegador.");
                return;
            }

            form.reset();
            atualizarLista();
            abrirModal();

        });

        /* botão "Limpar" (e o reset após o envio) */
        form.addEventListener("reset", function () {
            limparValidacao(form);
            limparRascunho();
        });

        /* botões "Remover" da lista (delegação de eventos) */
        document.getElementById("listaVoluntarios").addEventListener("click", function (evento) {

            const botao = evento.target.closest("[data-remover-id]");

            if (!botao) {
                return;
            }

            removerVoluntario(Number(botao.dataset.removerId));
            atualizarLista();
            mostrarToast("info", "Voluntário removido.");

        });

    }

};
