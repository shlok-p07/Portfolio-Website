import nuhireLogo from "./assets/logos/nuhire.webp";
import travelersLogo from "./assets/logos/travelers.webp";
import bruinsLogo from "./assets/logos/bruins.webp";
import northeasternLogo from "./assets/logos/northeastern.webp";
import rutgersLogo from "./assets/logos/rutgers.webp";
import sgaLogo from "./assets/logos/sga.webp";
import oasisLogo from "./assets/logos/oasis.webp";
import rainfallLogo from "./assets/logos/rainfall.webp";
import acesLogo from "./assets/logos/aces.webp";
import disruptLogo from "./assets/logos/disrupt.webp";
import nudiningLogo from "./assets/logos/nudining.webp";
import phishawareLogo from "./assets/logos/phishaware.svg";


export const PROJECTS = [
  {
    title: "NU Hire",
    logo: nuhireLogo,
    mark: "NH",
    client: "Khoury College of Computer Sciences",
    overview: "A web application for a live client, Khoury College, that teaches students the hiring process from the employer's side.",
    highlights: [
      "Student teams work through a full hiring pipeline: reading a job description, screening resumes under time pressure, evaluating recorded interviews and negotiating a group offer.",
      "An advisor watches every team's progress live and injects complications mid-exercise, such as candidate no-shows and internal referrals.",
      "Real-time collaboration runs on Socket.IO, so a teammate's selections appear instantly for the whole group.",
      "Every merge to main passes a 10-check GitHub Actions gate: tests, Docker build, migrations and a security audit.",
    ],
    org: "Khoury College of Computer Sciences",
    period: "Sep 2026 — Present",
    summary: "A live hiring simulation for Khoury students: teams screen resumes, judge interviews and negotiate an offer while an advisor injects complications.",
    stack: "Next.js, Express, Socket.IO, MySQL, Keycloak, Docker, GitHub Actions",
    github: "https://github.com/Oasis-NEU/NUHire",
    page: { label: "Project page", short: "Site", href: "https://khoury-co-op.github.io/NUHire/" },
  },
  {
    title: "Boston Bruins: Post-Draft Development Pathways",
    logo: bruinsLogo,
    mark: "BB",
    client: "Boston Bruins",
    overview: "A predictive-modeling engagement with the Boston Bruins, modeling optimal post-draft development pathways for the club's prospects. Professional practicum for DS 4535.",
    highlights: [
      "Building a reproducible Python data pipeline (pandas, scikit-learn) for the club's predictive-modeling questions.",
      "Leading requirements elicitation with the club's stakeholders, scoping objectives into a delivery plan across Agile sprints.",
      "Covered by a non-disclosure agreement: data, methods and findings stay confidential.",
    ],
    org: "Boston Bruins",
    period: "Sep 2026 — Present",
    summary: "Modeling post-draft development pathways for the club's prospects, under a non-disclosure agreement.",
    stack: "Python, pandas, scikit-learn",
    skills: "Stakeholder Management, Agile, Requirements Elicitation",
  },
  {
    title: "Rainfall Learning IDE",
    logo: rainfallLogo,
    mark: "RL",
    overview: "A real-time collaborative IDE for Rainfall Learning in which a tutor and a student can edit the same file at once and neither loses work.",
    highlights: [
      "Merges edits with Yjs CRDTs rather than locks, so changes converge without a server deciding who wins.",
      "A client that drops offline reconciles its changes when it reconnects.",
      "Led UI development with 10+ engineers; edit conflicts fell to 2%.",
      "Built the React and TypeScript UI layer, improving render performance by 20% during concurrent editing.",
    ],
    org: "Rainfall Learning",
    period: "Dec 2025 — Jul 2026",
    summary: "Two people edit the same file at once without losing work, using CRDT merging instead of locks.",
    stack: "React, TypeScript, Yjs, Express, Prisma, PostgreSQL, Docker",
    page: { label: "Docs", href: "https://aryan0102.github.io/Rainfall-Learning/" },
  },
  {
    title: "Derivative Hedging via Reinforcement Learning",
    mark: "RL·Δ",
    overview: "Reinforcement-learning agents (PPO and SAC) trained to hedge a short European call on real SPY market data, benchmarked against Black-Scholes delta hedging and the Whalley-Wilmott band.",
    highlights: [
      "Trained on 1,205 thirty-day windows of SPY history (2021–2026) and evaluated over 450 paired episodes in each of four market and transaction-cost regimes.",
      "Tested every comparison with a 10,000-resample paired bootstrap, so null results read as null results.",
      "PPO's mean edge over delta hedging was not statistically significant in any regime; Whalley-Wilmott matched or beat both agents with 65–87% fewer trades.",
      "A CVaR reward was gamed: the agent held a +0.27 long tilt instead of hedging, and its edge vanished once market drift was removed.",
      "Built a five-page Streamlit dashboard for live demos, training, evaluation and scenario analysis.",
    ],
    org: "Independent project",
    period: "Jan — Mar 2026",
    featured: true,
    metric: { value: "80%", label: "fewer trades for the same hedging result" },
    summary: "Tested whether an AI agent hedges options better than the industry-standard method. It didn't by a significant margin, and a simpler rule matched it with 80% fewer trades.",
    description:
      "A reproducible harness comparing six hedging strategies across four market regimes, with a 10,000-resample paired bootstrap for significance. The headline result is negative: the reinforcement-learning agent's edge over delta hedging was not statistically significant, while Whalley-Wilmott matched it at 80% fewer trades. Redesigning the reward as a conditional value-at-risk objective and tracing it with drift ablation showed the agent had been gaming it with a directional tilt.",
    stack: "Python, PyTorch, Stable-Baselines3, NumPy, pandas, SciPy, Streamlit",
    github: "https://github.com/shlok-p07/Reinforcement-Learning---Derivative-Hedging",
    demo: "https://reinforcementlearning-terminal.streamlit.app/",
  },
  {
    title: "PhishAware",
    logo: phishawareLogo,
    mark: "PA",
    overview: "A gamified phishing-awareness platform that trains employees against AI-generated, role-specific attack scenarios.",
    highlights: [
      "Led a 3-person team building the platform end to end.",
      "Generates each scenario with a two-stage LLM pipeline matched to the employee's role, using Groq as primary and Gemini as fallback.",
      "Practice across a simulated inbox, SMS thread and phone call, with lessons covering six attack vectors.",
      "Scores each employee's phishing risk with a scikit-learn model (R² 0.94) served over FastAPI.",
      "Single sign-on built from scratch on OIDC with PKCE, supporting Okta, Entra ID, Google Workspace and Auth0.",
      "Migrated the data layer across 44 files and built a multi-tenant organization backend with role-based access control.",
      "Turned into security research with Prof. Sarita Singh, submitted to WiCyS 2027: adaptive, role-specific training with calibration scoring.",
      "Contract-first API: one OpenAPI specification (57 operations across 45 paths) generates the Zod validators and React Query hooks via Orval; 1,341 automated tests.",
    ],
    org: "Independent project",
    period: "Jul — Sep 2026",
    featured: true,
    metric: { value: "R² 0.94", label: "employee phishing-risk model" },
    summary: "Security-training platform that scores each employee's phishing risk and generates training matched to their role.",
    description:
      "A full-stack phishing-awareness platform covering six attack vectors. A scikit-learn risk model (R-squared 0.94) served over FastAPI scores each employee, and a Groq and Gemini pipeline generates scenarios matched to their role. A contract-first OpenAPI specification (57 operations across 45 paths) generates the frontend's Zod validators and React Query hooks via Orval, and a from-scratch OIDC flow with PKCE handles organization single sign-on.",
    stack: "Next.js, TypeScript, Python, FastAPI, MongoDB, scikit-learn, Groq, Gemini, OpenAPI, Orval, Zod, React Query",
    github: "https://github.com/shlok-p07/Phish-Aware",
    demo: "https://phish-aware.onrender.com/",
  },
  {
    title: "NU Dining",
    logo: nudiningLogo,
    mark: "NUD",
    overview: "Menus, opening hours, meal voting and a nutrition tracker for Northeastern's three residential dining halls.",
    highlights: [
      "Pulls daily menus and hours from DineOnCampus with a scraper built to get past Cloudflare's blocking.",
      "Supabase PostgreSQL backend with row-level security, plus authenticated calorie tracking and meal voting.",
      "Treats stale data as a failure: menus older than 14 days are withheld, and every view shows how old its data is.",
    ],
    org: "NU Oasis",
    period: "Sep — Dec 2025",
    summary: "Live menus for three Northeastern dining halls, with calorie tracking and meal voting.",
    description:
      "Live daily menus for three dining halls, pulled from DineOnCampus on scheduled serverless jobs. The Supabase PostgreSQL backend uses row-level security, with authenticated calorie tracking and meal voting on top.",
    stack: "React, Vite, Tailwind CSS, Supabase, PostgreSQL",
    github: "https://github.com/Oasis-NEU/f25-group-7?files=1",
  },
];

