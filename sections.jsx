// Bydlo Fake Door — page sections
const { useState, useEffect, useRef } = React;

// ────────────────────────────────────────────────────────────────────────
// Header
// ────────────────────────────────────────────────────────────────────────
window.FDHeader = function FDHeader({ onCta }) {
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 text-2xl font-black tracking-tight text-fg">
          <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M6 28V14L16 4l10 10v14H20V20h-8v8H6z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          </svg>
          Bydlo
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm">
          <a href="#jak" className="px-3 py-2 rounded-md text-fg-muted hover:text-fg hover:bg-surface transition-colors">Jak to funguje</a>
          <a href="#cena" className="px-3 py-2 rounded-md text-fg-muted hover:text-fg hover:bg-surface transition-colors">Co dostaneš</a>
          <a href="#faq" className="px-3 py-2 rounded-md text-fg-muted hover:text-fg hover:bg-surface transition-colors">Časté otázky</a>
        </nav>
        <button onClick={onCta} className="inline-flex items-center gap-1.5 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm">
          Chci to vyzkoušet
        </button>
      </div>
    </header>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Hero — pocit „popiš situaci, najdeme designéra“
// ────────────────────────────────────────────────────────────────────────
window.FDHero = function FDHero({ tweaks, onCta, onSubmitText }) {
  const [value, setValue] = useState('');
  const taRef = useRef(null);

  useEffect(() => {
    if (!taRef.current) return;
    taRef.current.style.height = 'auto';
    taRef.current.style.height = Math.max(140, taRef.current.scrollHeight) + 'px';
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) onSubmitText(value.trim());
  };

  const heroes = {
    consult: {
      h: <>Hodina s&nbsp;designérem<span className="block text-gradient-fade">na tu jednu konkrétní věc.</span></>,
      sub: 'Ne velký projekt, ani studie. Krátká placená konzultace s architektem nebo interiérovým designérem — abys u sebe doma rozhodl s lehkou hlavou.',
    },
    plan: {
      h: <>Než utratíš za nábytek,<span className="block text-gradient-fade">probrat to s někým, kdo to dělá.</span></>,
      sub: 'Hodina s designérem, který ví, co kde nakoupit — a co raději nekupovat. Bez velkého závazku, bez velkého rozpočtu.',
    },
    decide: {
      h: <>Nevíš, jestli zbourat tu stěnu?<span className="block text-gradient-fade">Najdeme někoho, kdo to ví.</span></>,
      sub: 'Architekt nebo interiérový designér na jednu konkrétní otázku — ne celý projekt. Domluvíš si hodinu, dostaneš odpověď.',
    },
    decision: {
      h: <>Jedno rozhodnutí o&nbsp;bydlení,<span className="block text-gradient-fade">které ti vrtá hlavou.</span></>,
      sub: 'Pomohne ti ho udělat hodina s někým, kdo bydlení dělá deset let. Bez prezentací, bez nabídek na rekonstrukci. Jen rozhovor a konkrétní odpověď.',
    },
  };
  const hero = heroes[tweaks.heroVariant] || heroes.consult;

  const examples = [
    'V obýváku to prostě nefunguje — sedačka, světlo, barvy. Ale nevím, co změnit.',
    'Vybírám barvy do ložnice a chci to s někým probrat, než to natřu.',
    'Po přestěhování mi nesedí nábytek — co nechat, co dokoupit?',
  ];

  return (
    <section className="pt-20 lg:pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs text-fg-muted mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
          Praha · Brno · Olomouc · Ostrava · Online
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-fg leading-[1.05] text-balance">
          {hero.h}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-fg-muted max-w-2xl mx-auto leading-relaxed text-balance">
          {hero.sub}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto">
        <div className="text-center text-sm text-fg-muted mb-3">
          <span aria-hidden>👇</span> Začni zde
        </div>
        <div className="relative rounded-lg bg-white border border-border shadow-card hover:shadow-hover focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
          <textarea
            ref={taRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Popiš svou situaci. Co řešíš? Jaký je prostor? Co tě trápí?"
            className={`w-full min-h-[140px] rounded-lg bg-transparent px-5 py-4 text-base placeholder:text-fg-subtle focus:outline-none resize-none ${value ? '' : 'animate-pulse-glow'}`}
            style={{ paddingBottom: 56 }}
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg h-10 px-4 text-sm font-medium transition-all ${
              value.trim()
                ? 'bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm'
                : 'bg-surface-2 text-fg-subtle cursor-not-allowed'
            }`}
          >
            Najít designéra
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {examples.map((e, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setValue(e)}
              className="text-xs text-fg-muted hover:text-fg bg-white border border-border hover:border-border-strong rounded-full px-3 py-1.5 transition-colors"
            >
              {e.slice(0, 52)}…
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-fg-subtle">
          15 minut · nezávazně · zdarma poptávka
        </p>
      </form>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Jak to funguje — 3 kroky
// ────────────────────────────────────────────────────────────────────────
window.FDHowItWorks = function FDHowItWorks() {
  const steps = [
    {
      n: '01',
      t: 'Popíšeš situaci',
      b: 'Napiš v pár větách, co řešíš. Náš průvodce se doptá na to podstatné — prostor, rozpočet, co tě trápí.',
      meta: 'do 10 minut',
    },
    {
      n: '02',
      t: 'Vybereš designéra',
      b: 'Doporučíme tři lidi, kteří tvůj typ situace už řešili. Podíváš se na portfolio, ceny, reference a vybereš.',
      meta: 'během pár chvil',
    },
    {
      n: '03',
      t: 'Designér ti dá vědět',
      b: 'Vybíráš si ty, ale i on si vybírá tebe. Podívá se na tvou situaci a řekne, jestli ti má co poradit. Pokud ne, doporučí někoho dalšího — abys neplatil za hodinu, která ti nepomůže.',
      meta: 'do dvou dní',
    },
    {
      n: '04',
      t: 'Proběhne konzultace',
      b: 'Hodina online nebo u tebe doma. Probereš to konkrétní, co tě trápí, a krátce po konzultaci dostaneš shrnutí na e-mail — tipy, doporučení, kontakty.',
      meta: '30 - 120 minut',
    },
  ];

  const bonus = {
    t: 'Pokud ti spolupráce sedne — pokračujte spolu',
    b: 'Tady si domlouváš jen konzultaci, ne projekt. Ale pokud ti designér padne do oka, můžete se mimo platformu domluvit na něčem větším — návrhu, rekonstrukci, doprovodu při výběru. Bez provizí, bez dalších poplatků z naší strany.',
  };

  return (
    <section id="jak" className="py-24 px-6 bg-surface/40 border-y border-border">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">Jak to funguje</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-fg tracking-tight text-balance">
            Čtyři kroky od „nevím, jak na to“ k&nbsp;„už vím, co dělám“
          </h2>
          <p className="mt-4 text-fg-muted leading-relaxed text-balance">
            Žádné slepé poptávky. Žádné nabídky od pěti lidí, kteří tě neznají. Jen jedna konkrétní odpověď.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-lg bg-white border border-border p-6 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all">
              <div className="text-3xl font-black text-primary tracking-tight">{s.n}</div>
              <div className="mt-3 text-lg font-semibold text-fg">{s.t}</div>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">{s.b}</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-fg-subtle">
                <span className="h-1 w-1 rounded-full bg-fg-subtle"></span>
                {s.meta}
              </div>
            </div>
          ))}
        </div>

        {/* Bonus / volitelný krok */}
        <div className="mt-6 rounded-lg border border-dashed border-primary/30 bg-white/60 p-6 flex flex-col md:flex-row md:items-center gap-5">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary font-black text-lg flex-shrink-0">+</div>
          <div className="flex-1">
            <div className="text-xs font-medium uppercase tracking-wider text-primary mb-1">Volitelně, pokud chceš</div>
            <div className="text-base font-semibold text-fg">{bonus.t}</div>
            <p className="mt-1 text-sm text-fg-muted leading-relaxed">{bonus.b}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────────────────────────────
// Typické situace — co řešíme
// ────────────────────────────────────────────────────────────────────────
window.FDSituations = function FDSituations({ onCta }) {
  const items = [
    { tag: 'Obývák', t: 'Něco tam nesedí, ale nevím co', b: 'Sedačka, světlo, barvy, koberec — krátký názor zvenku, který ušetří roky tápání.' },
    { tag: 'Kuchyň', t: 'Plánujeme rekonstrukci kuchyně', b: 'Než podepíšeš smlouvu se studiem — hodina, která ti pomůže rozhodnout, co opravdu chtít.' },
    { tag: 'Barvy', t: 'Vybírám barvy a chci to s někým probrat', b: 'Než natřeš celou stěnu — hodina s někým, kdo to dělá.' },
    { tag: 'Stěhování', t: 'Po stěhování mi nesedí nábytek', b: 'Co nechat, co prodat, co dokoupit — bez velkého návrhu.' },
    { tag: 'Jedna místnost', t: 'Ložnice, dětský pokoj, předsíň', b: 'Jedna místnost, jeden problém. Konkrétní řešení.' },
    { tag: 'Materiály', t: 'Vybíráme podlahu nebo obklady', b: 'Druhý názor předtím, než to objednáš — ať se trefíš napoprvé.' },
    { tag: 'Před rekonstrukcí', t: 'Chtěli bychom rekonstruovat, ale nevíme rozsah', b: 'Ujasni si, co opravdu potřebuješ — ještě než si pustíš domů projektanta.' },
  ];
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="eyebrow">Typické situace</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-fg tracking-tight text-balance">
              S čím za námi lidé chodí
            </h2>
          </div>
          <p className="text-fg-muted max-w-md leading-relaxed">
            Od krátké konzultace po pomoc s rekonstrukcí — rozsah vyladíte spolu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <div key={i} className="rounded-lg border border-border bg-white p-5 shadow-card hover:shadow-hover hover:-translate-y-0.5 transition-all">
              <div className="text-xs font-medium uppercase tracking-wider text-primary">{it.tag}</div>
              <div className="mt-2 text-base font-semibold text-fg">{it.t}</div>
              <p className="mt-2 text-sm text-fg-muted leading-relaxed">{it.b}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button onClick={onCta} className="inline-flex items-center gap-1.5 h-11 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm">
            Najít designéra pro mou situaci
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};
