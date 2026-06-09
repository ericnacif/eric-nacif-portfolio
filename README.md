# Portfólio Profissional — Eric Nacif

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=06172A)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-FF77AA?logo=framer&logoColor=fff)](https://www.framer.com/motion/)
![Netlify](https://img.shields.io/badge/Netlify-Deploy-00C7B7?logo=netlify&logoColor=fff)

Portfólio desenvolvido com foco em **performance**, **SEO técnico** e **experiência do usuário (UX)**. SPA (Single Page Application) moderna, multilíngue (PT/EN/ES) e otimizada para mecanismos de busca.

🚀 **Acesse online:** [ericnacif.dev](https://ericnacif.dev)

---

## ✨ Destaques de engenharia

### ⚡ Performance & otimização

- **Code splitting & lazy loading:** seções pesadas carregadas via `React.lazy` e divisão manual de chunks (`react-core`, `react-dom`, `react-router`, `framer-motion`, `react-icons`) para reduzir o payload inicial.
- **Compressão Brotli:** assets pré-comprimidos em build com `vite-plugin-compression`.
- **Minificação com Terser** e CSS code splitting sob demanda.
- **Imagens otimizadas:** formato `.webp` (pipeline com `sharp`) + `loading="lazy"` e `decoding="async"`.
- **Boot screen inline:** tela de carregamento pintada via CSS antes do JS, melhorando o LCP percebido.

### 🔍 SEO técnico

- **Dados estruturados (JSON-LD):** Schema.org `Person` para o Google Knowledge Graph.
- **Sitemap.xml & robots.txt** configurados.
- **Meta tags:** Open Graph (Facebook/LinkedIn) e Twitter Cards.
- **Canonical URL** para evitar conteúdo duplicado.
- **Conteúdo em `<noscript>`** para crawlers sem execução de JS.

### 🌐 Internacionalização (i18n)

- **3 idiomas:** Português, Inglês e Espanhol.
- Detecção e persistência da preferência via `localStorage` (Context API própria, sem dependências externas).

### 🎨 UX/UI & interatividade

- **Animações fluidas** com Framer Motion (transições de seções e formulário).
- **Carrossel de projetos** com Swiper (autoplay, paginação custom e navegação acessível).
- **Formulário de contato** com validação em tempo real, sugestão de domínios de e-mail e envio via Formspree.
- **Atalhos:** `Ctrl/Cmd + P` abre o currículo em PDF no idioma ativo.

---

## 🛠️ Tecnologias

**Core:** React 19 · Vite 7

**Estilização & animação:** CSS3 moderno (Variáveis, Flexbox, Grid) · Framer Motion · React Icons · Swiper

**Ferramentas & deploy:** ESLint · Sharp (otimização de imagens) · Git/GitHub · Netlify (CI/CD) · Formspree (formulário sem backend)

---

## 🚀 Rodando localmente

Pré-requisitos: Node.js 18+

```bash
# 1. Clone o repositório
git clone https://github.com/ericnacif/eric-nacif-portfolio.git

# 2. Entre na pasta
cd eric-nacif-portfolio

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção |
| `npm run preview` | Pré-visualização do build |
| `npm run lint` | Análise estática com ESLint |
| `npm run optimize:images` | Converte imagens para `.webp` |

### Variáveis de ambiente

Crie um arquivo `.env` na raiz (opcional):

```bash
# ID de medição do Google Analytics 4 (deixe vazio para desativar)
VITE_GA_ID=G-XXXXXXXXXX
```

---

## 📂 Estrutura do projeto

```
src/
├── assets/          # Imagens (.webp) e currículos (PDF)
├── components/      # Componentes reutilizáveis (Header, Footer, etc.)
├── context/         # Context API (idioma)
├── hooks/           # Hooks customizados
├── i18n/            # Traduções (PT/EN/ES)
├── pages/           # Páginas (404)
├── sections/        # Seções da landing (Hero, About, Projects)
└── ...arquivos de config
```

---

## 📬 Contato

- **LinkedIn:** [eric-nacif](https://www.linkedin.com/in/eric-nacif-956930324/)
- **E-mail:** naciferic7@gmail.com
- **GitHub:** [@ericnacif](https://github.com/ericnacif)
