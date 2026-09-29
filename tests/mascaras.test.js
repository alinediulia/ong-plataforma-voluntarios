import { test } from "node:test";
import assert from "node:assert/strict";
import { mascaraCPF, mascaraTelefone, mascaraCEP } from "../js/utils/mascaras.js";

test("mascaraCPF formata 11 dígitos", () => {
    assert.equal(mascaraCPF("52998224725"), "529.982.247-25");
});

test("mascaraCPF ignora letras e limita o tamanho", () => {
    assert.equal(mascaraCPF("529a982b24725999"), "529.982.247-25");
});

test("mascaraCPF formata parcialmente enquanto digita", () => {
    assert.equal(mascaraCPF("5299"), "529.9");
});

test("mascaraTelefone formata celular e fixo", () => {
    assert.equal(mascaraTelefone("34999999999"), "(34) 99999-9999");
    assert.equal(mascaraTelefone("3433334444"), "(34) 3333-4444");
});

test("mascaraCEP formata 8 dígitos", () => {
    assert.equal(mascaraCEP("38400000"), "38400-000");
});
