# Zafi Car — Página de captura

Arquivos desta pasta:

| Arquivo | Para quê |
|---|---|
| `index.html` | A página de captura. É o que você publica. |
| `codigo-google-sheets.gs` | Código para colar no Google Apps Script (grava os leads na planilha). |
| `COMO-CONFIGURAR.md` | Este guia. |

---

## 1. Ligar a planilha do Google Sheets (leads viram linhas na planilha)

Feito uma vez, leva ~5 minutos. Tudo grátis e os dados ficam na sua conta Google.

### Passo a passo

1. Acesse **[sheets.new](https://sheets.new)** para criar uma planilha nova.
   Dê um nome a ela (ex.: `Leads Zafi Car`).
2. No menu, clique em **Extensões → Apps Script**.
3. Apague o conteúdo que aparecer no editor e **cole todo o código** do arquivo
   `codigo-google-sheets.gs`.
4. Clique no ícone de **salvar** (disquete).
5. Clique em **Implantar → Nova implantação**.
6. Em "Selecionar tipo" (ícone de engrenagem), escolha **App da Web**.
7. Preencha:
   - **Descrição:** `captura zafi car` (qualquer coisa)
   - **Executar como:** *Eu (seu e-mail)*
   - **Quem pode acessar:** **Qualquer pessoa**
8. Clique em **Implantar**.
9. Vai pedir autorização: **Revisar permissões → escolha sua conta →**
   na tela "O Google não verificou este app", clique em **Avançado →
   Acessar (nome do projeto) (não seguro)** → **Permitir**.
   (É seguro: o "app" é o seu próprio script.)
10. Copie a **URL do app da Web** que aparece — ela termina em `/exec`.

### Colar a URL na página

Abra `index.html` num editor de texto, procure por `sheetsEndpoint` (perto do
final) e troque:

```js
sheetsEndpoint: "COLE_A_URL_DO_APP_DA_WEB_AQUI",
```

por (exemplo):

```js
sheetsEndpoint: "https://script.google.com/macros/s/AKfycb.../exec",
```

Salve. Pronto — cada envio da página cria uma linha na planilha com
**Data/Hora, Nome, WhatsApp, Região e Origem**.

> Se depois você editar o código do Apps Script, precisa **Implantar → Gerenciar
> implantações → editar (lápis) → Versão: Nova versão → Implantar** para valer.

---

## 2. (Opcional) Receber cada lead por e-mail também

No `index.html`, em `leadEmail`, coloque seu e-mail:

```js
leadEmail: "seuemail@gmail.com",
```

No primeiro envio você recebe um e-mail do FormSubmit.co pedindo confirmação —
clique uma vez no link e pronto.

Deixe `leadEmail: ""` para não usar e-mail.

---

## 3. (Opcional) Imagem de fundo

Coloque uma foto na pasta (ex.: `fundo.jpg`) e, no `index.html`, no bloco CSS,
troque:

```css
--hero-photo: none;
```

por:

```css
--hero-photo: url("fundo.jpg");
```

---

## 4. (Opcional) Logo oficial

Exporte o logo do Canva em **PNG com fundo transparente**, salve como
`logo-zafi-car.png` nesta pasta e, no `index.html`, troque o bloco
`<div class="wordmark">…</div>` por:

```html
<img src="logo-zafi-car.png" alt="Zafi Car" style="height:48px" />
```

---

## 5. Publicar

Suba o `index.html` (e as imagens, se usar) em qualquer hospedagem:

- **Netlify Drop** — arraste a pasta em [app.netlify.com/drop](https://app.netlify.com/drop) (grátis)
- **Vercel**, **Cloudflare Pages** (grátis)
- **Hostinger** ou seu domínio próprio (pasta `public_html`)

O link gerado é o que você divulga nos anúncios / bio / stories.

---

## Teste antes de divulgar

1. Abra a página publicada.
2. Preencha com dados de teste e envie.
3. Confirme que: (a) apareceu uma linha na planilha e (b) abriu o grupo do WhatsApp.
4. Apague a linha de teste da planilha.
