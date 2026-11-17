# Santo Quiz — Landing Page

Site de divulgação do app **Santo Quiz** em três idiomas (PT, EN, ES).

## Estrutura

```
.
├── index.html       # Root: detecta idioma do browser e redireciona
├── pt/index.html    # Versão português
├── en/index.html    # Versão inglês
├── es/index.html    # Versão espanhol
├── style.css        # Estilos compartilhados
└── img/             # Hero, ícone e screenshots
```

## Desenvolvimento local

Site é 100% estático (HTML + CSS puro). Qualquer servidor estático funciona:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Abre `http://localhost:8000` — vai redirecionar pro idioma do navegador.

## Deploy

Compatível com qualquer static host. Recomendados (todos grátis pra esse tamanho):

- **Vercel** — importar o repo em https://vercel.com/new, sem build config
- **Netlify** — drag & drop ou conectar repo em https://app.netlify.com
- **Cloudflare Pages** — conectar repo em https://pages.cloudflare.com
- **GitHub Pages** — Settings → Pages → Branch: main

Depois de publicado, apontar o domínio (ex: `santoquiz.com.br`) nas configs de DNS do hosting escolhido.

## Idiomas

Pra adicionar novo idioma:

1. Copia `pt/index.html` pra `<cod>/index.html`
2. Traduz o conteúdo
3. Adiciona o `<link rel="alternate" hreflang="<cod>">` em todos os arquivos
4. Adiciona o botão no `.langs` do `<nav>`
5. Adiciona o código no array `supported` do `index.html` root
