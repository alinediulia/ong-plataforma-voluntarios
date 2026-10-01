import { test } from "node:test";
import assert from "node:assert/strict";
import { escaparHTML } from "../js/utils/escaparHTML.js";
import { cardProjeto } from "../js/components/cardProjeto.js";

test("escaparHTML converte caracteres especiais", () => {
    assert.equal(escaparHTML(`<b>"A" & 'B'</b>`), "&lt;b&gt;&quot;A&quot; &amp; &#39;B&#39;&lt;/b&gt;");
});

test("cardProjeto não permite injeção de HTML", () => {
    const html = cardProjeto({
        titulo: "<img src=x onerror=alert(1)>",
        status: "urgente",
        categoria: "Teste",
        descricao: "Descrição",
        imagem: "a.jpg",
        textoAlternativo: "Imagem"
    });

    assert.ok(!html.includes("<img src=x"));
    assert.ok(html.includes("badge-urgente"));
});

test("cardProjeto usa badge padrão para status desconhecido", () => {
    const html = cardProjeto({
        titulo: "Projeto", status: "inexistente", categoria: "", descricao: "", imagem: "", textoAlternativo: ""
    });

    assert.ok(html.includes("badge-andamento"));
});

test("cardProjeto oferece WebP com JPEG de reserva e carregamento tardio", () => {
    const html = cardProjeto({
        titulo: "Projeto", status: "ativo", categoria: "", descricao: "",
        imagem: "../img/foto.jpg", textoAlternativo: "Foto"
    });

    assert.ok(html.includes('srcset="../img/foto.webp" type="image/webp"'));
    assert.ok(html.includes('src="../img/foto.jpg"'));
    assert.ok(html.includes('loading="lazy"'));
});
