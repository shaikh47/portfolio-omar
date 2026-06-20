import type { ResumeData } from "../types";

export const resumeData: ResumeData = {
  name: "Syed MD Omar Shaikh",
  title: "Senior Software Engineer",
  location: "Dhaka, Bangladesh",
  email: "syed-15-8699@diu.edu.bd",
  github: "shaikh47",
  linkedin: "shaikh47",
  phone: "+880 1923090558",
  tagline:
    "Building production-grade full-stack applications with a focus on scalable architectures, intuitive user experiences, and modern cloud-native solutions.",
  summary:
    "Senior Software Engineer with 5+ years of experience delivering complex, high-impact products across healthcare, fintech, AI and blockchain domains. I specialize in React-based frontends, distributed systems, and developer tooling — with a track record of leading end-to-end feature delivery, mentoring engineers, and driving CI/CD maturity. CGPA 3.99/4.0, competitive robotics champion, and lifelong builder.",

  experience: [
    {
      company: "Cefalo Bangladesh Limited",
      role: "Senior Software Engineer",
      duration: "Aug 2025 – Present",
      location: "Dhaka, Bangladesh",
      current: true,
      bullets: [
        "Owning end-to-end design and delivery of an Applicant Tracking System (ATS) module, including candidate workflows and third-party integrations.",
        "Implemented HackerRank integration for automated coding assessments — designed the bulk-invite flow and shipped core integration work.",
        "Conducting R&D to select a reliable job-queue solution (RabbitMQ vs BullMQ vs Kafka) for large-scale background-processing workloads; benchmarking throughput, reliability, and operational complexity.",
        "Mentoring peers through code reviews; driving CI/CD improvements and automated test coverage to reduce release cycle time.",
      ],
    },
    {
      company: "BJIT Limited",
      role: "Senior Software Engineer",
      duration: "Jul 2023 – May 2024",
      location: "Dhaka, Bangladesh",
      bullets: [
        "Led frontend development for an AI-powered Interview Training Platform integrating 3D avatars, real-time emotion analysis, and gaze detection.",
        "Built interactive UI using React.js, Zustand, Three.js, Chart.js, and Tailwind CSS; created and animated a realistic 3D avatar with React Three Fiber.",
        "Integrated AI services to generate interview questions from user SOPs and analyze emotions from recorded videos.",
        "Delivered the production frontend of a Blockchain-based Mental Health Aid Platform; implemented SBT (Soulbound Token) features on the Express backend.",
      ],
    },
    {
      company: "BJIT Limited",
      role: "Software Engineer",
      duration: "May 2021 – Jul 2023",
      location: "Dhaka, Bangladesh",
      bullets: [
        "Built a Blockchain-based NFT marketplace for manga artwork — developed core frontend and integrated smart contracts for NFT minting and transactions.",
        "Engineered a Blockchain Explorer and Visualizer supporting multiple networks, displaying blocks, transactions, accounts, and event logs.",
        "Contributed to a multi-cryptocurrency browser-extension wallet for managing Ethereum-based tokens.",
        "Worked on a Metaverse 3D asset marketplace with image recognition to prevent duplicate asset uploads.",
        "Assisted in building blockchain middleware using web3j and collaborated on smart contract and SDK development.",
      ],
    },
  ],

  skills: [
    {
      label: "Frontend",
      skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
        "React Three Fiber",
        "Zustand",
        "Chart.js",
      ],
    },
    {
      label: "Backend",
      skills: ["Node.js", "Express.js", "Java Spring Boot", "Python"],
    },
    {
      label: "Blockchain",
      skills: [
        "Ethereum",
        "Smart Contracts",
        "Web3.js",
        "web3j",
        "NFT / SBT",
        "Solidity",
      ],
    },
    {
      label: "Database",
      skills: ["MySQL", "MongoDB", "Firebase"],
    },
    {
      label: "Tools & Infra",
      skills: ["Git", "CI/CD", "RabbitMQ", "BullMQ", "Kafka", "Android SDK"],
    },
    {
      label: "Languages",
      skills: ["JavaScript", "TypeScript", "Java", "Python", "C"],
    },
  ],

  projects: [
    {
      name: "Maze Solver — Pathfinding Visualizer",
      description:
        "An interactive 2D pathfinding visualizer that calculates and animates the shortest path through a maze in real time.",
      tech: ["ReactJS", "HTML", "CSS"],
      highlights: [
        "Implemented Dijkstra's and DFS algorithms with step-by-step animation",
        "Visualizes exploration frontier and final optimal path on a live grid",
      ],
      github: "https://github.com/shaikh47",
    },
    {
      name: "IoT Healthcare Robot",
      description:
        "Autonomous delivery robot with a robotic arm that mimics user hand gestures, fully controllable via an IoT web interface.",
      tech: ["C", "Arduino", "JavaScript", "Python", "Firebase", "HTML", "CSS"],
      highlights: [
        "Implemented PID control and Left-Hand Maze Solving algorithm for autonomous navigation",
        "Real-time gesture mirroring via IoT dashboard; hardware-software co-design",
      ],
      github: "https://github.com/shaikh47",
    },
    {
      name: "Environment Monitoring & Sound Pollution Prevention System",
      description:
        "IoT system that monitors environmental parameters and actively prevents sound pollution using sound-based traffic signal control.",
      tech: ["C", "Arduino", "JavaScript", "Firebase", "HTML", "CSS"],
      highlights: [
        "Sound-based traffic signal and horn-prevention feature",
        "Live environmental dashboard via Firebase real-time database",
      ],
      github: "https://github.com/shaikh47",
    },
  ],

  education: [
    {
      institution: "Daffodil International University",
      degree: "B.Sc. in Computer Science and Engineering",
      duration: "Jan 2017 – Mar 2021",
      location: "Dhaka, Bangladesh",
      gpa: "3.99 / 4.0",
      highlights: [
        "University Merit Scholarship — every term of undergraduate studies",
        "Thesis: Autonomous Healthcare Robot for Assisting Patients of Contagious Disease",
        "Research focus: Robotics, Embedded Systems, Internet of Things",
      ],
    },
    {
      institution: "BAF Shaheen College",
      degree: "Higher Secondary Certificate (HSC)",
      duration: "2016",
      location: "Dhaka, Bangladesh",
      gpa: "4.83 / 5.0",
    },
    {
      institution: "Banophool Adibashi Greenheart College",
      degree: "Secondary School Certificate (SSC)",
      duration: "2014",
      location: "Dhaka, Bangladesh",
      gpa: "5.0 / 5.0",
    },
  ],

  awards: [
    {
      date: "Jan 2020",
      place: "Scholarship Participant",
      event: "JENESYS 2019, SAARC 2nd Batch",
      venue: "Tokyo, Japan",
    },
    {
      date: "Jan 2019",
      place: "1st Place",
      event: "Soccer Bot — BUET Robo Carnival",
      venue: "BUET, Bangladesh",
    },
    {
      date: "Jul 2019",
      place: "2nd Place",
      event: "Robo Race — Mecceleration, IUT",
      venue: "IUT, Bangladesh",
    },
    {
      date: "Nov 2018",
      place: "1st Place",
      event: "Soccer Bot — IEEE Day, East West University",
      venue: "EWU, Bangladesh",
    },
    {
      date: "Oct 2018",
      place: "1st Place",
      event: "Soccer Bot — Mecceleration 18, IUT",
      venue: "IUT, Bangladesh",
    },
    {
      date: "Nov 2018",
      place: "1st Place",
      event: "Robo Soccer — Daffodil International University",
      venue: "DIU, Bangladesh",
    },
  ],
};