const EXPERIENCE_RAW = [
  {
    role: "Software Engineer",
    group: "professional",
    overview: "A web application for a live client at Khoury College that teaches students the hiring process from the employer's side: teams screen resumes, evaluate recorded interviews and negotiate an offer while an advisor injects complications live.",
    org: "NU Hire",
    logo: nuhireLogo,
    mark: "NH",
    github: "https://github.com/Oasis-NEU/NUHire",
    start: "2026-09",
    end: null,
    context: "Khoury College of Computer Sciences",
    stack: "Next.js, Express, Socket.IO, MySQL, Keycloak, Docker, GitHub Actions, dbmate, Requirements Elicitation, Software Consulting",
    period: "Sep 2026 — Present",
    location: "Boston, MA",
    points: [
      "Built a 10-check GitHub Actions CI/CD gate (tests, Docker build, migrations and a security audit) that every merge to main must pass.",
      "Ran end-to-end QA of the live classroom flow and logged 60+ issues, including a critical bug that locked students out mid-session.",
      "Made dbmate migrations fail-stop before the server starts, and fixed the Docker build so it runs on both x86 and ARM.",
      "Real-time team collaboration runs on Socket.IO, so a teammate's selections appear instantly for the whole group.",
    ],
  },
  {
    role: "Software Engineering Co-op",
    group: "professional",
    overview: "Incoming software engineering co-op at Travelers, working remotely with the Hartford, CT office.",
    org: "Travelers",
    logo: travelersLogo,
    mark: "T",
    start: "2027-01",
    end: "2027-05",
    period: "Jan — May 2027",
    location: "Hartford, CT (Remote)",
    points: [
      "Joining Travelers as a software engineering co-op from January to May 2027.",
    ],
  },
  {
    role: "Data Analyst",
    group: "professional",
    overview: "Data analyst on a predictive-modeling engagement with the Boston Bruins, modeling post-draft development pathways for the club's prospects.",
    org: "Boston Bruins",
    logo: bruinsLogo,
    mark: "BB",
    start: "2026-09",
    end: null,
    context: "Professional Practicum, DS 4535",
    stack: "Python, pandas, scikit-learn, Agile, Stakeholder Management",
    period: "Sep 2026 — Present",
    location: "Boston, MA",
    points: [
      "Building a reproducible Python data pipeline (pandas, scikit-learn) for a predictive-modeling engagement.",
      "Lead requirements elicitation with stakeholders, scoping objectives into a delivery plan across Agile sprints.",
      "Covered by a non-disclosure agreement: data, methods and findings stay confidential.",
    ],
  },
  {
    role: "Peer Programmer",
    group: "student",
    overview: "Peer programmer with NU ACES, Northeastern's Alliance of Civically Engaged Students.",
    org: "NU ACES",
    logo: acesLogo,
    mark: "ACES",
    start: "2026-09",
    end: null,
    context: "Alliance of Civically Engaged Students",
    stack: "Event Planning, Facilitation, Civic Engagement, Leadership",
    period: "Sep 2026 — Present",
    location: "Boston, MA",
    points: [
      "Plan, develop and facilitate community-building, civic-engagement and community-service events for first-year and upper-class participants.",
      "Serve on the ACES leadership team, shaping social programming around the four pillars of service, civic learning, civic action and alliance building.",
      "Share volunteer and civic-engagement experience with incoming students as they begin weekly service with Boston community partners.",
    ],
  },
  {
    role: "Lead Software Engineer",
    group: "student",
    overview: "Lead software engineer on Student Government's Digital Innovation team, building the CMS behind the SGA website. Student Government replaces most of its staff every year, so non-technical officers build pages by drag and drop instead of editing code.",
    org: "Student Government Association",
    logo: sgaLogo,
    mark: "SGA",
    github: "https://github.com/SGAOperations/website-development",
    demo: "https://sga-site-builder.vercel.app",
    start: "2026-01",
    end: null,
    stack: "Next.js, TypeScript, React, Puck, Prisma, PostgreSQL, Supabase, Tailwind CSS, shadcn/ui",
    context: "Northeastern University",
    period: "Jan 2026 — Present",
    location: "Boston, MA",
    points: [
      "Built a production CMS that lets non-technical editors publish to 5,000+ students, cutting publish time by 10%.",
      "Drag-and-drop page building with React Puck, with Supabase authentication and Vercel hosting.",
      "Architected version history, rollback, role-based access control, and soft-delete archiving on Next.js and Prisma.",
      "Engineered Prisma-validated API endpoints enforcing schema integrity on every mutation over PostgreSQL.",
      "Manage the development lifecycle for a team of 5+ engineers as one of 3 tech leads: tickets, sprint planning and code review.",
    ],
  },
  {
    role: "Quantitative Analyst",
    group: "student",
    overview: "Quantitative analyst with Disrupt, Northeastern's FinTech initiative, building and testing trading strategies.",
    org: "Disrupt: The FinTech Initiative",
    logo: disruptLogo,
    mark: "DISRUPT",
    start: "2026-01",
    end: "2026-05",
    stack: "Python, pandas, NumPy",
    context: "Northeastern University",
    period: "Jan — May 2026",
    location: "Boston, MA",
    points: [
      "Built Python backtesting pipelines evaluating trading signals across 10M+ historical equity data points.",
      "Developed pairs-trading, mean-reversion, and momentum strategies deployed on $50,000 of simulated capital.",
      "Translated research on statistical arbitrage, factor investing, and market microstructure into testable signals.",
    ],
  },
  {
    role: "Project-Series Mentor",
    group: "student",
    overview: "Mentor in NU Oasis's project series at Northeastern.",
    org: "NU Oasis",
    logo: oasisLogo,
    mark: "OASIS",
    github: "https://github.com/Oasis-NEU/f26-group-8",
    start: "2026-01",
    end: null,
    stack: "React, TypeScript, Node.js, Next.js",
    context: "Northeastern University",
    period: "Jan 2026 — Present",
    location: "Boston, MA",
    points: [
      "Mentor teams of 4+ students building and shipping full-stack software projects.",
      "Guide teams through projects built with React, TypeScript, Node.js and Next.js.",
    ],
  },
  {
    role: "Teaching Assistant",
    group: "professional",
    org: "Program Design and Implementation II",
    logo: northeasternLogo,
    mark: "OOD",
    overview: "Teaching assistant for Program Design and Implementation II at Khoury College of Computer Sciences.",
    start: "2026-05",
    end: null,
    stack: "Java, Gradle, JUnit, Mockito, Claude, GitHub Copilot",
    context: "Khoury College of Computer Sciences",
    period: "May 2026 — Present",
    location: "Boston, MA",
    points: [
      "Led 30+ weekly debugging sessions in Java covering object-oriented programming, data structures, and control flow.",
      "Guided students through writing test cases with JUnit and Mockito, and running them through the Gradle wrapper so local builds matched the grading environment.",
      "Taught 100+ students AI-assisted debugging and prompt engineering with Claude and GitHub Copilot.",
      "Graded against detailed rubrics with written feedback on SOLID principles, design, and correctness.",
    ],
  },
  {
    role: "Lead Software Engineer",
    group: "student",
    overview: "Lead software engineer for Rainfall Learning's real-time collaborative IDE, in which two people can edit the same file at once and neither loses work.",
    org: "Rainfall Learning",
    logo: rainfallLogo,
    mark: "RL",
    start: "2025-12",
    end: "2026-07",
    stack: "React, TypeScript, Yjs, Express, Prisma, PostgreSQL, Docker, Vitest",
    period: "Dec 2025 — Jul 2026",
    location: "Boston, MA",
    points: [
      "Led UI development on a real-time collaborative IDE with 10+ engineers, cutting edit conflicts to 2% via Yjs CRDT sync.",
      "Built a React and TypeScript UI layer, improving render performance by 20% during concurrent editing.",
      "Edits merge through CRDTs rather than locks, so a client that drops offline reconciles its changes when it reconnects.",
      "Dockerized build pipelines to reduce environment failures by 15%, hardening deployments with automated testing.",
    ],
  },
  {
    role: "Teaching Assistant",
    group: "professional",
    org: "Rutgers University",
    logo: rutgersLogo,
    mark: "RU",
    overview: "Teaching assistant for a summer math program at Rutgers University.",
    start: "2024-06",
    end: "2025-08",
    stack: "Excel",
    period: "Summers 2024 & 2025",
    location: "New Brunswick, NJ",
    points: [
      "Coordinated logistics for 100+ camp participants.",
      "Contributed to a 10% improvement in math scores over a 6–8 week program.",
    ],
  },
];

