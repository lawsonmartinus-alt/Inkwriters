import { useEffect, useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

const STORAGE_KEY = 'inkwriters_fraud_notice_seen';

export default function FraudWarningModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        const t = window.setTimeout(() => setVisible(true), 600);
        return () => window.clearTimeout(t);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const close = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="overlay-in fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fraud-warning-title"
      onClick={close}
    >
      <div
        className="modal-in relative w-full max-w-md border border-line bg-paper shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-forest" />
        <button
          onClick={close}
          aria-label="Close warning"
          className="absolute right-4 top-4 p-1 text-ink-muted transition-colors hover:text-ink"
        >
          <X size={18} />
        </button>

        <div className="px-7 py-8 md:px-9">
          <div className="flex items-center gap-3">
            <ShieldAlert size={22} className="shrink-0 text-forest" strokeWidth={1.75} />
            <h2 id="fraud-warning-title" className="font-serif text-[22px] font-semibold text-ink">
              Fraud Warning
            </h2>
          </div>

          <div className="mt-5 space-y-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
            <p>
              Some individuals are impersonating Inkwriters to scam authors. Please be cautious of
              any communication not sent from our official domain.
            </p>
            <p className="border-l-2 border-forest pl-4 font-normal text-ink">
              The only valid email addresses from our agency end in{' '}
              <span className="font-medium text-forest">@inkwriters.co</span>.
            </p>
            <p>We do not request payments through unofficial channels.</p>
          </div>

          <button
            onClick={close}
            className="mt-7 w-full border border-ink bg-ink px-6 py-3 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
