import { useState, useRef, useEffect } from "react";

// Knowledge base with detailed portfolio information
const KNOWLEDGE_BASE = [
  {
    id: "tech-stack",
    q: "What is your tech stack?",
    a: "Shlok builds production-grade systems with React, Next.js, Vite, and Tailwind, backed by robust TypeScript and JavaScript. He is fluent in Python and Node.js, with experience designing APIs using Express and Flask. On the data and ML side, he works with PyTorch, scikit-learn, and Jupyter to develop and evaluate models, and uses PostgreSQL and Supabase for reliable data storage. He ships with modern engineering practices using Git and Docker, and is comfortable moving between full-stack engineering, machine learning, and quantitative workflows.",
    extendedInfo: "Breaking down his stack: Frontend-wise, he excels in React ecosystem (React, Next.js) with Vite for fast builds, styled with Tailwind CSS and animated with GSAP. Backend development includes Node.js/Express and Python/Flask for building robust APIs. For ML work, he uses PyTorch for deep learning and scikit-learn for traditional ML. Database experience spans PostgreSQL and Supabase for both relational and real-time data. DevOps tools include Docker for containerization and Git for version control. He's constantly learning and adapting to new technologies.",
    keywords: ["tech stack", "technology stack", "technologies", "skills", "programming languages", "frontend", "backend", "react", "javascript", "typescript", "python", "frameworks", "what do you use", "your stack", "technical skills"],
    relatedTopics: ["projects", "experience"],
    followUps: ["What projects have you built?", "What's your strongest area?"],
  },
  {
    id: "availability",
    q: "Availability and location?",
    a: "Shlok is open to new opportunities and actively interviewing. He has experience collaborating effectively across time zones, thrives in async-first environments, and remains flexible in adapting to diverse team schedules and workflows.",
    extendedInfo: "Currently based in the Boston area while studying at Northeastern University. He's seeking full-time software engineering roles, particularly interested in positions involving full-stack development, ML/AI engineering, or quantitative development. Open to remote, hybrid, or on-site positions. He can start immediately or align with typical graduation timelines. Comfortable working across US time zones and has experience with global teams.",
    keywords: ["availability", "available", "when can you start", "when are you available", "your availability", "remote", "onsite", "hybrid", "interviewing", "boston area", "based in", "willing to relocate"],
    relatedTopics: ["contact", "experience"],
    followUps: ["How can I contact you?", "What roles are you seeking?"],
  },
  {
    id: "projects",
    q: "Top projects?",
    a: "Highlights: NU RATE-ON — real-time dining menus with Supabase/Postgres and React/Node; Rainfall Learning — an edtech platform with collaborative coding and modern React UI. Moreover, he is currently building ML/Quant related projects and once they are done; the portfolio will be updated.",
    extendedInfo: "NU RATE-ON shows his full-stack capabilities: real-time data sync with Supabase, complex state management, and responsive UI. Built for 1000+ daily users at Northeastern. Rainfall Learning demonstrates his edtech expertise with features like collaborative code editor, real-time collaboration, and modern authentication. The upcoming ML/Quant projects will showcase his data science and financial modeling skills. Each project emphasizes production-ready code, scalability, and user experience.",
    keywords: ["projects", "portfolio", "what have you built", "what did you build", "show me your work", "your projects", "rate-on", "rainfall", "nu rate", "examples of work"],
    relatedTopics: ["tech-stack", "experience"],
    followUps: ["What's your tech stack?", "Tell me about your experience"],
  },
  {
    id: "contact",
    q: "How to contact you?",
    a: "You can reach Shlok via the contact form, LinkedIn, or GitHub on this page. He responds quickly to recruiter outreach. Also, his student email: patel.s15@northeastern.edu",
    extendedInfo: "Best way to reach him: For job opportunities, use the contact form on this page or email patel.s15@northeastern.edu. He typically responds within 24 hours. Find him on LinkedIn for professional networking or GitHub to see his code. He's very responsive to recruiter messages and happy to schedule calls to discuss opportunities. Open to informational interviews and technical discussions.",
    keywords: ["contact", "email", "linkedin", "github", "get in touch", "reach out", "how to contact", "contact you", "contact him", "reach you", "reach him", "send message", "patel.s15"],
    relatedTopics: ["availability"],
    followUps: ["When are you available?", "What opportunities interest you?"],
  },
  {
    id: "experience",
    q: "Experience summary?",
    a: "Shlok is a software engineer with strong experience in TypeScript, Python, and modern JavaScript, building scalable, production-ready applications across the stack. He has delivered full-cycle projects involving API integrations, authentication, database design, and deployment, with an emphasis on performance, reliability, and clean system architecture. He has worked in fast-paced, startup-style teams, collaborating with 15+ contributors to ship real products. With interests in AI/ML, quantitative finance, and data-driven engineering, he brings a structured, analytical approach to problem-solving and focuses on writing maintainable code that scales beyond prototypes.",
    extendedInfo: "His experience spans multiple domains: Full-stack web development with modern frameworks, building real products used by thousands. Database architecture and optimization with both SQL and NoSQL. API design following REST principles. Real-time systems using WebSockets and Supabase. Authentication and security best practices. Team collaboration using Git, agile methodologies. He's particularly strong in taking projects from concept to deployment, handling both technical implementation and product thinking.",
    keywords: ["experience", "summary", "background", "career", "professional", "expertise", "years", "level", "qualifications", "credentials", "track record", "past work", "accomplishments", "achievements", "your experience", "his experience", "work history"],
    relatedTopics: ["tech-stack", "projects"],
    followUps: ["What projects have you built?", "What technologies do you use?"],
  },
  {
    id: "education",
    q: "Education background?",
    a: "Shlok is a student at Northeastern University, combining academic rigor with hands-on engineering experience. His education complements his practical work in software development and machine learning.",
    extendedInfo: "At Northeastern University, he's pursuing a degree focused on computer science and software engineering. The co-op program has given him real-world industry experience. His coursework covers algorithms, data structures, machine learning, databases, and software engineering principles. He balances academic learning with building production projects, giving him both theoretical knowledge and practical skills.",
    keywords: ["education", "school", "university", "northeastern", "degree", "study", "studying", "student", "academic", "college"],
    relatedTopics: ["experience"],
    followUps: ["What's your experience level?", "What projects have you built?"],
  },
];

