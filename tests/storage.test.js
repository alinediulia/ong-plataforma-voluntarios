import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";

/* O Node não tem localStorage: criamos uma versão simples em memória */
const memoria = new Map();

globalThis.localStorage = {
    getItem: (chave) => (memoria.has(chave) ? memoria.get(chave) : null),
    setItem: (chave, valor) => memoria.set(chave, String(valor)),
    removeItem: (chave) => memoria.delete(chave)
};

const storage = await import("../js/storage.js");

beforeEach(() => memoria.clear());

test("listarVoluntarios devolve lista vazia quando não há dados", () => {
    assert.deepEqual(storage.listarVoluntarios(), []);
});

test("salvarVoluntario grava em JSON e listarVoluntarios recupera", () => {
    storage.salvarVoluntario({ nome: "Maria", area: "educacao" });

    const lista = storage.listarVoluntarios();

    assert.equal(lista.length, 1);
    assert.equal(lista[0].nome, "Maria");
    assert.ok(lista[0].id);
    assert.ok(lista[0].dataCadastro);
    assert.equal(typeof memoria.get("ong:voluntarios"), "string");
});

test("removerVoluntario remove pelo id", () => {
    storage.salvarVoluntario({ nome: "Maria" });
    const [maria] = storage.listarVoluntarios();

    storage.removerVoluntario(maria.id);

    assert.deepEqual(storage.listarVoluntarios(), []);
});

test("JSON corrompido não quebra a leitura", () => {
    memoria.set("ong:voluntarios", "{quebrado");

    assert.deepEqual(storage.listarVoluntarios(), []);
});

test("rascunho é salvo, lido e apagado", () => {
    storage.salvarRascunho({ nome: "João" });
    assert.deepEqual(storage.lerRascunho(), { nome: "João" });

    storage.limparRascunho();
    assert.equal(storage.lerRascunho(), null);
});
