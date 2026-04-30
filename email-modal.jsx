// Email capture modal — the "fake door" interception
const { useState: useStateM, useEffect: useEffectM } = React;

window.FDEmailModal = function FDEmailModal({ open, onClose, prefill, onSubmitted }) {
  const [step, setStep] = useStateM('form'); // form | thanks
  const [email, setEmail] = useStateM('');
  const [city, setCity] = useStateM('');
  const [situation, setSituation] = useStateM('');
  const [message, setMessage] = useStateM('');
  const [error, setError] = useStateM('');
  const [submitting, setSubmitting] = useStateM(false);

  useEffectM(() => {
    if (open) {
      setStep('form');
      setError('');
      setSituation(prefill || '');
      // Track open
      try {
        const n = parseInt(localStorage.getItem('bydlo_modal_opens') || '0', 10) + 1;
        localStorage.setItem('bydlo_modal_opens', String(n));
      } catch (e) {}
    }
  }, [open, prefill]);

  useEffectM(() => {
    const onKey = (e) => {if (e.key === 'Escape' && open) onClose();};
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const submit = async (e) => {
    e.preventDefault();
    if (!validEmail) {setError('Zkontroluj e-mail, prosím.');return;}
    setSubmitting(true);

    const payload = {
      email: email.trim(),
      city: city.trim(),
      situation: situation.trim(),
      message: message.trim(),
      ts: new Date().toISOString(),
      page: location.href,
      referrer: document.referrer || '',
    };

    // 1) Always persist locally (fake-door measurement, plus offline backup)
    try {
      const list = JSON.parse(localStorage.getItem('bydlo_signups') || '[]');
      list.push(payload);
      localStorage.setItem('bydlo_signups', JSON.stringify(list));
    } catch (e) {}

    // 2) Send to Google Apps Script Web App if configured.
    //    Set window.BYDLO_FORM_URL in index.html to your deployed Apps Script URL.
    //    We use no-cors + text/plain so the browser does not preflight.
    const formUrl = window.BYDLO_FORM_URL;
    if (formUrl) {
      try {
        await fetch(formUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Silent — local copy is the source of truth for fake-door metrics.
        console.warn('Form sync failed', err);
      }
    }

    setSubmitting(false);
    setStep('thanks');
    if (onSubmitted) onSubmitted();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-fg/40" onClick={onClose}></div>
      <div className="relative w-full max-w-lg rounded-lg bg-bg border border-border shadow-[0_20px_60px_-15px_rgb(0_0_0/0.25)] overflow-hidden animate-in fade-in slide-in-from-bottom-1 duration-300">
        {step === 'form' &&
        <div className="p-7">
            <button
            onClick={onClose}
            aria-label="Zavřít"
            className="absolute top-4 right-4 h-8 w-8 inline-flex items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-surface transition-colors">
            
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
              Spouštíme za pár týdnů
            </div>

            <h3 className="mt-4 text-2xl font-bold text-fg tracking-tight text-balance">
              Bydlo zatím dolaďujeme — chceš být u toho první?
            </h3>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed">Síť ověřených designérů zatím skládáme. Nech nám e-mail a my se ti ozveme, jakmile to spustíme — dostaneš příležitost být mezi prvními.

          </p>

            <form onSubmit={submit} className="mt-5 space-y-3">
              <div>
                <label className="block text-xs font-medium text-fg mb-1.5">Tvůj e-mail</label>
                <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => {setEmail(e.target.value);setError('');}}
                placeholder="ahoj@example.cz"
                className="flex h-11 w-full rounded-lg border border-border bg-white px-4 text-base placeholder:text-fg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50 transition" />
              
              </div>

              <div>
                <label className="block text-xs font-medium text-fg mb-1.5">Město <span className="text-fg-subtle font-normal">(volitelné)</span></label>
                <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Např. Praha, Liberec, Olomouc…"
                className="flex h-11 w-full rounded-lg border border-border bg-white px-4 text-base placeholder:text-fg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50 transition" />
              </div>

              <div>
                <label className="block text-xs font-medium text-fg mb-1.5">Co řešíš? <span className="text-fg-subtle font-normal">(volitelné)</span></label>
                <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={3}
                placeholder="Pár vět o tvé situaci — pomůže nám rozhodnout, koho spustit první."
                className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm placeholder:text-fg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50 resize-none transition" />
              
              </div>

              <div>
                <label className="block text-xs font-medium text-fg mb-1.5">Chceš nám ještě něco vzkázat? <span className="text-fg-subtle font-normal">(volitelné)</span></label>
                <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                placeholder="Cokoli, co bys nám chtěl/a říct."
                className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm placeholder:text-fg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50 resize-none transition" />
              </div>

              {error &&
            <div className="text-sm text-red-800 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                  {error}
                </div>
            }

              <button
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors shadow-sm disabled:opacity-60">
              
                {submitting ? 'Posíláme…' : 'Dej mi vědět, až to spustíte'}
              </button>

              <p className="text-center text-xs text-fg-subtle">
                Žádný spam. Jeden e-mail, až bude co ukázat.
              </p>
            </form>
          </div>
        }

        {step === 'thanks' &&
        <div className="p-7 text-center">
            <button
            onClick={onClose}
            aria-label="Zavřít"
            className="absolute top-4 right-4 h-8 w-8 inline-flex items-center justify-center rounded-md text-fg-muted hover:text-fg hover:bg-surface transition-colors">
            
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>

            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <h3 className="mt-5 text-2xl font-bold text-fg tracking-tight">Skvělý, máme tě.</h3>
            <p className="mt-3 text-sm text-fg-muted leading-relaxed max-w-sm mx-auto">
              Ozveme se ti osobně, jakmile spustíme — pravděpodobně do pár týdnů. Mezitím nesdílíme tvůj e-mail s nikým dalším.
            </p>
            <div className="mt-6 rounded-lg border border-border bg-surface/50 p-4 text-left">
              <div className="text-xs font-medium uppercase tracking-wider text-fg-subtle mb-2">Co se stane dál</div>
              <ul className="text-sm text-fg space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">→</span>
                  <span>Skládáme síť designérů ve tvém městě.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">→</span>
                  <span>Spouštíme uzavřenou betu pro prvních 50 lidí — budeš mezi nimi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">→</span>
                  <span>První konzultace za poloviční cenu, nezávazně.</span>
                </li>
              </ul>
            </div>
            <button
            onClick={onClose}
            className="mt-6 inline-flex items-center justify-center h-11 px-5 rounded-lg border border-border bg-white hover:bg-surface text-fg text-sm font-medium transition-colors">
            
              Hotovo
            </button>
          </div>
        }
      </div>
    </div>);

};