const INITIAL_SUGGESTIONS = [
  "What is your tech stack?",
  "What projects have you built?",
  "How can I contact you?",
  "When are you available?",
];

// Advanced tokenization with n-grams for better matching
const tokenize = (text) => {
  const cleaned = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .trim();
  
  const words = cleaned.split(/\s+/).filter(Boolean);
  const tokens = new Set(words);
  
  // Add bigrams for better phrase matching
  for (let i = 0; i < words.length - 1; i++) {
    tokens.add(`${words[i]} ${words[i + 1]}`);
  }
  
  // Add trigrams for even better context
  for (let i = 0; i < words.length - 2; i++) {
    tokens.add(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }
  
  return Array.from(tokens);
};

// Semantic intent detection
const detectIntent = (message) => {
  const m = message.toLowerCase();
  const intents = {
    greeting: /^(hi|hello|hey|yo|sup|good morning|good evening|good afternoon)/,
    thanks: /(thank|thanks|thx|ty|appreciate)/,
    question: /(what|how|when|where|why|who|can you|tell me|explain)/,
    positive: /(cool|awesome|great|nice|amazing|love|good|excellent|impressive)/,
    comparison: /(compare|difference|versus|vs|better|best|prefer)/,
    detail: /(more|detail|elaborate|explain|deeper|specific|tell me more)/,
    negative: /^(no|nope|nah|not really|don't|dont|stop|enough)/,
    frustration: /(bruh|bro|wtf|dude|cmon|come on|stupid|dumb|confused|ugh)/,
    affirmative: /^(yes|yeah|yep|yup|sure|ok|okay|tell me)/,
    resume: /(resume|cv|curriculum vitae|download|pdf|document)/,
  };
  
  return Object.entries(intents)
    .filter(([_, regex]) => regex.test(m))
    .map(([intent]) => intent);
};

// Enhanced scoring with context awareness
const scoreMatch = (messageTokens, entry, conversationContext) => {
  const keywordSet = new Set(entry.keywords);
  let score = 0;
  
  // Keyword matching with weighted scoring
  messageTokens.forEach((token) => {
    if (keywordSet.has(token)) {
      // Longer phrases get much higher scores
      const wordCount = token.split(' ').length;
      score += wordCount * 5;
    }
  });
  
  // Boost score if this topic was recently discussed (but not too much)
  if (conversationContext.recentTopics.includes(entry.id)) {
    score += 2;
  }
  
  // Boost if this is a related topic to what was just discussed
  if (conversationContext.lastTopic && 
      entry.relatedTopics?.includes(conversationContext.lastTopic)) {
    score += 1;
  }
  
  return score;
};

// Detect if user wants more details about recent topic
const detectFollowUp = (message, lastTopic) => {
  const m = message.toLowerCase();
  const followUpPhrases = [
    'more', 'detail', 'elaborate', 'tell me more', 'continue',
    'go on', 'explain', 'what about', 'anything else', 'more info'
  ];
  
  return followUpPhrases.some(phrase => m.includes(phrase)) && lastTopic;
};

export const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I'm Shlok's portfolio assistant (still pretty basic — he's actively working on making me smarter!). I can help with questions about his projects, tech stack, experience, availability, and contact info. What would you like to know?"
    },
  ]);
  const [conversationContext, setConversationContext] = useState({
    lastTopic: null,
    recentTopics: [],
    askedTopics: new Set(),
    messageCount: 0,
  });
  const [suggestions, setSuggestions] = useState(INITIAL_SUGGESTIONS);
  const panelRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-assistant", onOpen);
    return () => window.removeEventListener("open-assistant", onOpen);
  }, []);

  const getSmallTalkResponse = (message, context) => {
    const m = message.toLowerCase();
    const intents = detectIntent(message);

    if (intents.includes('greeting')) {
      const responses = [
        "Hey there! Great to connect. I have deep knowledge of Shlok's work. What aspect interests you most?",
        "Hi! I'm here to provide detailed insights into Shlok's projects and expertise. Where should we start?",
        "Hello! Ready to dive into Shlok's portfolio. What would you like to explore first?",
      ];
      return responses[context.messageCount % responses.length];
    }
    
    if (intents.includes('resume')) {
      return "You can reach out to Shlok at patel.s15@northeastern.edu or through the contact form on this page to request his resume. He responds quickly to recruiter inquiries and will send it right over!";
    }
    
    if (intents.includes('frustration')) {
      const unaskedTopics = KNOWLEDGE_BASE.filter(e => !context.askedTopics.has(e.id));
      return `I hear your frustration! Let me help better. Want to explore something specific like ${unaskedTopics.slice(0, 2).map(t => t.id.replace('-', ' ')).join(' or ')}? Or ask me anything directly!`;
    }
    
    if (intents.includes('negative')) {
      const unaskedTopics = KNOWLEDGE_BASE.filter(e => !context.askedTopics.has(e.id));
      if (unaskedTopics.length > 0) {
        return `Got it! Let's explore something else. Interested in his ${unaskedTopics.slice(0, 3).map(t => t.id.replace('-', ' ')).join(', ')}?`;
      }
      return "No problem! What else would you like to know?";
    }
    
    if (intents.includes('thanks') && message.length > 2) {
      const remainingTopics = KNOWLEDGE_BASE.filter(
        entry => !context.askedTopics.has(entry.id)
      );
      if (remainingTopics.length > 0) {
        return `You're welcome! ${remainingTopics.length > 1 ? `Want to explore ${remainingTopics.slice(0, 2).map(t => t.id.replace('-', ' ')).join(' or ')}?` : 'Feel free to ask anything else!'}`;
      }
      return "Happy to help! Feel free to ask if you need clarification on anything.";
    }
    
    if (intents.includes('positive')) {
      const suggestions = context.lastTopic 
        ? KNOWLEDGE_BASE.find(e => e.id === context.lastTopic)?.followUps || []
        : ["What projects has he built?", "What's his tech stack?"];
      return `Glad you found that interesting! ${suggestions.length > 0 ? `Want to know: ${suggestions[0]}` : 'What else would you like to explore?'}`;
    }
    
    if (m.match(/^(how are you|how's it going|hows it going|how r u)/)) {
      return "I'm functioning perfectly! More importantly, let me help you learn about Shlok's impressive work. Any particular area you're curious about?";
    }
    
    return null;
  };

  const answerQuestion = (message) => {
    const smallTalk = getSmallTalkResponse(message, conversationContext);
    if (smallTalk) return { answer: smallTalk, matchedTopic: null, confidence: 'high' };

    const intents = detectIntent(message);
    const m = message.toLowerCase();

    // Direct topic detection - highest priority
    const directTopicMap = {
      'experience': ['your experience', 'his experience', 'work history', 'background', 'experience summary', 'tell me about experience', 'what is experience'],
      'tech-stack': ['tech stack', 'technology stack', 'what technologies', 'programming languages', 'what skills', 'technical skills'],
      'projects': ['your projects', 'his projects', 'what have you built', 'what did you build', 'show me projects', 'portfolio projects'],
      'contact': ['how to contact', 'contact you', 'contact him', 'reach out', 'get in touch', 'your email', 'his email'],
      'availability': ['your availability', 'his availability', 'when available', 'when can you start', 'where are you located', 'where is he located'],
      'education': ['education', 'university', 'northeastern', 'school', 'degree', 'studying'],
    };

    // Only match if it looks like a question about portfolio
    const portfolioIndicators = ['what', 'where', 'when', 'how', 'tell', 'show', 'your', 'his', 'you', 'he', 'shlok'];
    const hasPortfolioContext = portfolioIndicators.some(indicator => m.includes(indicator));

    if (hasPortfolioContext) {
      for (const [topicId, phrases] of Object.entries(directTopicMap)) {
        if (phrases.some(phrase => m.includes(phrase))) {
          const entry = KNOWLEDGE_BASE.find(e => e.id === topicId);
          if (entry) {
            return { answer: entry.a, matchedTopic: entry.id, confidence: 'high' };
          }
        }
      }
    }

    // Check for affirmative follow-up to last topic
    if (intents.includes('affirmative') && conversationContext.lastTopic) {
      const lastEntry = KNOWLEDGE_BASE.find(e => e.id === conversationContext.lastTopic);
      if (lastEntry?.extendedInfo) {
        return { answer: lastEntry.extendedInfo, matchedTopic: lastEntry.id, confidence: 'high' };
      }
    }

    // Check for follow-up request
    if (detectFollowUp(message, conversationContext.lastTopic)) {
      const lastEntry = KNOWLEDGE_BASE.find(e => e.id === conversationContext.lastTopic);
      if (lastEntry?.extendedInfo) {
        return { answer: lastEntry.extendedInfo, matchedTopic: lastEntry.id, confidence: 'high' };
      }
    }

    const tokens = tokenize(message);
    
    // Score all entries
    const scored = KNOWLEDGE_BASE.map((entry) => ({
      entry,
      score: scoreMatch(tokens, entry, conversationContext),
    })).sort((a, b) => b.score - a.score);

    const best = scored[0];
    
    // Multi-topic detection - if multiple topics score high
    const multipleMatches = scored.filter(s => s.score > 5 && s.score >= best.score * 0.7);
    
    if (multipleMatches.length > 1 && intents.includes('comparison')) {
      const combined = multipleMatches.map(m => 
        `**${m.entry.id.replace('-', ' ').toUpperCase()}**: ${m.entry.a}`
      ).join('\n\n');
      return { 
        answer: `I'll cover both areas:\n\n${combined}`, 
        matchedTopic: multipleMatches[0].entry.id,
        confidence: 'high' 
      };
    }
    
    // High confidence match - require strong score
    if (best.score > 8) {
      return { 
        answer: best.entry.a, 
        matchedTopic: best.entry.id, 
        confidence: 'high' 
      };
    }
    
    // Medium confidence - provide answer with caveat
    if (best.score > 4) {
      return { 
        answer: `${best.entry.a}\n\nWant more specifics on this topic?`, 
        matchedTopic: best.entry.id, 
        confidence: 'medium' 
      };
    }
    
    // Low confidence - offer help
    const unaskedTopics = KNOWLEDGE_BASE.filter(e => !conversationContext.askedTopics.has(e.id));
    const topicList = unaskedTopics.slice(0, 3).map(t => t.id.replace('-', ' ')).join(', ');
    
    return { 
      answer: `Sorry, I don't have much data on that! I'm pretty basic right now and only focused on Shlok's portfolio — specifically: ${topicList}. What would you like to know about his work?`, 
      matchedTopic: null, 
      confidence: 'low' 
    };
  };

  const handleSend = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    
    const { answer, matchedTopic, confidence } = answerQuestion(trimmed);
    
    // Update conversation context
    setConversationContext(prev => {
      const newContext = {
        messageCount: prev.messageCount + 1,
        lastTopic: matchedTopic || prev.lastTopic,
        recentTopics: matchedTopic 
          ? [matchedTopic, ...prev.recentTopics.slice(0, 2)]
          : prev.recentTopics,
        askedTopics: matchedTopic 
          ? new Set([...prev.askedTopics, matchedTopic])
          : prev.askedTopics,
      };
      return newContext;
    });
    
    // Update suggestions based on context
    if (matchedTopic) {
      const entry = KNOWLEDGE_BASE.find(e => e.id === matchedTopic);
      if (entry?.followUps) {
        setSuggestions(entry.followUps);
      }
    } else {
      // Suggest unexplored topics
      const unasked = KNOWLEDGE_BASE
        .filter(e => !conversationContext.askedTopics.has(e.id))
        .slice(0, 4)
        .map(e => e.q);
      if (unasked.length > 0) setSuggestions(unasked);
    }
    
    // Simulate typing delay based on response length
    const delay = Math.min(800, answer.length * 3);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: answer }]);
    }, delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
    setInput("");
  };

  return (
    <div id="assistant" className="fixed bottom-6 right-6 z-40">
      {open && (
        <div
          ref={panelRef}
          className="mt-3 w-[320px] sm:w-90 rounded-2xl border border-white/20 bg-neutral-900/80 backdrop-blur-xl shadow-2xl text-white"
        >
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Portfolio Assistant</p>
              <p className="text-xs text-neutral-300">
                {conversationContext.messageCount > 3 
                  ? `${conversationContext.askedTopics.size} topics explored` 
                  : "Context-aware & intelligent"}
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="text-neutral-300 hover:text-white text-lg cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="px-4 py-3 space-y-2">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s, idx) => (
                <button
                  key={`${s}-${idx}`}
                  onClick={() => handleSend(s)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/20 hover:bg-white/15 transition"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="h-52 overflow-y-auto space-y-2 pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`text-sm leading-snug ${
                    m.from === "bot"
                      ? "bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-neutral-100"
                      : "text-right px-1 text-blue-200"
                  }`}
                >
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about Shlok's work..."
                className="flex-1 rounded-xl bg-white/5 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
