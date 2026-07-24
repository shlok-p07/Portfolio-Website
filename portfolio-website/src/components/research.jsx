import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FlaskConical, ExternalLink } from "lucide-react";
import BorderGlow from "./BorderGlow";
import SectionHeading from "./SectionHeading";

gsap.registerPlugin(ScrollTrigger);

const RESEARCH = [
  {
    title: "Multimodal Sensor Fusion for Early Parkinson's Detection",
    group: "Intelligent Automation (IoT) Research Group",
    institution: "Northeastern University",
    advisor: "Prof. Sarita Singh",
    description:
      "Undergraduate research in applied machine learning and multimodal deep learning, using early Parkinson's indicator prediction as the application domain for a broader problem: whether fusing heterogeneous sensor streams (tremor, voice, and gait time-series) outperforms single-source models. I design the fusion architectures (early, late, gated, and attention-based), build the feature-extraction and training pipeline, and benchmark strategies under subject-independent cross-validation with statistical significance testing to ensure reproducible, non-leaky results. I also work on model compression and optimization for deployment on resource-constrained edge devices. The project sits at the intersection of multimodal representation learning, model evaluation methodology, and edge/embedded ML.",
    methods: [
      "Multimodal Fusion",
      "Attention Mechanisms",
      "Deep Learning",
      "Representation Learning",
      "Model Evaluation & Subject-Independent Validation",
      "Edge / Embedded ML",
      "Time-Series Modeling",
    ],
    tech: ["Python", "PyTorch", "NumPy / pandas", "scikit-learn", "Embedded C/C++", "Model Optimization"],
  },
];

export const Research = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="research"
      className="relative w-full flex justify-center py-20 sm:py-28"
    >
      <div className="w-full max-w-6xl px-4 sm:px-6 flex flex-col gap-10">

        <SectionHeading>Research</SectionHeading>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {RESEARCH.map((r, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <BorderGlow
                borderRadius={16}
                colors={["#3b82f6", "#6366f1", "#0ea5e9"]}
                glowColor="217 91 60"
                glowIntensity={0.9}
                className="w-full"
              >
                <div className="flex flex-col bg-white/2 rounded-2xl border border-white/[0.07] transition-colors duration-300 overflow-hidden px-6 sm:px-10 py-7 sm:py-9 gap-5">
                  {/* Meta row */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-[10px] text-blue-400 tracking-widest uppercase">
                      {r.category}
                    </span>
                    {r.status && (
                      <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-[10px] font-mono uppercase tracking-widest text-blue-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        {r.status}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div className="relative">
                    <span className="absolute -top-5 -left-1 text-8xl font-extrabold text-white/3 leading-none select-none pointer-events-none">
                      {r.index}
                    </span>
                    <div className="relative flex items-start gap-3">
                      <FlaskConical size={26} className="mt-1 shrink-0 text-blue-400" />
                      <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                        {r.title}
                      </h2>
                    </div>
                  </div>

                  {/* Affiliation */}
                  <div className="flex flex-col gap-1 border-l-2 border-blue-500/30 pl-4">
                    <span className="text-blue-100 text-sm sm:text-base font-semibold">
                      {r.group}
                    </span>
                    <span className="text-neutral-400 text-sm">
                      {r.institution}
                      {r.advisor && (
                        <>
                          <span className="mx-2 text-neutral-700">·</span>
                          Advised by {r.advisor}
                        </>
                      )}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {r.description}
                  </p>

                  {/* Methods */}
                  {r.methods?.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                        Focus Areas
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {r.methods.map((m, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-mono rounded-md bg-white/5 border border-white/10 text-neutral-300"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech */}
                  {r.tech?.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-[10px] text-neutral-500 tracking-widest uppercase">
                        Tools & Languages
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {r.tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-mono rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Links */}
                  {(r.paper || r.github) && (
                    <div className="flex items-center gap-3 flex-wrap">
                      {r.paper && (
                        <a
                          href={r.paper}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 w-fit px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/25 text-sm font-mono text-blue-400 hover:text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/15 transition-all duration-200 no-underline"
                        >
                          <ExternalLink size={14} />
                          Read Paper
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </BorderGlow>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
