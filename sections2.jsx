// Bydlo Fake Door — page sections (2/2): output preview, designers, pricing, reviews, FAQ, CTA
const { useState: useState2 } = React;

// ────────────────────────────────────────────────────────────────────────
// Co dostaneš — ukázka výstupu konzultace
// ────────────────────────────────────────────────────────────────────────
window.FDOutput = function FDOutput() {
  return (
    <section className="py-24 px-6 bg-surface/40 border-y border-border">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <div className="eyebrow">Co si odneseš</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-fg tracking-tight text-balance">
            Ne obecné rady. Konkrétní věci, které můžeš hned udělat.
          </h2>
          <p className="mt-5 text-fg-muted leading-relaxed">
            Krátce po konzultaci ti designér pošle stručné shrnutí na e-mail — tipy, triky, kontakty. Žádný dokument na 50 stran. Věci, podle kterých můžeš zítra jednat.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              'Co funguje a co bys měl změnit — bez přikrášlování',
              'Nákupní tipy s odkazy a rozpětím cen',
              'Kontakty na řemeslníky, kterým designér věří',
              'Tipy a doporučení šitá na tvou konkrétní situaci',
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary/10 text-primary flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span className="text-fg leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mock document preview */}
        <div className="lg:col-span-7">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-2xl -z-0"></div>
            <div className="relative rounded-lg bg-white border border-border shadow-[0_8px_24px_0_rgb(0_0_0/0.06)] p-7">
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-fg-subtle">Shrnutí konzultace</div>
                  <div className="mt-1 text-base font-semibold text-fg">Obývák, Vinohrady — Markéta &amp; Jan</div>
                </div>
                <div className="text-xs text-fg-subtle">14. dubna 2026</div>
              </div>

              <div className="mt-5">
                <div className="text-xs font-medium uppercase tracking-wider text-primary mb-2">Hlavní zjištění</div>
                <p className="text-sm text-fg leading-relaxed">
                  Sedačku otoč o 90° k oknu, světlo doplň stojací lampou s teplým světlem (3000K) vedle křesla. Nemaluj celou stěnu — stačí ta za TV v tlumeném okru. Rozpočet do 8 000 Kč.
                </p>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <div className="rounded-md bg-bg/60 border border-border p-3">
                  <div className="text-xs font-medium uppercase tracking-wider text-fg-subtle mb-1.5">Co teď</div>
                  <ul className="text-sm text-fg space-y-1.5">
                    <li className="flex gap-2"><span className="text-primary">→</span> Stojací lampa IKEA Skaftet (~1 200 Kč)</li>
                    <li className="flex gap-2"><span className="text-primary">→</span> Barva Hornbach okr W490 (~600 Kč)</li>
                    <li className="flex gap-2"><span className="text-primary">→</span> Koberec 200×300, vlna, naturální</li>
                  </ul>
                </div>
                <div className="rounded-md bg-bg/60 border border-border p-3">
                  <div className="text-xs font-medium uppercase tracking-wider text-fg-subtle mb-1.5">Co počká</div>
                  <ul className="text-sm text-fg-muted space-y-1.5">
                    <li className="flex gap-2"><span>○</span> Nová sedačka — má ještě 2 dobré roky</li>
                    <li className="flex gap-2"><span>○</span> Výměna podlahy</li>
                    <li className="flex gap-2"><span>○</span> Vestavné skříně</li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 rounded-md border-l-2 border-primary/30 bg-bg/60 px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-wider text-primary mb-1">Kontakty</div>
                <div className="text-sm text-fg leading-relaxed">
                  Malíř — Petr Novotný (ověřený, do týdne). Tapetář na akcent — Karel Šimek (Praha-východ, doporučení od Eliška N.).
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-xs text-fg-subtle">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">EN</span>
                Připravila Eliška Nováková · interiérová designérka
              </div>
            </div>

            {/* Floating annotation */}
            <div className="hidden lg:block absolute -right-6 top-12 bg-white border border-border rounded-lg shadow-card p-3 max-w-[180px] rotate-2">
              <div className="text-xs font-medium text-fg">Krátce po hovoru</div>
              <div className="mt-1 text-[11px] text-fg-muted leading-snug">
                Designér ti tohle pošle do pár minut po konzultaci. Žádné PDF na 50 stran.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Designéři — featured tři
// ────────────────────────────────────────────────────────────────────────
window.FDDesigners = function FDDesigners({ onCta }) {
  const designers = [
    { name: 'Eliška Nováková', photo: 'assets/designer-eliska.png', initials: 'EN', city: 'Praha', years: 6, rating: 4.9, reviews: 32, bio: 'Pomáhám mladým lidem zařídit jejich první vlastní bydlení — praktické řešení pro malé byty.', tags: ['malý byt', 'skandinávský', 'pár'], price: 1500 },
    { name: 'Ondřej Svoboda', photo: 'assets/designer-ondrej.png', initials: 'OS', city: 'Praha', years: 12, rating: 4.8, reviews: 24, bio: 'Architekt na rekonstrukce panelákových bytů. Rád pomůžu, když chceš zboural stěnu.', tags: ['panelák', 'rekonstrukce', 'dispozice'], price: 2000 },
    { name: 'Klára Malá', photo: 'assets/designer-klara.png', initials: 'KM', city: 'Brno', years: 8, rating: 5.0, reviews: 18, bio: 'Dělám interiéry pro lidi s vlastním nábytkem, který chtějí, aby konečně fungoval.', tags: ['stěhování', 'moodboard', 'rodinný'], price: 1800 },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="eyebrow">Naši designéři</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-fg tracking-tight text-balance">
              Lidi, kterým věříme
            </h2>
          </div>
          <p className="text-fg-muted max-w-md leading-relaxed">
            Na platformu nepouštíme každého — to je záměr. Každý designér má za sebou minimálně 4 roky praxe a portfolio, které jsme prošli.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {designers.map((d, i) => (
            <div key={i} className="rounded-lg border border-border bg-white p-5 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all">
              <div className="flex items-center gap-3">
                {d.photo ? (
                  <img
                    src={d.photo}
                    alt={d.name}
                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }}
                    className="h-12 w-12 rounded-full object-cover bg-surface"
                  />
                ) : null}
                <div
                  className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold"
                  style={d.photo ? { display: 'none' } : {}}
                >
                  {d.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-fg truncate">{d.name}</div>
                  <div className="text-xs text-fg-muted">{d.city} · {d.years} let praxe</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-primary"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
                <span className="font-medium text-fg">{d.rating.toFixed(1)}</span>
                <span className="text-fg-muted">· {d.reviews} hodnocení</span>
              </div>
              <p className="mt-3 text-sm text-fg-muted leading-relaxed">{d.bio}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {d.tags.map((t, j) => (
                  <span key={j} className="text-xs bg-surface text-fg-muted rounded-full px-2.5 py-0.5 border border-border">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-fg-subtle">od </span>
                  <span className="font-semibold text-fg">{d.price.toLocaleString('cs-CZ')} Kč</span>
                </div>
                <button onClick={onCta} className="text-sm text-primary hover:underline font-medium">
                  Profil →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Cena — co stojí, co dostaneš
// ────────────────────────────────────────────────────────────────────────
window.FDPricing = function FDPricing({ tweaks, onCta }) {
  const ranges = {
    cheap:  { quick: '500–900',   hour: '900–1500',   visit: '2 000–3 500' },
    normal: { quick: '700–1200',  hour: '1 200–2 500', visit: '3 000–5 000' },
    rich:   { quick: '1 000–1500', hour: '1 800–3 500', visit: '4 500–7 000' },
  };
  const r = ranges[tweaks.priceTier] || ranges.normal;

  const formats = [
    {
      tag: 'Krátký hovor',
      price: r.quick,
      duration: '30 minut',
      mode: 'online',
      best: 'Jedna konkrétní otázka — barva, materiál, nábytek.',
    },
    {
      tag: 'Hodina s designérem',
      price: r.hour,
      duration: '60 minut',
      mode: 'online nebo u tebe',
      best: 'Většina situací — místnost, která ti nesedí, drobná změna, druhý názor.',
      featured: true,
    },
    {
      tag: 'Návštěva u tebe',
      price: r.visit,
      duration: '60–90 minut',
      mode: 'osobně u tebe',
      best: 'Když je potřeba prostor vidět na vlastní oči.',
    },
  ];

  return (
    <section id="cena" className="py-24 px-6 bg-surface/40 border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">Co to stojí</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-fg tracking-tight text-balance">
            Cenu vidíš dopředu, než začnete.
          </h2>
          <p className="mt-4 text-fg-muted leading-relaxed text-balance">
            Každý designér si určuje cenu sám — podle zkušeností, města a formátu. Přesnou částku uvidíš u jeho profilu ještě než si konzultaci rezervuješ. Pro představu, takhle se obvykle pohybuje:
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {formats.map((t, i) => (
            <div
              key={i}
              className={`relative rounded-lg p-6 transition-all ${
                t.featured
                  ? 'border-2 border-primary/40 bg-white shadow-[0_8px_24px_0_rgb(0_0_0/0.06)]'
                  : 'border border-border bg-white shadow-card hover:shadow-hover hover:-translate-y-0.5'
              }`}
              style={t.featured ? { background: 'linear-gradient(to bottom right, hsl(40 20% 99%), hsl(13 52% 53% / 0.04))' } : {}}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full">
                  Nejčastější
                </div>
              )}
              <div className="text-sm font-medium text-fg-muted">{t.tag}</div>
              <div className="mt-2 text-xs text-fg-subtle">obvykle</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black tracking-tight text-fg">{t.price}</span>
                <span className="text-sm text-fg-muted">Kč</span>
              </div>
              <div className="mt-1 text-xs text-fg-subtle">{t.duration} · {t.mode}</div>
              <p className="mt-4 text-sm text-fg-muted leading-relaxed">{t.best}</p>
              <button
                onClick={onCta}
                className={`mt-6 w-full h-11 rounded-lg text-sm font-medium transition-colors ${
                  t.featured
                    ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
                    : 'border border-border bg-white hover:bg-surface text-fg'
                }`}
              >
                Najít designéra
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-white border border-border p-5 max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 2"/></svg>
          </div>
          <div className="text-sm text-fg-muted leading-relaxed">
            <span className="font-medium text-fg">Přesnou cenu vidíš dopředu.</span> U každého designéra je v profilu napsané, kolik si účtuje za hodinu — platíš jen za samotnou konzultaci, nic dalšího.
          </div>
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Reference — citace
// ────────────────────────────────────────────────────────────────────────
window.FDReviews = function FDReviews() {
  const quotes = [
    {
      text: 'Konečně někdo, kdo mě nepřesvědčoval, ať zbourám půlku bytu. Praktické rady, realistický rozpočet — a ušetřili nám asi 150 tisíc.',
      who: 'Markéta, 28',
      what: 'Byt 2+kk, Vinohrady',
    },
    {
      text: 'Bez Ondřeje bych dodnes bydlel v labyrintu stěn. Rozumný člověk, žádné show. Hodina, jasno, jdeme.',
      who: 'Tomáš, 35',
      what: 'Rekonstrukce 3+1, Holešovice',
    },
    {
      text: 'Konzultace s Eliškou mi pomohla rozmyslet, jak přeuspořádat obývák, aby se mi v něm líp odpočívalo. A jak ho celý zesvětlit, když do něj přirozeně svítí málo slunce. Žádná rekonstrukce — jen pár chytrých změn.',
      who: 'Lucie, 41',
      what: 'Obývák, Brno',
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">Co říkají lidé</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-fg tracking-tight text-balance">
            Konkrétní rady. Konkrétní výsledky.
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {quotes.map((q, i) => (
            <figure key={i} className="rounded-lg bg-white border border-border border-l-2 border-l-primary/30 p-6 shadow-card">
              <blockquote className="text-base text-fg leading-relaxed">
                „{q.text}"
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border">
                <div className="text-sm font-medium text-fg">{q.who}</div>
                <div className="text-xs text-fg-muted mt-0.5">{q.what}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// FAQ
// ────────────────────────────────────────────────────────────────────────
window.FDFaq = function FDFaq() {
  const [open, setOpen] = useState2(0);
  const items = [
    { q: 'Dostanu po konzultaci další návrh nebo nákresy?', a: 'Ne. Krátce po konzultaci ti designér pošle stručné shrnutí e-mailem — hlavní zjištění, nákupní tipy, kontakty. Žádný další projekt ani návrhová práce zdarma. Pokud chceš víc, dohodneš se na tom s designérem zvlášť — mimo platformu.' },
    { q: 'Proč má každý designér jinou cenu?', a: 'Protože má jiné zkušenosti, jiné město a jiný způsob práce. Cenu si určuje sám — my do toho nemluvíme. Přesnou částku vždycky vidíš u jeho profilu, ještě než si konzultaci rezervuješ.' },
    { q: 'A nepřijde mi nakonec, že chci celou rekonstrukci?', a: 'Možná ano. Jenže pak víš, do čeho jdeš — a máš někoho, kdo tě tím provede. Většina lidí ale po hodině zjistí, že stačí mnohem méně, než si myslela.' },
    { q: 'Jak víte, že je designér dobrý?', a: 'Každého ručně schvalujeme. Minimálně 4 roky praxe, portfolio, které jsme prošli, a osobní rozhovor. Na platformu nepustíme každého — to je záměr.' },
    { q: 'Funguje to i mimo velká města?', a: 'Online konzultace ano, kdekoli. Osobní návštěvy zatím v Praze, Brně, Olomouci a Ostravě. Ostatní města přidáváme postupně.' },
    { q: 'Můžu pak s designérem pokračovat na celém projektu?', a: 'Klidně. Když ti sedne, pokračujete spolu mimo platformu — bez našich provizí. Tady si domlouváš jen tu konzultaci.' },
  ];

  return (
    <section id="faq" className="py-24 px-6 bg-surface/40 border-y border-border">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <div className="eyebrow">Časté otázky</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-fg tracking-tight text-balance">
            Co se nejčastěji ptáme my a vy
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {items.map((it, i) => (
            <div key={i} className="rounded-lg bg-white border border-border overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface/50 transition-colors"
              >
                <span className="font-medium text-fg">{it.q}</span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={`flex-shrink-0 text-fg-muted transition-transform ${open === i ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-fg-muted leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-200">
                  {it.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Final CTA
// ────────────────────────────────────────────────────────────────────────
window.FDFinalCTA = function FDFinalCTA({ onCta }) {
  return (
    <section className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-fg leading-[1.05] text-balance">
          Pomůžeme ti bydlet líp —<br/>pokoj po pokoji.
        </h2>
        <p className="mt-6 text-lg text-fg-muted leading-relaxed text-balance max-w-xl mx-auto">
          Začni jednou hodinou. Bez závazku k velkému projektu, bez slepých poptávek.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onCta}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-primary text-primary-foreground text-base font-medium hover:bg-primary-hover transition-colors shadow-sm"
          >
            Chci to vyzkoušet
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
          <a href="#jak" className="inline-flex items-center h-12 px-5 text-sm text-fg-muted hover:text-fg transition-colors">
            Jak to celé funguje?
          </a>
        </div>
        <p className="mt-6 text-xs text-fg-subtle">
          15 minut · nezávazně · zdarma poptávka
        </p>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Footer
// ────────────────────────────────────────────────────────────────────────
window.FDFooter = function FDFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-xl font-black text-fg">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
              <path d="M6 28V14L16 4l10 10v14H20V20h-8v8H6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
            </svg>
            Bydlo
          </div>
          <p className="mt-4 text-base text-fg leading-relaxed max-w-md">
            Bydlo propojuje designéry a architekty s lidmi, kterým záleží na tom, jak se jim bydlí.
          </p>
          <p className="mt-3 text-sm text-fg-muted leading-relaxed max-w-md">
            Pomáháme ti bydlet líp — pokoj po pokoji. Krátké konzultace bez velkých zakázek.
          </p>
        </div>
        <div>
          <div className="eyebrow mb-3">Platforma</div>
          <ul className="space-y-2 text-sm">
            <li><a href="#jak" className="text-fg-muted hover:text-fg">Jak to funguje</a></li>
            <li><a href="#cena" className="text-fg-muted hover:text-fg">Co dostaneš</a></li>
            <li><a href="#faq" className="text-fg-muted hover:text-fg">Časté otázky</a></li>
          </ul>
        </div>
        <div>
          <div className="eyebrow mb-3">Kontakt</div>
          <ul className="space-y-2 text-sm">
            <li className="text-fg-muted">franta.pfann@gmail.com</li>
            <li className="text-fg-muted">Praha · Brno · Olomouc · Ostrava</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-5 text-xs text-fg-subtle flex flex-col sm:flex-row gap-2 justify-between">
          <span>© 2026 Bydlo</span>
          <span className="inline-flex gap-4">
            <a href="#" className="hover:text-fg-muted">Soukromí</a>
            <a href="#" className="hover:text-fg-muted">Podmínky</a>
          </span>
        </div>
      </div>
    </footer>
  );
};
