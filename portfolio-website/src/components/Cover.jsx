import { siGithub } from "simple-icons";

/* Organisation branding for the experience section. Logos sit on white so
   every brand keeps its own colours; an organisation without a logo shows
   its mark set in the display face instead. Decorative: the text beside
   each logo already names the organisation. */

// A role-list entry's logo on its white plate.
export const LogoPlate = ({ logo, mark }) => (
  <span aria-hidden="true" className="flex h-12 w-20 shrink-0 items-center justify-center border-2 border-ink bg-paper px-1.5 py-1 text-ink">
    {logo ? (
      <img src={logo} alt="" className="h-9 w-auto max-w-[4.25rem] object-contain" />
    ) : (
      <span className="px-1 font-display text-[0.875rem] leading-none font-semibold tracking-[-0.01em]">{mark}</span>
    )}
  </span>
);

// The detail panel's header: the logo large, and the repository's name when
// the role has public code.
export default function LogoHeader({ mark, logo, repo }) {
  const repoName = repo && new URL(repo).pathname.split("/").filter(Boolean).at(-1);
  return (
    <div aria-hidden="true" className="flex min-h-36 items-center justify-between gap-4 border-b-2 border-ink bg-paper px-6 py-6 sm:min-h-40 sm:px-8">
      {logo ? (
        <img src={logo} alt="" className="logo-in h-20 w-auto max-w-[min(18rem,70%)] object-contain object-left sm:h-24" />
      ) : (
        <span className="logo-in font-display text-[3rem] leading-none font-semibold tracking-[-0.02em] text-ink sm:text-[3.5rem]">{mark}</span>
      )}
      {repoName && (
        <span className="inline-flex max-w-[45%] items-center gap-1.5 self-start border-2 border-ink bg-paper py-0.5 pr-2 pl-1.5 font-mono text-[0.6875rem] leading-5 font-bold text-ink">
          <svg viewBox="0 0 24 24" className="size-3 shrink-0 fill-current">
            <path d={siGithub.path} />
          </svg>
          <span className="truncate">{repoName}</span>
        </span>
      )}
    </div>
  );
}
