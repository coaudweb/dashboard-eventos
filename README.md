# Dashboard de Eventos

Dashboard interativo em tempo real para acompanhamento de eventos, com integração direta ao Google Sheets e atualização automática a cada 10 minutos.

![Dashboard Preview](https://via.placeholder.com/800x400?text=Dashboard+de+Eventos)

## 🚀 Funcionalidades

### Estatísticas em Tempo Real
- **Ano Atual**: Total de eventos e eventos cancelados
- **Mês Atual**: Total de eventos e eventos cancelados com taxa de cancelamento
- **Dia Atual**: 
  - Total de eventos
  - Eventos cancelados
  - Eventos finalizados
  - Eventos a iniciar
  - Eventos em andamento

### Visualizações
- **Tabela Mensal**: Visão completa de janeiro a dezembro com totais, cancelamentos e taxa de cancelamento
- **Gráficos por Local**: 
  - Eventos por local no mês atual
  - Eventos por local no ano atual

### Recursos Técnicos
- ✅ Atualização automática a cada 10 minutos
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Tema escuro moderno com paleta azul e roxo
- ✅ Integração direta com Google Sheets (sem necessidade de API key)
- ✅ Gráficos interativos com Recharts

## 🛠️ Tecnologias

- **React 19** - Framework frontend
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **shadcn/ui** - Componentes UI
- **Recharts** - Gráficos interativos
- **Vite** - Build tool
- **Google Sheets API** - Fonte de dados

## 📋 Pré-requisitos

- Node.js 18+ 
- pnpm (gerenciador de pacotes)

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/dashboard-eventos.git
cd dashboard-eventos
```

2. Instale as dependências:
```bash
pnpm install
```

3. Configure a URL da planilha:

Edite o arquivo `client/src/hooks/useGoogleSheets.ts` e atualize a constante `SHEET_URL` com a URL da sua planilha do Google Sheets:

```typescript
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/SEU_ID_AQUI/gviz/tq?tqx=out:json&gid=0';
```

**Importante**: A planilha precisa estar configurada como "Qualquer pessoa com o link pode visualizar".

4. Inicie o servidor de desenvolvimento:
```bash
pnpm dev
```

O dashboard estará disponível em `http://localhost:3000`

## 📊 Estrutura da Planilha

A planilha do Google Sheets deve conter as seguintes colunas (aba "Agenda"):

| Coluna | Nome | Tipo | Descrição |
|--------|------|------|-----------|
| A | idAgenda | string | ID único do evento |
| B | dataEvento | date | Data do evento (DD/MM/YYYY) |
| C | local | string | Local do evento |
| D | horaPrevista | datetime | Hora prevista (HH:mm:ss) |
| E | indicacaoCancelamento | string | Indicação se foi cancelado |
| F | horaInicioEvento | datetime | Hora de início real |
| G | horaTerminoEvento | datetime | Hora de término real |
| H | hablitHoraEvento | boolean | Flag de habilitação |
| I | Check | string | Campo de verificação |
| J | Ficha | string | Número da ficha |
| K | Status | string | Status do evento (Finalizado, à iniciar, Andamento) |

## 🏗️ Estrutura do Projeto

```
dashboard-eventos/
├── client/
│   ├── public/          # Arquivos estáticos
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   │   ├── ui/      # Componentes shadcn/ui
│   │   │   ├── StatCard.tsx
│   │   │   ├── MonthlyTable.tsx
│   │   │   └── LocationChart.tsx
│   │   ├── hooks/       # Custom hooks
│   │   │   └── useGoogleSheets.ts
│   │   ├── lib/         # Utilitários
│   │   │   └── stats.ts
│   │   ├── pages/       # Páginas
│   │   │   └── Home.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── index.html
├── package.json
└── README.md
```

## 🎨 Personalização

### Cores do Tema

Edite `client/src/index.css` para personalizar a paleta de cores:

```css
.dark {
  --primary: oklch(0.65 0.25 265);
  --accent: oklch(0.55 0.28 290);
  /* ... outras cores */
}
```

### Intervalo de Atualização

Para alterar o intervalo de atualização automática, edite `client/src/hooks/useGoogleSheets.ts`:

```typescript
// Atualizar a cada 10 minutos (600000 ms)
const interval = setInterval(fetchData, 600000);
```

## 📦 Build para Produção

```bash
pnpm build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🚀 Deploy no GitHub Pages

O projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions.

### Passo a Passo:

1. **Faça push do código para o GitHub**:
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

2. **Habilite o GitHub Pages no repositório**:
   - Acesse seu repositório no GitHub
   - Vá em **Settings** > **Pages**
   - Em **Source**, selecione **GitHub Actions**

3. **Aguarde o deploy automático**:
   - O GitHub Actions irá automaticamente fazer o build e deploy
   - Acompanhe o progresso na aba **Actions** do repositório
   - Após concluído, seu dashboard estará disponível em:
     `https://seu-usuario.github.io/dashboard-eventos/`

### Deploy Manual (Opcional)

Se preferir fazer o deploy manualmente:

```bash
# 1. Fazer build do projeto
pnpm build:github

# 2. O build estará na pasta dist/
# 3. Faça upload dos arquivos para seu servidor
```

### Outros Serviços de Hospedagem

O projeto também pode ser deployado em:
- **Vercel**: Conecte o repositório e faça deploy automático
- **Netlify**: Arraste a pasta `dist/` ou conecte o repositório
- **Cloudflare Pages**: Deploy direto do GitHub
- Qualquer servidor estático (Apache, Nginx, etc.)

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📧 Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

Desenvolvido com ❤️ usando React e Tailwind CSS