export const RESEARCH = [
  {
    title: "Multimodal Machine Learning for Parkinson's Detection",
    visual: "auroc",
    metric: { value: "0.720 → 0.774", label: "AUROC across 2,685 subjects" },
    summary: "Combining voice, finger-tapping and walking data from 2,685 people to detect Parkinson's disease, improving the detection score (AUROC) from 0.720 to 0.774.",
    role: "Undergraduate Researcher",
    group: "Intelligent Automation (IoT) Research Group, Northeastern University",
    advisor: "Prof. Sarita Singh",
    period: "July 2026 — Present",
    work: [
      "Advised by Prof. Sarita Singh.",
      "Engineered a machine learning pipeline in librosa, Praat and PyTorch that fuses voice, tapping and gait signals, using gated and attention fusion networks over a stacking meta-learner.",
      "Raised AUROC from 0.720 to 0.774 across 2,685 subjects (p = 0.080, so the gain is suggestive rather than significant at the conventional threshold).",
      "Benchmarked more than eight models under leakage-free evaluation, holding the subject partition fixed so no participant appears in both train and test.",
      "Hardened the pipeline with over 100 unit tests.",
    ],
    stack: "Python, PyTorch, librosa, Praat, scikit-learn, NumPy, pandas",
  },
  {
    title: "Artificial Intelligence Coding Tools in Computer Science Education",
    visual: "study",
    venue: "ACM SIGCSE 2027",
    metric: { value: "2 posters", label: "submitted to ACM SIGCSE 2027" },
    summary: "Measuring how four AI coding assistants compare with human programmers in computer science education. Two posters submitted to ACM SIGCSE 2027.",
    role: "Undergraduate Researcher",
    group: "Intelligent Automation (IoT) Research Group, Northeastern University",
    advisor: "Prof. Sarita Singh",
    period: "July — September 2026",
    work: [
      "Advised by Prof. Sarita Singh.",
      "Designed a differential human-baseline versus AI protocol benchmarking four coding assistants across four language paradigms on generation, debugging and refactoring.",
      "Framed the study with an integrated TPACK, SAMR, TAM and Bloom model.",
      "Two posters submitted to the ACM SIGCSE 2027 symposium.",
    ],
    stack: "Claude Code, GitHub Copilot, Cursor, ChatGPT, Python, Java, Prolog, TypeScript, LaTeX",
  },
  {
    title: "Fighting AI-Generated Phishing with AI-Generated Training: Adaptive, Role-Specific Simulation with Calibration Scoring",
    visual: "loop",
    metric: { value: "WiCyS 2027", label: "submitted" },
    venue: "WiCyS 2027",
    summary: "Turning PhishAware into security research: AI-generated, role-specific phishing practice that adapts to each learner's weak spots and flags people who are confidently wrong. Submitted to WiCyS 2027.",
    role: "Undergraduate Researcher",
    group: "Northeastern University",
    advisor: "Prof. Sarita Singh",
    period: "Fall 2026",
    work: [
      "Advised by Prof. Sarita Singh. Submitted to WiCyS 2027.",
      "A two-stage LLM pipeline generates role-specific scenarios across six channels: email, SMS, voice, QR codes, social media and web pages.",
      "Deterministic application logic constrains every scenario to a fixed taxonomy of eight gradeable red-flag cues.",
      "Learners classify each message, identify the cues behind their decision and report their confidence; a calibration score finds learners who are confidently incorrect.",
      "An adaptive model steers practice toward each learner's weakest attack types and persuasion tactics, and missed cues return through spaced repetition. Personalized targeting is gated by opt-in consent.",
      "A formative evaluation with student participants found the cue-level explanations clear and useful; their feedback drove four design revisions.",
    ],
    stack: "TypeScript, Next.js, FastAPI, MongoDB, Groq, Gemini",
  },
];

