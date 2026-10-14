import { useId, useRef } from "react";

/* "View details" opens the full write-up in a modal panel instead of
   expanding the card, so cards keep a fixed size and the page never grows.
   Built on the native <dialog>: it traps focus, closes on Escape, and returns
   focus to the button that opened it. A click on the dimmed backdrop also
   closes it. The panel resets text wrapping, since it sits inside card
   footers that keep their links on a single line. */

export default function Details({ title, meta, children }) {
  const dialog = useRef(null);
  const heading = useId();

  return (
    <>
      <button
        type="button"
        onClick={() => dialog.current.showModal()}
        className="cursor-pointer border-0 bg-transparent p-0 text-left font-bold text-ink underline decoration-2 underline-offset-[6px]"
      >
        View details<span className="sr-only"> for {title}</span>
      </button>

      <dialog
        ref={dialog}
        aria-labelledby={heading}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto max-h-[85svh] w-[calc(100%-2rem)] max-w-[44rem] border-2 border-ink bg-paper p-0 text-ink whitespace-normal break-words shadow-hard-lg backdrop:bg-black/45"
      >
        <div className="sticky top-0 flex items-start justify-between gap-6 border-b-2 border-ink bg-brand p-5 text-on-brand sm:p-6">
          <div>
            {meta && <p className="m-0 font-mono text-[0.8125rem] opacity-80">{meta}</p>}
            <h3 id={heading} className="m-0 mt-1 font-display text-[1.5rem] leading-[1.15] font-semibold">
              {title}
            </h3>
          </div>
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close"
              className="grid size-10 shrink-0 cursor-pointer place-items-center border-2 border-on-brand bg-transparent text-on-brand"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </form>
        </div>
        <div className="p-5 text-[0.9375rem] leading-[1.7] sm:p-6">{children}</div>
      </dialog>
    </>
  );
}
