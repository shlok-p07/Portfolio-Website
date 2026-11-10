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
    org: "Khoury College of Computer Sciences",
    period: "Sep 2026 — Present",
    summary: "A live hiring simulation for Khoury students: teams screen resumes, judge interviews and negotiate an offer while an advisor injects complications.",
    stack: "Next.js, Express, Socket.IO, MySQL, Keycloak, Docker, GitHub Actions",
    github: "https://github.com/Oasis-NEU/NUHire",
    page: { label: "Project page", short: "Site", href: "https://khoury-co-op.github.io/NUHire/" },
    overview: "What does hiring look like from the other side of the table? NU Hire puts Khoury students in the employer's seat: teams screen resumes against the clock, judge recorded interviews and negotiate an offer together, while an advisor drops no-shows and internal referrals into the exercise live. On a team of 10+ engineers, I owned the safeguards that keep a live classroom from breaking. Built for Khoury College, though never handed off.",
    highlights: [
      "A GitHub Actions gate runs tests, the Docker build, migrations and a security audit; nothing reaches main until all of them pass.",
      "dbmate migrations run before the API starts and fail-stop on error, and CI fails whenever the Prisma schema drifts from the migrations.",
      "Resume PDFs have their text extracted on upload, with a backfill for older rows, to power keyword-based applicant screening.",
      "End-to-end QA caught a critical bug that locked students out of a session midway through.",
      "Tightened TypeScript types across the Socket.IO controllers, the session store and the offer flow."
    ],
    numbers: [
      ["10", "CI checks gate every merge to main"],
      ["60+", "issues logged in end-to-end QA"],
      ["10+", "engineers on the team"],
      ["x86 + ARM", "Docker builds that run on both"]
    ],
  },
  {
    title: "Boston Bruins: Post-Draft Development Pathways",
    logo: bruinsLogo,
    mark: "BB",
    client: "Boston Bruins",
    org: "Boston Bruins",
    period: "Sep 2026 — Present",
    summary: "Modeling post-draft development pathways for the club's prospects, under a non-disclosure agreement.",
    stack: "Python, pandas, scikit-learn",
    skills: "Stakeholder Management, Agile, Requirements Elicitation",
    overview: "Draft day is only the start: what a prospect does over the next few seasons decides whether the pick pays off. On a five-person team working with the Boston Bruins, I lead the requirements work with the club and build the modeling pipeline behind it. The engagement is under a non-disclosure agreement.",
    highlights: [
      "Requirements elicitation with club stakeholders, turning open questions into scoped objectives and a delivery plan across Agile sprints.",
      "A reproducible Python pipeline (pandas, scikit-learn) for the club's predictive modeling of development pathways.",
      "Data, methods and findings stay confidential under the non-disclosure agreement."
    ],
    numbers: [
      ["5", "people on the team, including me"],
      ["DS 4535", "professional practicum"]
    ],
  },
  {
    title: "Rainfall Learning IDE",
    logo: rainfallLogo,
    mark: "RL",
    org: "Rainfall Learning",
    period: "Dec 2025 — Jul 2026",
    summary: "Two people edit the same file at once without losing work, using CRDT merging instead of locks.",
    stack: "React, TypeScript, Yjs, Express, Prisma, PostgreSQL, Docker",
    page: { label: "Docs", href: "https://aryan0102.github.io/Rainfall-Learning/" },
    overview: "Two people typing in the same file is the classic way to lose work. Rainfall Learning's IDE lets a tutor and a student edit together in real time, and I led its UI development on a team of 15+ engineers.",
    highlights: [
      "Edits merge through Yjs CRDTs rather than locks, so changes converge without a server deciding who wins.",
      "A client that drops offline reconciles its changes as soon as it reconnects.",
      "Built the React and TypeScript UI layer that keeps the editor responsive while several people type.",
      "Dockerized the build pipelines and hardened deployments with automated tests in Vitest."
    ],
    numbers: [
      ["2%", "edit conflicts with CRDT sync"],
      ["20%", "faster rendering under concurrent editing"],
      ["15%", "fewer environment failures"],
      ["15+", "engineers on the team"]
    ],
  },
  {
    title: "Derivative Hedging via Reinforcement Learning",
    mark: "RL·Δ",
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
    overview: "Can a reinforcement-learning agent hedge options better than the textbook formula? I trained PPO and SAC agents to hedge a short call on real SPY data and pitted them against Black-Scholes delta hedging and the Whalley-Wilmott band. The honest answer was no, and the project is built to prove that rather than hide it.",
    highlights: [
      "Six hedging strategies across four market and transaction-cost regimes, with 450 paired episodes in each regime.",
      "Every comparison runs through a paired bootstrap, so null results read as null results.",
      "Whalley-Wilmott matched or beat both agents with 65–87% fewer trades, depending on the regime.",
      "A CVaR reward got gamed: the agent held a +0.27 long tilt instead of hedging, and its edge vanished once a drift ablation removed the market trend.",
      "A five-page Streamlit dashboard runs live demos, training, evaluation and scenario analysis."
    ],
    numbers: [
      ["1,205", "thirty-day SPY windows, 2021–2026"],
      ["10,000", "bootstrap resamples per comparison"],
      ["80%", "fewer trades for Whalley-Wilmott, same result"],
      ["p ≥ 0.29", "RL edge over delta hedging: not significant"]
    ],
  },
  {
    title: "PhishAware",
    client: "CS 4530 (Fundamentals of Software Engineering)",
    logo: phishawareLogo,
    mark: "PA",
    org: "Khoury College of Computer Sciences",
    period: "Jul — Sep 2026",
    featured: true,
    metric: { value: "R² 0.94", label: "employee phishing-risk model" },
    summary: "Security-training platform that scores each employee's phishing risk and generates training matched to their role.",
    description:
      "A full-stack phishing-awareness platform covering six attack vectors. A scikit-learn risk model (R-squared 0.94) served over FastAPI scores each employee, and a Groq and Gemini pipeline generates scenarios matched to their role. A contract-first OpenAPI specification (57 operations across 45 paths) generates the frontend's Zod validators and React Query hooks via Orval, and a from-scratch OIDC flow with PKCE handles organization single sign-on.",
    stack: "Next.js, TypeScript, Python, FastAPI, MongoDB, scikit-learn, Groq, Gemini, OpenAPI, Orval, Zod, React Query",
    github: "https://github.com/shlok-p07/Phish-Aware",
    demo: "https://phish-aware.onrender.com/",
    overview: "Phishing emails are now written by AI, yet most security training is still a generic, once-a-year module. I led a three-person team building PhishAware for CS 4530: it writes attacks matched to each employee's role and scores who is most at risk. The work became research with Prof. Sarita Singh, submitted to WiCyS 2027.",
    highlights: [
      "A two-stage LLM pipeline writes each scenario for the employee's role, with Groq as primary and Gemini as failover.",
      "Employees practice in a simulated inbox, SMS thread and phone call.",
      "Single sign-on written from scratch on OIDC with PKCE, working with Okta, Entra ID, Google Workspace and Auth0.",
      "Migrated the data layer across 44 files to a multi-tenant organization backend with role-based access control.",
      "The OpenAPI contract (45 paths) generates the Zod validators and React Query hooks through Orval, and the scikit-learn risk model is served over FastAPI."
    ],
    numbers: [
      ["R² 0.94", "employee phishing-risk model"],
      ["57", "API operations from one OpenAPI contract"],
      ["1,341", "automated tests"],
      ["6", "attack vectors covered"]
    ],
  },
  {
    title: "NU Dining",
    logo: nudiningLogo,
    mark: "NUD",
    org: "NU Oasis",
    period: "Sep — Dec 2025",
    summary: "Live menus for three Northeastern dining halls, with calorie tracking and meal voting.",
    description:
      "Live daily menus for three dining halls, pulled from DineOnCampus on scheduled serverless jobs. The Supabase PostgreSQL backend uses row-level security, with authenticated calorie tracking and meal voting on top.",
    stack: "React, Vite, Tailwind CSS, Supabase, PostgreSQL",
    github: "https://github.com/Oasis-NEU/f25-group-7?files=1",
    overview: "Which dining hall is worth the walk today? NU Dining shows live menus and opening hours for Northeastern's three residential dining halls, with meal voting and calorie tracking, built as a team project in NU Oasis.",
    highlights: [
      "A scraper built to get past Cloudflare's blocking pulls daily menus and hours from DineOnCampus on scheduled serverless jobs.",
      "Supabase PostgreSQL backend with row-level security; calorie tracking and meal voting require sign-in.",
      "Stale data is treated as a bug: older menus are withheld, and every view shows how old its data is."
    ],
    numbers: [
      ["3", "residential dining halls covered"],
      ["14 days", "oldest menu it will ever show"]
    ],
  },
];

