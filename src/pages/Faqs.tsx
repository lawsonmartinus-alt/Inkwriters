import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '../data/content';

export default function Faqs() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-16 md:py-24">
          <p className="eyebrow">FAQs</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.12] tracking-tight text-ink md:text-[52px]">
            Questions authors ask us most.
          </h1>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-ed py-16 md:py-20">
          <div className="mx-auto max-w-3xl border-t border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-line">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-serif text-lg font-medium transition-colors duration-200 md:text-xl ${
                        isOpen ? 'text-forest' : 'text-ink'
                      }`}
                    >
                      {f.q}
                    </span>
                    <span
                      className={`shrink-0 text-ink-muted transition-transform duration-300 ${
                        isOpen ? 'rotate-45 text-forest' : ''
                      }`}
                    >
                      <Plus size={18} strokeWidth={1.5} />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl font-sans text-[15px] font-light leading-relaxed text-ink-soft">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-14 max-w-3xl border border-line bg-cream/50 p-8 text-center md:p-10">
            <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
              Still have a question?
            </h2>
            <p className="mt-3 font-sans text-sm font-light text-ink-soft">
              We&rsquo;re happy to help with anything not covered above.
            </p>
            <a
              href="#/contact"
              className="mt-6 inline-block border border-ink bg-ink px-8 py-3.5 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
