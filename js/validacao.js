/* =========================================================
   VALIDAÇÃO DE FORMULÁRIOS
   Usa as regras que já estão no HTML (required, pattern,
   minlength, type="email") e mostra mensagens próprias,
   no lugar dos balões padrão do navegador.
   ========================================================= */

import { mascaraCPF, mascaraTelefone, mascaraCEP } from "./utils/mascaras.js";


/* Campo (id) → função de máscara */

const mascaras = {
    cpf: mascaraCPF,
    telefone: mascaraTelefone,
    cep: mascaraCEP
};


/* =========================================================
   REGRAS EXTRAS DE CONSISTÊNCIA
   O HTML confere formato e preenchimento; estas funções
   conferem se o valor faz sentido. Cada uma devolve a
   mensagem de erro, ou "" quando está tudo certo.
   ========================================================= */

const IDADE_MINIMA = 16;


/* Confere os dois dígitos verificadores do CPF */

export function cpfValido(cpf) {

    const numeros = cpf.replace(/\D/g, "");

    /* 000.000.000-00, 111.111.111-11... passam no cálculo, mas não existem */
    if (numeros.length !== 11 || /^(\d)\1{10}$/.test(numeros)) {
        return false;
    }

    /* calcula o dígito verificador a partir dos "tamanho" primeiros números */
    function digito(tamanho) {

        let soma = 0;

        for (let i = 0; i < tamanho; i++) {
            soma += Number(numeros[i]) * (tamanho + 1 - i);
        }

        const resto = (soma * 10) % 11;

        return resto === 10 ? 0 : resto;

    }

    return digito(9) === Number(numeros[9]) && digito(10) === Number(numeros[10]);

}


/* Calcula a idade em anos completos */

export function calcularIdade(dataNascimento) {

    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    const aindaNaoFezAniversario =
        hoje.getMonth() < dataNascimento.getMonth() ||
        (hoje.getMonth() === dataNascimento.getMonth() && hoje.getDate() < dataNascimento.getDate());

    if (aindaNaoFezAniversario) {
        idade--;
    }

    return idade;

}


/* Campo (id) → regra extra */

const regrasExtras = {

    /* o type="email" aceita "a@b"; aqui exigimos um domínio com ponto */
    email: function (valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)
            ? ""
            : "Digite um e-mail válido, como nome@email.com.";
    },

    cpf: function (valor) {
        return cpfValido(valor) ? "" : "CPF inválido. Confira os números digitados.";
    },

    nascimento: function (valor) {

        /* "2000-01-31" → data local (sem o fuso deslocar o dia) */
        const [ano, mes, dia] = valor.split("-").map(Number);
        const data = new Date(ano, mes - 1, dia);

        if (data > new Date()) {
            return "A data de nascimento não pode estar no futuro.";
        }

        if (calcularIdade(data) < IDADE_MINIMA) {
            return "É preciso ter pelo menos " + IDADE_MINIMA + " anos para se cadastrar.";
        }

        return "";

    }

};


/* Aplica a regra extra do campo (se houver) antes da validação.
   setCustomValidity("mensagem") marca o campo como inválido;
   setCustomValidity("") marca como válido. */

function aplicarRegrasExtras(campo) {

    const valor = campo.value;
    let erro = "";

    /* campo vazio fica por conta do "required" */
    if (valor !== "") {

        if (valor.trim() === "") {
            erro = "Este campo não pode conter apenas espaços.";
        } else if (campo.minLength > 0 && valor.trim().length < campo.minLength) {
            /* espaços nas pontas não contam como caracteres */
            erro = "Digite pelo menos " + campo.minLength + " caracteres.";
        } else if (regrasExtras[campo.id] && campo.validity.patternMismatch === false) {
            erro = regrasExtras[campo.id](valor);
        }

    }

    campo.setCustomValidity(erro);

}


/* Mensagem para cada tipo de regra quebrada */

function mensagemDeErro(campo) {

    const regra = campo.validity;

    if (regra.valueMissing) {
        return "Este campo é obrigatório.";
    }

    if (regra.typeMismatch) {
        return "Digite um e-mail válido, como nome@email.com.";
    }

    if (regra.tooShort) {
        return "Digite pelo menos " + campo.minLength + " caracteres.";
    }

    if (regra.patternMismatch) {
        return "Use o formato " + campo.placeholder + ".";
    }

    /* erro vindo das regras extras (setCustomValidity) */
    if (regra.customError) {
        return campo.validationMessage;
    }

    return "Valor inválido.";

}


/* Cria (uma vez só) o espaço da mensagem logo abaixo do campo */

function elementoMensagem(campo) {

    const id = "erro-" + campo.id;
    let mensagem = document.getElementById(id);

    if (!mensagem) {
        mensagem = document.createElement("span");
        mensagem.id = id;
        mensagem.className = "mensagem-erro";
        campo.insertAdjacentElement("afterend", mensagem);

        /* leitores de tela leem a mensagem junto com o campo */
        campo.setAttribute("aria-describedby", id);
    }

    return mensagem;

}


/* Valida um campo e atualiza as classes e a mensagem.
   Devolve true se o campo estiver válido. */

export function validarCampo(campo) {

    const mensagem = elementoMensagem(campo);

    aplicarRegrasExtras(campo);
    const valido = campo.checkValidity();

    campo.classList.toggle("campo-valido", valido);
    campo.classList.toggle("campo-invalido", !valido);
    campo.setAttribute("aria-invalid", String(!valido));

    mensagem.textContent = valido ? "" : mensagemDeErro(campo);

    return valido;

}


/* Valida todos os campos. Devolve o primeiro inválido, ou null. */

export function validarFormulario(form) {

    let primeiroInvalido = null;

    form.querySelectorAll("input, select, textarea").forEach(function (campo) {

        if (!validarCampo(campo) && !primeiroInvalido) {
            primeiroInvalido = campo;
        }

    });

    return primeiroInvalido;

}


/* Remove as marcações de validação (usado ao limpar o formulário) */

export function limparValidacao(form) {

    form.querySelectorAll(".campo-valido, .campo-invalido").forEach(function (campo) {
        campo.classList.remove("campo-valido", "campo-invalido");
        campo.removeAttribute("aria-invalid");
    });

    form.querySelectorAll(".mensagem-erro").forEach(function (mensagem) {
        mensagem.textContent = "";
    });

}


/* Liga a validação em tempo real a um formulário */

export function ativarValidacao(form) {

    /* input: dispara a cada tecla digitada */
    form.addEventListener("input", function (evento) {

        const campo = evento.target;
        const mascara = mascaras[campo.id];

        if (mascara) {
            campo.value = mascara(campo.value);
        }

        /* só revalida enquanto digita se o campo já foi avaliado,
           para não mostrar erro antes de a pessoa terminar */
        if (campo.classList.contains("campo-valido") || campo.classList.contains("campo-invalido")) {
            validarCampo(campo);
        }

    });

    /* focusout: dispara quando o usuário sai do campo */
    form.addEventListener("focusout", function (evento) {

        const campo = evento.target;

        if (campo.matches("input, select, textarea") && campo.value !== "") {
            validarCampo(campo);
        }

    });

    /* change: selects mudam sem digitação */
    form.addEventListener("change", function (evento) {

        if (evento.target.matches("select")) {
            validarCampo(evento.target);
        }

    });

}
