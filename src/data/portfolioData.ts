export interface Project {
  id: string;
  title: string;
  tag: string;
  category: string;
  description: string;
  longDescription: string;
  stack: string[];
  features: string[];
  metrics?: string;
  links: {
    live?: string;
    github?: string;
    article?: string;
  };
  featured?: boolean;
  hologramType: 'retainiq' | 'f1' | 'research' | 'motion' | 'audio' | 'scanner' | 'generic';
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  technologies: string[];
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  icon: string;
  description: string;
  featured?: boolean;
  link?: string;
}

export interface SkillCategory {
  name: string;
  iconName: string;
  skills: { name: string; level: number; featured?: boolean }[];
}

export interface FreelanceService {
  title: string;
  iconName: string;
  tags: string[];
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Samyak Jain",
    title: "Software Engineer",
    company: "UBS",
    education: "PGDM Finance @ XLRI Jamshedpur | B.Tech CSE @ Shiv Nadar University",
    location: "Pune, India",
    tagline: "Building cloud-native systems by day. Shipping AI products at night.",
    shortBio: "I'm a Software Engineer at UBS Pune building cloud-native data architecture and post-trade systems on Azure — while simultaneously pursuing a PGDM in Finance from XLRI Jamshedpur. Outside work, I'm deep in the AI builder ecosystem: automating workflows with n8n, prototyping with LangChain, and shipping products fast with AI IDEs.",
    email: "sj.samyakj@gmail.com",
    socials: {
      github: "https://github.com/SamyakJ05",
      linkedin: "https://www.linkedin.com/in/samyakj05/",
      twitter: "https://x.com/_samyakk",
      instagram: "https://www.instagram.com/samyak.space",
      blog: "https://blog.samyak.space",
      portfolio: "https://samyak.space",
      sponsor: "https://github.com/sponsors/SamyakJ05",
      awsArticle: "https://builder.aws.com/content/3CV2aFroWhni2e6MGlj8kLSDbCY/aideas-finalist-retainiq",
      retainiq: "https://retainiq.cloud/",
    },
    metrics: [
      { label: "Amazon AIdeaS 2026", value: "Global Winner", detail: "Innovation Category" },
      { label: "Azure Infrastructure", value: "100+ Resources", detail: "Automated via Terraform" },
      { label: "Environment Setup", value: "80% Faster", detail: "IaC Automation" },
      { label: "Production Web Apps", value: "7+ Shipped", detail: "End-to-end full-stack" },
    ]
  },

  skills: [
    {
      name: "Cloud & Infrastructure",
      iconName: "Cloud",
      skills: [
        { name: "Azure", level: 95, featured: true },
        { name: "Terraform", level: 90, featured: true },
        { name: "Docker", level: 90, featured: true },
        { name: "Kubernetes", level: 85, featured: true },
        { name: "AWS", level: 85, featured: true },
        { name: "GitLab CI/CD", level: 90 },
      ]
    },
    {
      name: "AI & Automation",
      iconName: "Cpu",
      skills: [
        { name: "LangChain", level: 92, featured: true },
        { name: "Azure OpenAI", level: 95, featured: true },
        { name: "Amazon Bedrock", level: 90, featured: true },
        { name: "n8n", level: 95, featured: true },
        { name: "RAG Systems", level: 92, featured: true },
        { name: "LLM Agents", level: 90 },
      ]
    },
    {
      name: "Backend & Systems",
      iconName: "Server",
      skills: [
        { name: "Java", level: 95, featured: true },
        { name: "Kotlin", level: 90, featured: true },
        { name: "Spring Boot", level: 95, featured: true },
        { name: "Python", level: 92, featured: true },
        { name: "Kafka", level: 88, featured: true },
        { name: "Microservices", level: 92 },
      ]
    },
    {
      name: "Data & Databases",
      iconName: "Database",
      skills: [
        { name: "Databricks", level: 88, featured: true },
        { name: "MongoDB", level: 90 },
        { name: "PostgreSQL", level: 90, featured: true },
        { name: "ADLS Gen2", level: 90 },
        { name: "DynamoDB", level: 85 },
      ]
    },
    {
      name: "Frontend & Web3D",
      iconName: "Layout",
      skills: [
        { name: "React.js", level: 92, featured: true },
        { name: "Next.js", level: 90, featured: true },
        { name: "TypeScript", level: 92, featured: true },
        { name: "Three.js / WebGL", level: 85, featured: true },
        { name: "Tailwind CSS", level: 95 },
      ]
    },
    {
      name: "Dev Tools & Observability",
      iconName: "Terminal",
      skills: [
        { name: "Splunk", level: 88 },
        { name: "Cursor & Windsurf", level: 95 },
        { name: "Claude Code", level: 95 },
        { name: "BigPanda", level: 85 },
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "retainiq",
      title: "RetainIQ",
      tag: "AI-POWERED CLOUD PRODUCT",
      category: "Artificial Intelligence",
      description: "An AI knowledge-risk platform scoring dangerous concentrations of critical institutional know-how and generating proactive interventions. Won Amazon AIdeaS 2026 Innovation Category.",
      longDescription: "RetainIQ analyzes corporate knowledge distribution, identifying critical single-point-of-failure human silos. Using Amazon Bedrock generative models alongside AWS serverless architecture (Lambda, DynamoDB), it creates actionable succession strategies, structured documentation plans, and mitigation workflows.",
      stack: ["Amazon Bedrock", "AWS Lambda", "DynamoDB", "React", "TypeScript", "Tailwind CSS"],
      features: [
        "Knowledge-risk vulnerability scoring algorithm",
        "Autonomous AI interview and knowledge extraction agent",
        "AWS Builder Center featured architecture",
        "Zero-cold-start serverless design"
      ],
      metrics: "Global Winner · Amazon AIdeaS 2026",
      links: {
        live: "https://retainiq.cloud/",
        article: "https://builder.aws.com/content/3CV2aFroWhni2e6MGlj8kLSDbCY/aideas-finalist-retainiq",
      },
      featured: true,
      hologramType: "retainiq",
    },
    {
      id: "apex-atlas",
      title: "Apex Atlas",
      tag: "FORMULA 1 · DATA VISUALIZATION",
      category: "Web & Telemetry",
      description: "Formula 1 intelligence platform with GPS-accurate circuit telemetry for all 23 Grand Prix venues, live command hub, and tire degradation pit-strategy studio.",
      longDescription: "Apex Atlas transforms dense FIA timing data and GPS coordinates into an intuitive real-time tactical dashboard. Engineers and fans can simulate tire degradation curves, analyze undercut/overcut deltas, and review lap telemetry across all active Grand Prix circuits.",
      stack: ["Next.js 16", "React 19", "TypeScript", "Canvas WebGL", "Tailwind CSS"],
      features: [
        "GPS-accurate track vector reconstruction for 23 circuits",
        "Real-time pit strategy delta calculator",
        "Sector telemetry comparison engine",
        "Optimized 60FPS canvas renderer"
      ],
      links: {
        live: "https://apexatlas.online",
        github: "https://github.com/SamyakJ05/F1",
      },
      featured: true,
      hologramType: "f1",
    },
    {
      id: "proofboard",
      title: "ProofBoard",
      tag: "RESEARCH · FULL-STACK SAAS",
      category: "Full-Stack SaaS",
      description: "Evidence-first research workspace where sources, claims, and confidence stay visible and verifiable. Private per-user boards backed by Neon Postgres.",
      longDescription: "Designed to tackle information fragmentation in academic and technical analysis. ProofBoard enforces citation linking, claim verification trails, and visual argument hierarchies. Uses Neon serverless Postgres with Cloudflare edge caching for instant access.",
      stack: ["Next.js 16", "TypeScript", "Neon Postgres", "Cloudflare", "Tailwind CSS"],
      features: [
        "Claim-to-source verifiable linking matrix",
        "Encrypted multi-tenant workspace architecture",
        "High-density collaborative research cards",
        "Sub-100ms global query latency"
      ],
      links: {
        live: "https://proofboard.samyak.space",
        github: "https://github.com/SamyakJ05/ProofBoard",
      },
      featured: true,
      hologramType: "research",
    },
    {
      id: "kineticflow",
      title: "KineticFlow",
      tag: "AI AGENTS · WEBMCP",
      category: "Creative Tools & AI",
      description: "Browser-native vector motion studio where a human designer and an autonomous AI agent collaborate on a shared canvas via WebMCP with instant exports.",
      longDescription: "KineticFlow bridges agentic AI with interactive motion design. By exposing structured canvas state via WebMCP tools, agents can manipulate bezier curves, physics timings, and spatial transitions while the human designer oversees every adjustment in real-time.",
      stack: ["WebMCP", "TypeScript", "HTML5 Canvas", "Tailwind CSS", "Lottie"],
      features: [
        "Bidirectional human-AI canvas synchronization",
        "Full undo/redo history tree with branching",
        "Direct export to CSS keyframes, SVG paths, and Lottie JSON",
        "Zero-latency canvas engine"
      ],
      links: {
        live: "https://kinetic-flow.netlify.app",
        github: "https://github.com/SamyakJ05/KineticFlow",
      },
      featured: true,
      hologramType: "motion",
    },
    {
      id: "soul-train",
      title: "Soul Train",
      tag: "SPOTIFY · MOOD ANALYSIS",
      category: "Music & AI",
      description: "Mood-driven Spotify playlist generator analyzing listening library audio features, calculating mood valence, and syncing directly back to Spotify.",
      longDescription: "Harnesses Spotify Web API audio analysis (acousticness, danceability, energy, valence) to segment personal libraries into hyper-curated acoustic journeys. Offers visual playback statistics and one-click cloud playlist creation.",
      stack: ["Python", "Flask", "Spotify API", "PostgreSQL", "JavaScript"],
      features: [
        "Multidimensional acoustic valence clustering",
        "Interactive audio feature preview sliders",
        "Instant OAuth2 Spotify library synchronization",
        "Listening history trend reporting"
      ],
      links: {
        live: "https://soul-train-rqyr.onrender.com",
        github: "https://github.com/SamyakJ05/Soul-Train",
      },
      hologramType: "audio",
    },
    {
      id: "signalscan",
      title: "SignalScan",
      tag: "CRAWLER · SEO INTELLIGENCE",
      category: "Dev Tools",
      description: "Self-hosted SEO and technical audit crawler using Playwright to score Core Web Vitals, AI-crawler readiness, and structured data into evidence plans.",
      longDescription: "Headless crawler engine tailored for modern Single Page Applications and AI-search engine readiness. Evaluates robots.txt, schema markup, semantic HTML, and Core Web Vitals, synthesizing prioritized remediation reports.",
      stack: ["Python", "FastAPI", "Playwright", "React", "Tailwind CSS"],
      features: [
        "Headless browser evaluation of dynamic JS hydration",
        "AI Crawler & LLM-readiness score matrix",
        "Deep JSON-LD / Microdata validation",
        "Actionable PDF and Markdown audit exports"
      ],
      links: {
        github: "https://github.com/SamyakJ05/SEO-Optimisation",
      },
      hologramType: "scanner",
    },
    {
      id: "email-verifier",
      title: "Email Verifier Engine",
      tag: "PYTHON · OUTREACH TOOLING",
      category: "Backend & Systems",
      description: "Local SMTP-based email list verification engine checking syntax, MX records, disposable emails, and live handshake protocols without external third-party API costs.",
      longDescription: "Engineered to eliminate high monthly API fees for marketing and sales pipelines. Performs concurrent MX lookups, catch-all domain detection, and polite SMTP handshake simulation with SQLite caching.",
      stack: ["Python", "SMTP", "DNS Resolver", "SQLite", "Asyncio"],
      features: [
        "Concurrent asynchronous SMTP handshakes",
        "Catch-all and disposable domain detection",
        "Zero dependency on paid third-party APIs",
        "Local SQLite cache for fast lookups"
      ],
      links: {
        github: "https://github.com/SamyakJ05/Email-Verifier",
      },
      hologramType: "generic",
    },
    {
      id: "intellifunnel-labs",
      title: "IntelliFunnel Labs",
      tag: "FULL-STACK · 7 PRODUCTION SITES",
      category: "Full-Stack Architecture",
      description: "Independently designed, architected, and shipped 7 commercial production websites end-to-end, from DNS and microservices to modern frontend interfaces.",
      longDescription: "A portfolio of 7 live web applications including intellifunnel.io, intellifunnellabs.com, reboundq.com, reachgrid-networks.com, summitvertex.com, piccolomind.com, and techshorts.io.",
      stack: ["React", "Next.js", "Node.js", "Docker", "AWS", "Tailwind CSS"],
      features: [
        "7 live production deployments with high uptime",
        "Full CI/CD pipeline automation",
        "Custom design systems and landing pages",
        "Modern SEO and performance optimization"
      ],
      links: {
        live: "https://intellifunnel.io",
      },
      hologramType: "generic",
    },
  ] as Project[],

  experience: [
    {
      company: "UBS",
      role: "Software Engineer",
      period: "Aug 2024 – Present",
      location: "Pune, India",
      summary: "Building enterprise cloud-native data mesh architecture on Azure for post-trade financial systems.",
      bullets: [
        "Building a cloud-native data mesh architecture on Azure; developing Java and Kotlin/Spring Boot microservices for scalable data and report generation for post-trade banking activities.",
        "Automated deployments with GitLab CI/CD pipelines, reducing manual deployment cycles by 50%.",
        "Developed Terraform and Ansible templates to provision 100+ Azure cloud resources, reducing environment setup time by 80%.",
        "Implemented IAM-based zero-trust authentication per banking security standards; enhanced reliability with Splunk and BigPanda telemetry.",
        "Building internal productivity tools using spec-driven AI development, boosting engineering velocity by 50%+."
      ],
      technologies: ["Java", "Kotlin", "Spring Boot", "Azure", "Terraform", "GitLab CI/CD", "Kafka", "Splunk"]
    },
    {
      company: "UBS",
      role: "Software Engineer Intern",
      period: "Jan 2024 – Aug 2024",
      location: "Pune, India",
      summary: "Architected GenAI document retrieval microservices and cloud storage optimization.",
      bullets: [
        "Built microservices integrated with Azure OpenAI, Azure Search, and Databricks for intelligent financial document retrieval and summarization.",
        "Optimized data storage architectures via ADLS Gen2, achieving a 50% reduction in long-term cloud storage costs.",
        "Prototyped AI-powered data access solutions serving as the foundation for the enterprise cloud AI and data mesh strategy."
      ],
      technologies: ["Azure OpenAI", "Databricks", "ADLS Gen2", "Python", "Java", "Azure Search"]
    },
    {
      company: "Ford Pro",
      role: "Software Engineer Intern",
      period: "Jun 2023 – Dec 2023",
      location: "Bengaluru, India",
      summary: "Leveraged Large Language Models to automate developer support and bug triage workflows.",
      bullets: [
        "Engineered LLM-powered internal tools to streamline bug resolution workflows across distributed engineering teams.",
        "Automated bug classification and reporting pipelines; trained and deployed conversational chatbots for internal application support."
      ],
      technologies: ["Python", "LLMs", "NLP", "FastAPI", "Docker"]
    },
    {
      company: "ICAR – NIAP",
      role: "ML & Android Intern",
      period: "Jun 2022 – Aug 2022",
      location: "Delhi, India",
      summary: "Computer vision research model for crop disease detection resulting in an Elsevier journal publication.",
      bullets: [
        "Trained a deep learning computer vision model using Keras and TensorFlow to accurately detect wheat plant diseases.",
        "Engineered an offline-capable Android application integrating the ML model for on-field agricultural diagnostics.",
        "Co-authored research paper published in Procedia Computer Science (Elsevier 2024)."
      ],
      technologies: ["TensorFlow", "Keras", "Android", "Java", "Computer Vision"]
    }
  ] as ExperienceItem[],

  education: [
    {
      institution: "XLRI Jamshedpur",
      degree: "PGDM - Finance (XOL Online Program)",
      period: "2025 – 2027",
      focus: "Corporate Finance, Quantitative Modeling & Capital Markets",
      badge: "In Progress"
    },
    {
      institution: "Shiv Nadar University",
      degree: "B.Tech - Computer Science & Engineering",
      period: "2020 – 2024",
      focus: "Distributed Systems, Machine Learning & Algorithms",
      badge: "Completed"
    }
  ],

  awards: [
    {
      id: "amazon-aideas",
      title: "Amazon AIdeaS 2026 - Innovation Winner",
      issuer: "Amazon Web Services (AWS)",
      icon: "Trophy",
      description: "Won the Innovation Category at Amazon's global AI competition with RetainIQ — an AI-powered knowledge-risk cloud platform. Published technical architecture on AWS Builder Center.",
      featured: true,
      link: "https://builder.aws.com/content/3CV2aFroWhni2e6MGlj8kLSDbCY/aideas-finalist-retainiq"
    },
    {
      id: "elsevier-research",
      title: "Published Research Paper",
      issuer: "Procedia Computer Science, Elsevier 2024",
      icon: "FileText",
      description: "Co-authored 'EfficientNet architecture and attention mechanism-based wheat disease identification model', validating attention mechanisms for edge vision.",
      featured: true
    },
    {
      id: "foss-hack",
      title: "FOSS HACK 2020 Prize Winner",
      issuer: "FOSS United Foundation",
      icon: "Terminal",
      description: "Won national open-source hackathon for building high-impact community tools.",
      featured: false
    },
    {
      id: "ubs-gold",
      title: "Gold Certified Engineer",
      issuer: "UBS",
      icon: "Award",
      description: "Highest internal technical certification awarded for engineering excellence, system reliability, and software architecture mastery.",
      featured: true
    },
    {
      id: "ubs-differentiator",
      title: "Differentiator Award",
      issuer: "UBS",
      icon: "Sparkles",
      description: "Recognized for outstanding contributions and exceptional impact on post-trade platform deliverables.",
      featured: false
    },
    {
      id: "ubs-hackathon",
      title: "Solution Design & Coding Labs Winner",
      issuer: "UBS Internal Hackathons",
      icon: "Code",
      description: "First place in both Cloud Native Solutions and Generative AI enterprise tracks.",
      featured: false
    }
  ] as AwardItem[],

  freelanceServices: [
    {
      title: "AI-Powered Products",
      iconName: "BrainCircuit",
      tags: ["LLM Pipelines", "RAG", "Autonomous Agents"],
      description: "End-to-end AI product development using LangChain, Azure OpenAI, and Amazon Bedrock — taking you from prompt architecture to robust production deployment."
    },
    {
      title: "Cloud Architecture & IaC",
      iconName: "CloudLightning",
      tags: ["Azure", "Terraform", "Kubernetes"],
      description: "Resilient cloud-native systems with microservices, event streaming, automated infrastructure-as-code, and zero-downtime deployment pipelines."
    },
    {
      title: "Backend & Event Streaming",
      iconName: "ServerCog",
      tags: ["Java / Spring Boot", "Kafka", "PostgreSQL"],
      description: "Ultra-fast, fault-tolerant transactional APIs and event-driven architectures designed to scale effortlessly under banking-grade workloads."
    },
    {
      title: "Workflow Automation",
      iconName: "Workflow",
      tags: ["n8n", "Webhooks", "Custom Integrations"],
      description: "Eliminate hundreds of hours of manual operations by connecting your databases, SaaS tools, and AI agents with resilient, self-healing automations."
    },
    {
      title: "Technical Writing & Architecture Docs",
      iconName: "BookOpenCheck",
      tags: ["System RFCs", "AWS Builder Center", "Dev Docs"],
      description: "Turn intricate distributed architectures into clear, compelling engineering documentation, investor whitepapers, and developer guides."
    },
    {
      title: "Full-Stack Development",
      iconName: "CodeXml",
      tags: ["Next.js", "React 19", "TypeScript", "Tailwind"],
      description: "High-performance web apps built with modern typography, interactive 3D WebGL visuals, and lightning-fast edge delivery."
    }
  ] as FreelanceService[],

  terminalCommands: {
    help: "Available commands: bio, skills, projects, awards, experience, hire, contact, matrix, clear",
    bio: "Samyak Jain — Software Engineer @ UBS Pune. Building cloud-native data architecture & AI tools. PGDM Finance @ XLRI Jamshedpur.",
    contact: "Email: sj.samyakj@gmail.com | LinkedIn: https://www.linkedin.com/in/samyakj05/ | X: @_samyakk | GitHub: @SamyakJ05",
    hire: "Open for select freelance projects in AI Systems, Cloud Architecture, and Full-Stack Engineering. Email: sj.samyakj@gmail.com",
    awards: "1. Amazon AIdeaS 2026 Innovation Winner\n2. Published Research (Elsevier 2024)\n3. UBS Gold Certified Engineer\n4. FOSS HACK 2020 Winner",
  }
};
