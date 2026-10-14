import { siGithub, siLinkedin } from "simple-icons";

/* Site footer spanning the full window, mirroring the header: logo and name
   pinned to the left corner, contact icons and the resume pinned to the
   right corner. */

const Icon = ({ path, children }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
    {path ? <path d={path} /> : children}
  </svg>
);

const MAIL = (
  <path d="M2 5h20v14H2zM3.5 6.5v.4L12 12.6l8.5-5.7v-.4zM3.5 8.7V17.5h17V8.7L12 14.4z" />
);

const iconLink =
  "grid size-10 place-items-center border-2 border-transparent text-ink transition-colors hover:border-ink hover:bg-haze";

export default function SiteFooter({ name, github, linkedin, email, resume }) {
  return (
    <footer className="border-t-2 border-ink bg-paper text-ink">
      <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-4 px-4 py-6 sm:px-6">
        <div className="flex items-center gap-4">
          <a href="#top" className="flex items-center gap-3 font-display text-[1.125rem] font-semibold text-ink no-underline">
            <img src="/sp.svg" alt="" className="size-9 shrink-0 border-2 border-ink bg-[#fff]" />
            {name}
          </a>
          <span className="font-mono text-[0.8125rem] text-ink/60">© {new Date().getFullYear()}. All rights reserved.</span>
        </div>

        <ul className="m-0 flex list-none items-center gap-1 p-0">
          <li>
            <a href={github} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="GitHub (opens in a new tab)">
              <Icon path={siGithub.path} />
            </a>
          </li>
          <li>
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className={iconLink} aria-label="LinkedIn (opens in a new tab)">
              <Icon path={siLinkedin.path} />
            </a>
          </li>
          <li>
            <a href={email} className={iconLink} aria-label="Email">
              <Icon>{MAIL}</Icon>
            </a>
          </li>
          <li className="ml-3">
            <a
              href={resume}
              className="font-bold text-ink underline decoration-cta decoration-2 underline-offset-[6px] hover:text-cta"
            >
              Resume<span className="sr-only"> (PDF)</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
