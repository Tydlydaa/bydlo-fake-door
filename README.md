# Bydlo — Fake Door Landing Page

Statická landing page pro **fake door test** služby Bydlo. Účel: ověřit zájem
o krátké placené konzultace s designéry / architekty před tím, než postavíme
plnou platformu.

**Hlavní web:** [main.bydlo-franta.pages.dev](https://main.bydlo-franta.pages.dev) — plnohodnotný prototyp (Vite/React)
**Tento web:** statická landing page se sběrem e-mailů (žádný build, čisté HTML + JSX přes Babel standalone)

---

## Tech

- Statický HTML soubor (`index.html`) + `.jsx` soubory transpilované v prohlížeči přes `@babel/standalone`
- Tailwind přes CDN
- Plus Jakarta Sans přes Google Fonts
- React 18 přes UMD CDN
- Žádný build krok, žádný `npm install` — stačí otevřít `index.html`

## Struktura

```
.
├── index.html              ← root, Cloudflare Pages servíruje toto
├── colors_and_type.css     ← Bydlo design tokens (barvy, typografie)
├── sections.jsx            ← Header, Hero, Jak to funguje, Příklad výstupu
├── sections2.jsx           ← Situace, Designéři, Ceny, Recenze, FAQ, Footer
├── email-modal.jsx         ← Modal pro sběr e-mailů
├── tweaks-panel.jsx        ← (vývojový) panel pro přepínání variant
├── assets/
│   ├── logo.svg
│   ├── designer-eliska.png
│   ├── designer-ondrej.png
│   └── designer-klara.png
└── README.md
```

## Lokální vývoj

```bash
# Stačí jakýkoli statický server. Například:
python3 -m http.server 8000
# Otevři http://localhost:8000
```

Případně VS Code Live Server, `npx serve .`, atd.

---

## Deploy na Cloudflare Pages

Nasazujeme jako samostatný projekt vedle hlavního webu (`bydlo`).

### První nasazení (jednorázově)

1. **Připoj repo:** Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Vyber repo `Tydlydaa/bydlo-fake-door`, větev `main`
3. **Build settings:**
   - Framework preset: **None**
   - Build command: *(prázdné)*
   - Build output directory: `/`
4. **Project name:** `chci-bydlo` (výsledek: `chci-bydlo.pages.dev`)
5. Save and Deploy

Každý další push do `main` se nasadí automaticky.

### Manuální deploy (volitelně)

```bash
npx wrangler pages deploy . --project-name chci-bydlo --branch main --commit-dirty=true
```

---

## Sběr e-mailů přes Google Apps Script

Modal posílá data do Google Sheetu přes Apps Script Web App. Konfigurace je
jednorázová.

### 1. Vytvoř Sheet

1. Vytvoř nový Google Sheet (např. „Bydlo — fake door odpovědi")
2. První řádek = hlavičky:
   `timestamp | email | city | situation | message | page | referrer`

### 2. Vytvoř Apps Script

1. V Sheetu: **Extensions → Apps Script**
2. Smaž `Code.gs` obsah a vlož kód z `apps-script.gs` (v tomto repu)
3. Deploy → New deployment → Type: **Web app**
   - Description: `Bydlo fake door`
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Zkopíruj **Web app URL** (`https://script.google.com/macros/s/AKfyc.../exec`)

### 3. Propoj se stránkou

V `index.html` najdi:

```html
<script>
  window.BYDLO_FORM_URL = '';
</script>
```

a vlož tam URL z kroku 2:

```html
<script>
  window.BYDLO_FORM_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
</script>
```

Commit, push, a hotovo — odpovědi se píší do Sheetu.

### Ověření

1. Otevři live URL
2. Klikni na CTA, vyplň formulář
3. Zkontroluj, že se v Sheetu objevil řádek
4. (Záložně se každá odpověď ukládá i do `localStorage` pod klíč `bydlo_signups`)

---

## Tweaks panel

V hlavičce stránky je tlačítko **"Tweaks"** — otevře vývojový panel, který umí
přepínat varianty hero textu, ceny, atd. **Před produkčním nasazením to nech v defaultním stavu** — nic se neuloží napříč návštěvníky, ale je to vidět.

Pokud chceš panel úplně skrýt, smaž v `index.html`:

```html
<TweaksPanel title="Tweaks">
  ...
</TweaksPanel>
```

---

## Co měřit

- **Otevření modalu** = projevený zájem (klik na CTA)
- **Odeslání formuláře** = silný zájem
- Konverze otevření → odeslání = jak dobře chytá vstupní textace

V Cloudflare Pages dashboardu vidíš **Web Analytics** — kolik unikátních
návštěvníků dorazilo. Kombinací s počtem řádků v Sheetu máš vše, co k fake door
testu potřebuješ.
