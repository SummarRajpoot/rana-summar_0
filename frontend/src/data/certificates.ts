export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  pdf?: string;
  type?: string;
  credentialId?: string;
  badge?: string;
  project?: string;
  links?: {
    demo?: string;
    github?: string;
    linkedin?: string;
  };
  result?: string;
}

export const certificatesData: Certificate[] = [
  {
    id: "amd-developer-hackathon-act-iii",
    title: "AMD Developer Hackathon: ACT III",
    type: "Certificate of Completion",
    issuer: "lablab.ai (NativelyAI)",
    date: "Oct 12 to 18, 2026",
    description:
      "Completed and submitted an AI/ML solution during AMD Developer Hackathon: ACT III, using AMD Developer Cloud, AMD ROCm, Claude, Groq and LangChain.",
    project: "AI Factory Quality & Maintenance Agent",
    credentialId: "C9E2D94687796426BA9C35FADC5C9B3C2",
    pdf: "/certificates/AMD_Developer_Hackathon__ACT_III-certificate.pdf",
    image: "/certificates/amd-hackathon-act-iii-preview.png",
    links: {
      demo: "https://act-iii-hackathon-prototype.vercel.app/",
      github: "https://github.com/SummarRajpoot/ACT-III-Hackathon-Prototype",
      linkedin: "https://lnkd.in/p/dbAaeTni",
    },
    badge: "Hackathon",
    result: "",
  },
  {
    id: "chase-value",
    title: "Certificate of Achievement — Star Badge Award",
    issuer: "Chase Value",
    date: "Mar 2023",
    description:
      "For extraordinary customer service & selling skills and in recognition of Star Badge Award.",
    image: "/certificates/chase_value_certificate.jpeg",
  },
  {
    id: "cs50x-puzzle-day-2026",
    title: "CS50x Puzzle Day 2026",
    issuer: "Harvard University",
    date: "2026",
    description:
      "Recognition for participation in CS50x Puzzle Day 2026 — an online, social event promoting collaboration and problem-solving.",
    image: "/certificates/cs50x_puzzle_day_2026.jpg",
    pdf: "/certificates/cs50x_puzzle_day_2026.pdf",
  },
  {
    id: "intro-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "01 Mar 2026",
    description:
      "Successfully completed Introduction to Cybersecurity offered by Networking Academy through the Cisco Networking Academy program.",
    image: "/certificates/introduction_to_cybersecurity_certificate.jpg",
    pdf: "/certificates/introduction_to_cybersecurity_certificate.pdf",
  },
  {
    id: "networking-devices",
    title: "Networking Devices and Initial Configuration",
    issuer: "Cisco Networking Academy",
    date: "09 Mar 2026",
    description:
      "Successfully completed Networking Devices and Initial Configuration offered by Networking Academy through the Cisco Networking Academy program.",
    image: "/certificates/networking_devices_and_initial_configuration.jpg",
    pdf: "/certificates/networking_devices_and_initial_configuration.pdf",
  },
  {
    id: "saylani-agentic-ai",
    title: "Agentic AI (Batch-1)",
    issuer: "Saylani IT Training Programme",
    date: "May 2026",
    description:
      "Successfully completed the Agentic AI (Batch-1) training course, 7 months duration (Nov 2025 – May 2026), as a student under the Education Department of Saylani Welfare International Trust.",
    image: "/certificates/saylani-agentic-ai.jpg",
    pdf: "/certificates/saylani-agentic-ai.png.pdf",
  },
];

