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
    title: "PhishAware",
    client: "CS 4530 (Fundamentals of Software Engineering)",
    logo: phishawareLogo,
    mark: "PA",
    org: "Khoury College of Computer Sciences",
    period: "Jul — Sep 2026",
    overview: "A phishing-awareness platform built for CS 4530 that generates simulated attacks tailored to each employee's role and estimates individual risk. I led a three-person team through its design and delivery. The platform became the basis of a study with Prof. Sarita Singh, submitted to WiCyS 2027.",
    highlights: [
      "A two-stage LLM pipeline writes each scenario for the employee's role, with Groq as the primary provider and Gemini as failover.",
      "Employees practice across six attack vectors in a simulated inbox, SMS thread and phone call.",
      "Single sign-on implemented from first principles on OIDC with PKCE, compatible with Okta, Entra ID, Google Workspace and Auth0.",
      "Migrated the data layer across 44 files to a multi-tenant organization backend with role-based access control.",
      "A contract-first API of 57 operations across 45 paths, whose OpenAPI specification generates Zod validators and React Query hooks through Orval.",
      "A scikit-learn risk model (R² 0.94) served over FastAPI, and 1,341 automated tests across the codebase.",
    ],
    stack: "Next.js, TypeScript, Python, FastAPI, MongoDB, scikit-learn, Groq, Gemini, OpenAPI, Orval, Zod, React Query",
    demo: "https://phish-aware.onrender.com/",
    github: "https://github.com/shlok-p07/Phish-Aware",
  },
  {
    title: "Derivative Hedging via Reinforcement Learning",
    mark: "RL·Δ",
    org: "Independent project",
    period: "Jan — Mar 2026",
    overview: "An independent study of whether reinforcement-learning agents can hedge options more effectively than established methods. PPO and SAC agents were trained to hedge a short European call on SPY market data and compared with Black-Scholes delta hedging and the Whalley-Wilmott band. The agents showed no statistically significant advantage, and the Whalley-Wilmott band achieved comparable results with 80% fewer trades.",
    highlights: [
      "Six hedging strategies evaluated on 1,205 thirty-day SPY windows (2021–2026), with 450 paired episodes in each of four market and transaction-cost regimes.",
      "Every comparison tested with a 10,000-resample paired bootstrap, so that null results are reported as null results.",
      "Across regimes, Whalley-Wilmott matched or outperformed both agents while trading 65–87% less often.",
      "Under a CVaR reward the agent held a +0.27 long position instead of hedging; a drift ablation showed that its apparent advantage came from market drift.",
      "A five-page Streamlit dashboard supports demonstrations, training, evaluation and scenario analysis.",
    ],
    stack: "Python, PyTorch, Stable-Baselines3, NumPy, pandas, SciPy, Streamlit",
    demo: "https://reinforcementlearning-terminal.streamlit.app/",
    github: "https://github.com/shlok-p07/Reinforcement-Learning---Derivative-Hedging",
  },
  {
    title: "NU Dining",
    logo: nudiningLogo,
    mark: "NUD",
    org: "NU Oasis",
    period: "Sep — Dec 2025",
    overview: "A team project in NU Oasis that provides live menus and opening hours for Northeastern's three residential dining halls, together with meal voting and calorie tracking.",
    highlights: [
      "A scraper designed to work around Cloudflare's blocking retrieves daily menus and hours from DineOnCampus on scheduled serverless jobs.",
      "A Supabase PostgreSQL backend with row-level security; calorie tracking and meal voting require sign-in.",
      "Stale data is treated as a defect: menus older than 14 days are withheld, and every view shows the age of its data.",
    ],
    stack: "React, Vite, Tailwind CSS, Supabase, PostgreSQL",
    github: "https://github.com/Oasis-NEU/f25-group-7?files=1",
  },
];