const EXPERIENCE_RAW = [
  {
    role: "Software Engineer",
    group: "professional",
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
    overview: "One of 10+ engineers building NU Hire, a live hiring simulation for Khoury College. I took ownership of the team's release safety net, so a bad merge or a broken migration never reaches a live classroom. The project was never handed off to the client.",
    points: [
      "Built the GitHub Actions gate: tests, Docker build, migrations and a security audit, required on every pull request.",
      "Made dbmate migrations fail-stop before the API starts, and added a CI check for Prisma schema drift.",
      "Fixed the Docker build so it runs on both x86 and ARM machines.",
      "Ran end-to-end QA of the live classroom flow, including a critical mid-session lockout bug."
    ],
    numbers: [
      ["10", "CI checks on every merge"],
      ["60+", "issues logged in QA"],
      ["10+", "engineers on the team"]
    ],
  },
  {
    role: "Software Engineering Co-op",
    group: "professional",
    org: "Travelers",
    logo: travelersLogo,
    mark: "T",
    start: "2027-01",
    end: "2027-05",
    period: "Jan — May 2027",
    location: "Hartford, CT (Remote)",
    overview: "Selected for Travelers' software engineering co-op, January to May 2027, working remotely with the Hartford, CT team. Travelers is one of the largest property and casualty insurers in the U.S.",
    points: [],
    numbers: [],
  },
  {
    role: "Data Analyst",
    group: "professional",
    org: "Boston Bruins",
    logo: bruinsLogo,
    mark: "BB",
    start: "2026-09",
    end: null,
    context: "Professional Practicum, DS 4535",
    stack: "Python, pandas, scikit-learn, Agile, Stakeholder Management",
    period: "Sep 2026 — Present",
    location: "Boston, MA",
    overview: "On a five-person team (including me) working with the Boston Bruins, I lead requirements elicitation, turning the club stakeholders' open questions into a scoped, sprint-by-sprint delivery plan, and build the modeling pipeline behind it. The work is under a non-disclosure agreement.",
    points: [
      "A reproducible Python pipeline (pandas, scikit-learn) for the club's predictive modeling of post-draft development pathways.",
      "Objectives scoped into Agile sprints, with a delivery plan built from the stakeholder sessions.",
      "Data, methods and findings stay confidential."
    ],
    numbers: [
      ["5", "people on the team, including me"],
      ["DS 4535", "professional practicum"]
    ],
  },
  {
    role: "Peer Programmer",
    group: "student",
    org: "NU ACES",
    logo: acesLogo,
    mark: "ACES",
    start: "2026-09",
    end: null,
    context: "Alliance of Civically Engaged Students",
    stack: "Event Planning, Facilitation, Civic Engagement, Leadership",
    period: "Sep 2026 — Present",
    location: "Boston, MA",
    overview: "On the NU ACES leadership team, I plan and run the events that bring first-year and upper-class students together around service and civic life.",
    points: [
      "Plan, develop and facilitate community-building, civic-engagement and community-service events.",
      "Shape social programming around the program's four pillars.",
      "Help incoming students as they begin weekly service with Boston community partners."
    ],
    numbers: [
      ["4", "pillars: service, civic learning, civic action, alliance building"]
    ],
  },
  {
    role: "Lead Software Engineer",
    group: "student",
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
    overview: "One of three tech leads on Student Government's Digital Innovation team, I run the development cycle for 5+ engineers while building the CMS behind the SGA website. Officers turn over every year, so we gave them a tool that needs no code.",
    points: [
      "Run tickets, sprint planning and code review for the team.",
      "Drag-and-drop page building with React Puck, Supabase authentication and Vercel hosting.",
      "Version history, rollback, role-based access control and soft-delete archiving on Next.js and Prisma.",
      "Prisma-validated API endpoints keep malformed writes out of PostgreSQL."
    ],
    numbers: [
      ["5,000+", "students reached"],
      ["10%", "faster publishing"],
      ["5+", "engineers I lead with two other tech leads"]
    ],
  },
  {
    role: "Quantitative Analyst",
    group: "student",
    org: "Disrupt: The FinTech Initiative",
    logo: disruptLogo,
    mark: "DISRUPT",
    start: "2026-01",
    end: "2026-05",
    stack: "Python, pandas, NumPy",
    context: "Northeastern University",
    period: "Jan — May 2026",
    location: "Boston, MA",
    overview: "At Disrupt, Northeastern's FinTech club, I turned research on statistical arbitrage, factor investing and market microstructure into trading signals, then put every one through a backtest before it touched capital.",
    points: ["Built Python backtesting pipelines in pandas and NumPy.", "Developed pairs-trading, mean-reversion and momentum strategies."],
    numbers: [
      ["10M+", "historical equity data points backtested"],
      ["$50,000", "simulated capital deployed"],
      ["3", "strategy families"]
    ],
  },
  {
    role: "Project-Series Mentor",
    group: "student",
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
    overview: "As a project-series mentor at NU Oasis, I guide groups of 5+ students through building their first-ever web apps, from a rough idea to a working full-stack app.",
    points: ["Break features down, unblock code and review pull requests.", "Teams build with React, TypeScript, Node.js and Next.js."],
    numbers: [
      ["5+", "students in each group"]
    ],
  },
  {
    role: "Teaching Assistant",
    group: "professional",
    org: "Program Design and Implementation II",
    logo: northeasternLogo,
    mark: "OOD",
    start: "2026-05",
    end: null,
    stack: "Java, Gradle, JUnit, Mockito, Claude, GitHub Copilot",
    context: "Khoury College of Computer Sciences",
    period: "May 2026 — Present",
    location: "Boston, MA",
    overview: "As a teaching assistant for Program Design and Implementation II, Khoury College's object-oriented design course, I help students write Java that is well designed, not just Java that passes.",
    points: [
      "Debugging sessions cover object-oriented programming, data structures and control flow.",
      "Coach test writing with JUnit and Mockito, run through the Gradle wrapper so local builds match the grader.",
      "Teach prompt engineering and debugging with Claude and GitHub Copilot.",
      "Grade against detailed rubrics with written feedback on SOLID principles, design and correctness."
    ],
    numbers: [
      ["30+", "weekly debugging sessions led"],
      ["100+", "students taught AI-assisted debugging"]
    ],
  },
  {
    role: "Lead Software Engineer",
    group: "student",
    org: "Rainfall Learning",
    logo: rainfallLogo,
    mark: "RL",
    start: "2025-12",
    end: "2026-07",
    stack: "React, TypeScript, Yjs, Express, Prisma, PostgreSQL, Docker, Vitest",
    period: "Dec 2025 — Jul 2026",
    location: "Boston, MA",
    overview: "I led UI development for Rainfall Learning's real-time collaborative IDE on a team of 15+ engineers, so a tutor and a student can edit the same file at once without either losing work.",
    points: [
      "Yjs CRDT sync merges edits without locks, and offline clients reconcile when they reconnect.",
      "Built the React and TypeScript UI layer for concurrent editing.",
      "Dockerized build pipelines and hardened deployments with automated testing."
    ],
    numbers: [
      ["15+", "engineers on the team"],
      ["2%", "edit conflicts"],
      ["20%", "faster rendering"],
      ["15%", "fewer environment failures"]
    ],
  },
  {
    role: "Teaching Assistant",
    group: "professional",
    org: "Rutgers University",
    logo: rutgersLogo,
    mark: "RU",
    start: "2024-06",
    end: "2025-08",
    stack: "Excel",
    period: "Summers 2024 & 2025",
    location: "New Brunswick, NJ",
    overview: "Two summers as a teaching assistant in Rutgers University's summer math program, keeping a large camp running and its students on track.",
    points: [],
    numbers: [
      ["100+", "camp participants coordinated"],
      ["10%", "math score improvement in 6–8 weeks"]
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
  gpa: "3.7 / 4.0",
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
