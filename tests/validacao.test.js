import { test } from "node:test";
import assert from "node:assert/strict";
import { cpfValido, calcularIdade } from "../js/validacao.js";

test("cpfValido aceita CPF com dígitos verificadores corretos", () => {
    assert.equal(cpfValido("529.982.247-25"), true);
});

test("cpfValido rejeita dígitos verificadores errados", () => {
    assert.equal(cpfValido("529.982.247-26"), false);
});

test("cpfValido rejeita sequências repetidas", () => {
    assert.equal(cpfValido("111.111.111-11"), false);
});

test("cpfValido rejeita tamanho incorreto", () => {
    assert.equal(cpfValido("123"), false);
});

test("calcularIdade considera se o aniversário já passou", () => {
    const hoje = new Date();
    const fezAniversario = new Date(hoje.getFullYear() - 20, 0, 1);
    const amanha = new Date(hoje.getFullYear() - 20, hoje.getMonth(), hoje.getDate() + 1);

    assert.equal(calcularIdade(fezAniversario), 20);
    assert.equal(calcularIdade(amanha), 19);
});