const EXPERIENCE_RAW = [
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
    overview: "Incoming Software Engineering Co-op at Travelers. I will join the Hartford, Connecticut team remotely from January to May 2027.",
    points: [],
  },
  {
    role: "Software Engineer",
    group: "professional",
    org: "NU Hire",
    logo: nuhireLogo,
    mark: "NH",
    github: "https://github.com/Oasis-NEU/NUHire",
    start: "2026-09",
    end: null,
    context: "built for Khoury College of Computer Sciences",
    stack: "Next.js, Express, Socket.IO, MySQL, Keycloak, Docker, GitHub Actions, dbmate",
    period: "Sep 2026 — Present",
    location: "Boston, MA",
    overview: "Software engineer on a team of more than ten building NU Hire, a hiring simulation commissioned by Khoury College in which student teams screen resumes, evaluate recorded interviews and negotiate an offer while an advisor introduces complications in real time. I am responsible for the project's release reliability: continuous integration, database migrations, container builds and end-to-end quality assurance. The application was not handed off to the client.",
    points: [
      "Built a GitHub Actions gate of ten required checks, covering tests, the Docker build, migrations and a security audit, for every merge to main.",
      "Configured dbmate migrations to run and fail-stop before the API starts, and added a CI check for drift between the Prisma schema and the migrations.",
      "Made the Docker build portable across x86 and ARM.",
      "Conducted end-to-end QA of the classroom flow, logging more than 60 issues, including a critical defect that locked students out mid-session.",
      "Implemented resume text extraction, with a backfill for existing records, to support keyword-based applicant screening.",
    ],
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
    overview: "Data analyst on a five-person team engaged by the Boston Bruins through the DS 4535 professional practicum, modeling post-draft development pathways for the club's prospects. I lead requirements elicitation with the club's stakeholders and develop the modeling pipeline. The engagement is governed by a non-disclosure agreement.",
    points: [
      "Translate stakeholder questions into scoped objectives and a delivery plan across Agile sprints.",
      "Develop a reproducible Python pipeline using pandas and scikit-learn.",
      "Data, methods and findings remain confidential.",
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
    context: "Khoury College of Computer Sciences",
    stack: "Java, Gradle, JUnit, Mockito, Claude, GitHub Copilot",
    period: "May 2026 — Present",
    location: "Boston, MA",
    overview: "Teaching assistant for Program Design and Implementation II, Khoury College's course in object-oriented design, supporting students in writing Java that is correct, tested and well designed.",
    points: [
      "Have led more than 30 weekly debugging sessions on object-oriented programming, data structures and control flow.",
      "Guide students in unit testing with JUnit and Mockito through the Gradle wrapper, matching the grading environment.",
      "Taught more than 100 students debugging and prompt engineering with Claude and GitHub Copilot.",
      "Grade against detailed rubrics, with written feedback on SOLID principles, design and correctness.",
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
    overview: "Teaching assistant in Rutgers University's summer mathematics program for two consecutive summers, responsible for program logistics and student support.",
    points: [
      "Coordinated logistics for more than 100 program participants.",
      "Supported a program-wide 10% improvement in math scores over six to eight weeks.",
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
    context: "Northeastern University",
    stack: "Next.js, TypeScript, React, Puck, Prisma, PostgreSQL, Supabase, Tailwind CSS, shadcn/ui",
    period: "Jan 2026 — Present",
    location: "Boston, MA",
    overview: "Lead Software Engineer and the sole technical lead on Student Government's Digital Innovation team. I manage the development lifecycle for a team of more than five engineers and build the content management system behind the SGA website, which allows non-technical officers to publish without writing code.",
    points: [
      "Run ticketing, sprint planning and code review for the team.",
      "The system serves more than 5,000 students and has reduced publishing time by 10%.",
      "Drag-and-drop page building with React Puck, Supabase authentication and Vercel hosting.",
      "Version history, rollback, role-based access control and soft-delete archiving on Next.js and Prisma.",
      "Prisma-validated API endpoints that prevent malformed writes to PostgreSQL.",
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
    overview: "Lead Software Engineer for Rainfall Learning's real-time collaborative IDE, in which a tutor and a student edit the same file simultaneously without losing work. I led user-interface development on a team of more than fifteen engineers.",
    points: [
      "Integrated Yjs CRDT synchronization, which merges edits without locks and reconciles offline clients on reconnection, reducing the edit-conflict rate to 2%.",
      "Built the React and TypeScript interface layer, improving rendering performance by 20% during concurrent editing.",
      "Containerized the build pipelines with Docker and added automated testing with Vitest, reducing environment failures by 15%.",
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
    context: "Northeastern University",
    stack: "React, TypeScript, Node.js, Next.js",
    period: "Jan 2026 — Present",
    location: "Boston, MA",
    overview: "Project-series mentor at NU Oasis, guiding groups of five or more students through the development of their first full-stack web applications, from initial scope to a working product.",
    points: [
      "Help teams break features into tasks, resolve technical blockers and review pull requests.",
      "Teams build with React, TypeScript, Node.js and Next.js.",
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
    overview: "Quantitative analyst at Disrupt, Northeastern's FinTech initiative, translating research on statistical arbitrage, factor investing and market microstructure into trading signals and evaluating them through backtesting.",
    points: [
      "Built backtesting pipelines in Python with pandas and NumPy, evaluating signals across more than 10 million historical equity data points.",
      "Developed pairs-trading, mean-reversion and momentum strategies, deployed on $50,000 of simulated capital.",
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
    overview: "Peer programmer on the NU ACES leadership team, organizing community-building, civic-engagement and service programming for first-year and upper-class students.",
    points: [
      "Plan, develop and facilitate events for program participants.",
      "Shape social programming around the four pillars of service, civic learning, civic action and alliance building.",
      "Support incoming students as they begin weekly service with Boston community partners.",
    ],
  },
];

export const RESEARCH = [
  {
    title: "Multimodal Machine Learning for Parkinson's Detection",
    visual: "auroc",
    summary: "A multimodal machine-learning pipeline that combines voice, finger-tapping and gait recordings to detect Parkinson's disease.",
    role: "Undergraduate Researcher",
    group: "Intelligent Automation (IoT) Research Group, Northeastern University",
    advisor: "Prof. Sarita Singh",
    period: "July 2026 — Present",
    work: [
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
    venue: "Two posters submitted to ACM SIGCSE 2027",
    summary: "A study comparing four AI coding assistants with human programmers on generation, debugging and refactoring tasks in computer science education.",
    role: "Undergraduate Researcher",
    group: "Intelligent Automation (IoT) Research Group, Northeastern University",
    advisor: "Prof. Sarita Singh",
    period: "July — September 2026",
    work: [
      "Designed a differential human-baseline versus AI protocol benchmarking four coding assistants across four language paradigms on generation, debugging and refactoring.",
      "Framed the study with an integrated TPACK, SAMR, TAM and Bloom model.",
    ],
    stack: "Claude Code, GitHub Copilot, Cursor, ChatGPT, Python, Java, Prolog, TypeScript, LaTeX",
  },
  {
    title: "Fighting AI-Generated Phishing with AI-Generated Training: Adaptive, Role-Specific Simulation with Calibration Scoring",
    visual: "loop",
    venue: "Submitted to WiCyS 2027",
    summary: "A study of adaptive, AI-generated phishing training built on the PhishAware platform, which directs practice toward each learner's weaknesses and identifies learners who are confidently incorrect.",
    role: "Undergraduate Researcher",
    group: "Northeastern University",
    advisor: "Prof. Sarita Singh",
    period: "Fall 2026",
    work: [
      "Scenarios span six channels: email, SMS, voice, QR codes, social media and web pages.",
      "Deterministic application logic constrains every scenario to a fixed taxonomy of eight gradeable red-flag cues.",
      "Learners classify each message, identify the cues behind their decision and report their confidence, which feeds a calibration score.",
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
  certifications: "Bloomberg Market Concepts, Bloomberg Finance Fundamentals, Bloomberg Spreadsheet Analysis, AKUNA Options 101, CFI Financial Analysis and Modeling, AmplifyMe Finance Accelerator, Citi Markets Quantitative Analysis (MQA) Job Simulation (Forage), WSP Microsoft Excel",

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
