# Plataforma ONG — Voluntariado e Projetos

Aplicação web (Single Page Application) para uma organização não governamental divulgar seus projetos, receber cadastros de voluntários e acompanhar o interesse por área de atuação.

Desenvolvida com **HTML5, CSS3 e JavaScript puro (ES6 Modules)**, sem frameworks.

## Funcionalidades

- **Navegação SPA** por hash (`#/projetos`), sem recarregar a página, com suporte aos botões Voltar/Avançar
- **Templates em JavaScript** alimentados por dados (cartões de projetos gerados a partir de uma lista)
- **Formulário de cadastro** com validação em tempo real, máscaras (CPF, telefone, CEP) e verificação de consistência (dígitos do CPF, idade mínima, e-mail)
- **Persistência no `localStorage`**: lista de voluntários e rascunho automático do formulário
- **Gráfico de voluntários por área** com [Chart.js](https://www.chartjs.org/) carregado sob demanda via CDN
- **Componentes de feedback**: badges, alertas, toast e modal
- **Layout responsivo** e recursos de acessibilidade (ARIA, foco visível, navegação por teclado)

## Como executar

Os módulos JavaScript (`type="module"`) **não funcionam abrindo o arquivo com duplo clique** (`file://`). É preciso um servidor local:

**Opção 1 — VS Code:** instale a extensão *Live Server*, clique com o botão direito em `index.html` e escolha **Open with Live Server**.

**Opção 2 — terminal:**

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000/html/index.html`.

## Estrutura de pastas

```
├── html/
│   └── index.html            # página única: cabeçalho, <main id="app">, rodapé, toast e modal
├── css/
│   ├── style.css             # variáveis de design, layout, componentes
│   └── cadastros.css         # botões, formulário e estados de validação
├── img/                      # imagens dos projetos e logotipo
└── js/
    ├── main.js               # ponto de entrada
    ├── router.js             # roteamento da SPA
    ├── validacao.js          # regras de validação do formulário
    ├── storage.js            # leitura e gravação no localStorage
    ├── dados/                # dados dos projetos
    ├── templates/            # uma tela por arquivo
    ├── components/           # toast, modal, menu, cartões, lista, gráfico
    └── utils/                # funções puras (máscaras, escape de HTML)
```

## Arquitetura

O código segue **responsabilidade única** e **dependências em uma só direção**:

```
main.js → router.js → templates → components / validacao.js / storage.js → utils
```

Módulos de baixo nunca importam os de cima. Cada template exporta o mesmo contrato:

```js
export const exemplo = {
    titulo: "Título da aba",
    html() { return `...`; },      // HTML da tela
    iniciar() { /* eventos */ }    // opcional, roda após a injeção no DOM
};
```

**Para criar uma nova página:** crie o arquivo em `js/templates/` e registre a rota no objeto `rotas` em `js/router.js`.

## Dados salvos no navegador

| Chave | Conteúdo |
|---|---|
| `ong:voluntarios` | Array de voluntários cadastrados |
| `ong:rascunhoCadastro` | Rascunho do formulário em preenchimento |

Por ser dado sensível, o **CPF não é armazenado**.

## Fluxo de trabalho (GitFlow)

| Branch | Uso |
|---|---|
| `main` | Somente versões lançadas (cada merge recebe uma tag, ex.: `v1.0.0`) |
| `develop` | Integração contínua do desenvolvimento |
| `feature/*` | Uma branch por funcionalidade, criada a partir de `develop` |
| `release/*` | Preparação de uma versão (changelog, ajustes finais) |
| `hotfix/*` | Correção urgente criada a partir de `main` |

Os commits seguem o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat:`, `fix:`, `docs:`, `chore:`, `style:`, `refactor:`.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Flexbox, Grid, media queries)
- JavaScript ES6+ (módulos, template literals, `localStorage`)
- [Chart.js 4.4.1](https://www.chartjs.org/) via [jsDelivr](https://www.jsdelivr.com/)
