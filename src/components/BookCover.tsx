import type { Book } from '../data/content';

export default function BookCover({ book }: { book: Book }) {
  return (
    <div className="group">
      <div
        className="relative flex aspect-[2/3] flex-col justify-between overflow-hidden p-5 shadow-[0_10px_30px_-12px_rgba(22,21,19,0.35)] transition-transform duration-300 group-hover:-translate-y-1.5"
        style={{ backgroundColor: book.palette.bg }}
      >
        {/* spine highlight */}
        <div
          className="absolute inset-y-0 left-0 w-[6px]"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
        />
        <div className="pl-2">
          <p
            className="font-sans text-[9px] font-medium uppercase tracking-[0.3em]"
            style={{ color: book.palette.accent }}
          >
            {book.genre}
          </p>
          <div
            className="mt-3 h-px w-8"
            style={{ backgroundColor: book.palette.accent, opacity: 0.7 }}
          />
        </div>
        <h3
          className="pl-2 font-serif text-xl font-medium leading-snug md:text-[22px]"
          style={{ color: book.palette.fg }}
        >
          {book.title}
        </h3>
        <p
          className="pl-2 font-sans text-[11px] font-light uppercase tracking-[0.2em]"
          style={{ color: book.palette.fg, opacity: 0.75 }}
        >
          {book.author}
        </p>
      </div>
      <div className="mt-3">
        <p className="font-serif text-[15px] font-medium text-ink">{book.title}</p>
        <p className="font-sans text-xs font-light text-ink-muted">
          {book.author} &middot; {book.genre}
        </p>
      </div>
    </div>
  );
}
