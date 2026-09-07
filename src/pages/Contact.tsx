import { useState } from 'react';
import { EMAIL } from '../data/content';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website inquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const inputCls =
    'w-full border border-line bg-paper px-4 py-3 font-sans text-sm font-light text-ink placeholder:text-ink-muted/60 focus:border-forest focus:outline-none transition-colors';

  return (
    <div>
      <section className="border-b border-line bg-paper">
        <div className="container-ed py-16 md:py-24">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.12] tracking-tight text-ink md:text-[52px]">
            Get in touch with the agency.
          </h1>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-ed grid gap-14 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-5">
            <h2 className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] text-ink-muted">
              Email
            </h2>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-3 inline-block border-b border-ink/30 pb-1 font-serif text-2xl font-medium text-ink transition-colors hover:border-forest hover:text-forest"
            >
              {EMAIL}
            </a>

            <div className="mt-10 border-l-2 border-forest pl-5">
              <p className="font-sans text-sm font-light leading-relaxed text-ink-soft">
                The only valid email addresses from our agency end in{' '}
                <span className="font-medium text-forest">@inkwriters.co</span>. Please be cautious
                of any message claiming to be from Inkwriters that arrives from any other domain.
              </p>
            </div>

            <div className="mt-10 border border-line bg-cream/50 p-6">
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                Please note
              </p>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-ink-soft">
                We do not accept manuscript submissions through this page. To submit your work,
                please use our{' '}
                <a href="#/submissions" className="link-underline text-ink">
                  submissions page
                </a>
                .
              </p>
            </div>

            <div className="mt-10 overflow-hidden">
              <img
                src="/images/reading.jpg"
                alt="A person reading"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <form onSubmit={submit} className="border border-line bg-paper p-8 md:p-10">
              <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
                Send a message
              </h2>
              <p className="mt-2 font-sans text-sm font-light text-ink-soft">
                For general inquiries, rights questions, and press.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Name
                  </label>
                  <input
                    required
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-2 block font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                  Message
                </label>
                <textarea
                  required
                  rows={7}
                  className={`${inputCls} resize-y`}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="mt-8 w-full border border-ink bg-ink px-8 py-4 font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-paper transition-colors duration-200 hover:border-forest hover:bg-forest sm:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
