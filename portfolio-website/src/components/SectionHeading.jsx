const SectionHeading = ({ children }) => (
  <div className="flex flex-col items-center gap-3">
    <h1 className="text-5xl sm:text-6xl lg:text-7xl text-center text-blue-500 font-display tracking-wide">
      {children}
    </h1>
    <svg
      viewBox="0 0 200 18"
      fill="none"
      className="w-32 sm:w-40 h-3.5 text-blue-500"
      aria-hidden="true"
    >
      <path
        d="M4 10 Q 30 2, 55 9 T 105 8 T 155 10 T 196 6"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  </div>
);

export default SectionHeading;
