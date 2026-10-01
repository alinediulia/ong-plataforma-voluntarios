# Changelog

Todas as mudanças relevantes do projeto são registradas aqui.
O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto usa [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.2.0] - 2026-09-30

### Adicionado
- Deploy automático no GitHub Pages com GitHub Actions (testes e build a cada push na `main`)
- Script `npm run imagens`: imagens em WebP com JPEG de reserva, redimensionadas para o tamanho exibido
- Minificação do HTML na build de produção

### Alterado
- Imagens passam de 2.026 KB para 163 KB (−92%); peso da tela inicial de 1.371 KB para 66 KB

## [1.1.0] - 2026-09-30

### Adicionado
- Temas escuro e alto contraste, com opção automática que segue o sistema
- Adequação à WCAG 2.1 nível AA: link "Pular para o conteúdo", foco no título e anúncio a cada troca de tela, foco preso no modal, `autocomplete` nos campos
- Testes automatizados com `node --test`
- Build de produção com esbuild (`npm run build`)
- README com pré-requisitos, instalação, build, testes, acessibilidade e temas

### Corrigido
- Contraste insuficiente no badge de categoria, no contorno de foco, na borda dos campos e nos ícones de sucesso e aviso

## [1.0.1] - 2026-09-29

### Corrigido
- O foco não entrava no modal ao abri-lo: o `visibility` animado do modal e o `transition: all` do `.botao` deixavam o botão invisível no instante do `focus()`

## [1.0.0] - 2026-09-29

### Adicionado
- Single Page Application com roteamento por hash
- Templates de telas: início, projetos, cadastro, contato e página não encontrada
- Cartões de projetos gerados a partir de dados
- Validação do formulário em tempo real, com máscaras e regras de consistência
- Persistência de voluntários e rascunho no `localStorage`
- Gráfico de voluntários por área com Chart.js
- Componentes de feedback: badges, alertas, toast e modal
- Menu recolhível para celular
- README com instruções e arquitetura

### Removido
- Páginas HTML e script antigos, substituídos pela SPA