export const TOOLKIT = [
  {
    label: "Languages",
    items: [
      "Python", "TypeScript", "JavaScript",
      "Java", "SQL", "C++", "HTML/CSS", "MATLAB",
    ],
  },
  {
    label: "Machine learning",
    items: [
      "PyTorch", "Stable-Baselines3",
      "Gymnasium", "scikit-learn",
      "TensorBoard",
    ],
  },
  {
    label: "Scientific computing",
    items: ["NumPy", "pandas", "SciPy", "Jupyter"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "Flask", "FastAPI"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "Supabase", "MongoDB", "Prisma"],
  },
  {
    label: "AI tools",
    items: ["Claude Code", "GitHub Copilot", "Groq", "Gemini"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "Git", "GitHub Actions", "AWS", "Linear", "Jira"],
  },
  {
    label: "Testing & design",
    items: ["Vitest", "Puppeteer", "Streamlit", "Figma"],
  },
];

export const PROFILE = {
  name: "Shlok Patel",
  role: "CS and FinTech Student at Northeastern University",
  location: "Boston, MA",

  degree: "B.S. Computer Science and Business Administration, concentration in Financial Technology",
  school: "Khoury College of Computer Sciences and D'Amore-McKim School of Business",
  gpa: "3.74 / 4.0",
  graduation: "May 2029",
  availability: "June to September 2027",
  honors: "Dean's List, Northeastern Honors College",
  societies: "Disrupt (Northeastern FinTech Club), Student Government Association, NU ACES, NU Oasis",
  coursework: {
    "Computer science": [
      "Algorithms and Data",
      "Fundamentals of Software Engineering",
      "Program Design and Implementation 1 and 2 (OOD)",
      "Databases",
      "Computer Systems",
      "Discrete Structures",
      "Projects in Robotics",
    ],
    "Business and finance": [
      "Corporate Finance",
      "Financial Management",
      "Financial Accounting and Reporting",
      "Business Statistics",
      "Information Systems and Digital Technology",
    ],
  },
  certifications: "Bloomberg Market Concepts, Bloomberg Finance Fundamentals, Bloomberg Spreadsheet Analysis, AKUNA Options 101, CFI Financial Analysis and Modeling, AmplifyMe Finance Accelerator, Markets Quantitative Analysis (MQA), WSP Microsoft Excel",

  intro:
    "I build full-stack software and do machine learning research on multimodal sensor data. The finance side comes from the business half of my degree.",
  about: [
    "Most of what I do is ordinary software engineering — building things end to end and trying to make them hold up once other people use them.",
    "The rest is data work: building machine learning pipelines and then being careful about how they get measured — leakage-free splits, bootstrap tests for significance, over a hundred unit tests behind the training code, and reporting a result even when it comes out negative.",
    "Outside of coursework I volunteer around Boston, play chess, hike, and do graphic design in Illustrator and Photoshop.",
  ],
};

export const CONTACT = [
  { label: "Email", value: "patel.s15@northeastern.edu", href: "mailto:patel.s15@northeastern.edu" },
  { label: "LinkedIn", value: "@-shlokpatel", href: "https://www.linkedin.com/in/-shlokpatel" },
  { label: "GitHub", value: "@shlok-p07", href: "https://github.com/shlok-p07" },
  { label: "Resume", value: "PDF", href: encodeURI("/Shlok Patel's Resume(CS).pdf") },
];

export const EXPERIENCE = [...EXPERIENCE_RAW].sort((a, b) => {
  if (a.start !== b.start) return a.start < b.start ? 1 : -1;
  if (!a.end && b.end) return -1;
  if (a.end && !b.end) return 1;
  return 0;
});
