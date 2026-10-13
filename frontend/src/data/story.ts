export interface JourneyStop {
  id: number;
  name: string;
  role: string;
  caption: string;
  highlight?: boolean;
}

export interface TrackMilestone {
  distance: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StoryStat {
  id: number;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
}

export interface PathStep {
  step: number;
  title: string;
  category: string;
  description: string;
  isCurrent?: boolean;
}

export interface PathDetour {
  title: string;
  badge: string;
  description: string;
  lesson: string;
}

export interface ChapterProof {
  image: string;
  title: string;
  caption: string;
}

export interface StoryChapter {
  id: number;
  numberStr: string;
  title: string;
  tag?: string;
  iconName: string;
  paragraphs: string[];
  bullets?: string[];
  lesson?: string;
  proof?: ChapterProof | null;
}

// ============================================================================
// 1. THE JOURNEY: Five places that made me
// ============================================================================
export const journeyStops: JourneyStop[] = [
  {
    id: 1,
    name: "Bahawalpur",
    role: "Birthplace & Early Roots",
    caption: "Early childhood with father's army postings; first memories of discipline.",
  },
  {
    id: 2,
    name: "Kohat",
    role: "Schooling at APS",
    caption: "New terrain, changing schools, and learning to make friends quickly.",
  },
  {
    id: 3,
    name: "Islamabad",
    role: "Capital Horizons",
    caption: "Wider perspectives, diverse peers, and adaptability under changing environments.",
  },
  {
    id: 4,
    name: "Home Village",
    role: "Khanqa Dogran / Farm Life",
    caption: "Returning to village fields, driving tractors in 2016, and discovering grit.",
  },
  {
    id: 5,
    name: "Faisalabad",
    role: "UAF & Software Engineering",
    caption: "DAE textile, Chase Value leadership, the 600m athletic trial, and software engineering at UAF.",
    highlight: true,
  },
];

// ============================================================================
// 2. THE TRACK: The run that changed my life
// ============================================================================
export const trackMilestones: TrackMilestone[] = [
  {
    distance: "0m",
    title: "The Surprise Call-Up",
    description: "Invited by a friend on the morning of trials; walked onto the track with zero prep.",
    iconName: "Flag",
  },
  {
    distance: "200m",
    title: "Midday Summer Heat",
    description: "Competing against 16 trained athletes under Faisalabad's scorching afternoon sun.",
    iconName: "Flame",
  },
  {
    distance: "400m",
    title: "The Pure Grit Phase",
    description: "Lungs burning, legs heavy; farm endurance and mental discipline took over.",
    iconName: "Zap",
  },
  {
    distance: "600m",
    title: "1st Place & Finish Line",
    description: "Crossed 1st of 16 boys — the golden run that unlocked my Software Engineering admission.",
    iconName: "Trophy",
  },
];

// ============================================================================
// 3. IN NUMBERS: My story, counted
// ============================================================================
export const stats: StoryStat[] = [
  {
    id: 1,
    value: 600,
    suffix: "m",
    label: "Life-Changing Race",
    sub: "1st position out of 16 competitors",
  },
  {
    id: 2,
    value: 5,
    suffix: " Cities",
    label: "Cities & Towns Lived In",
    sub: "Built adaptability from childhood",
  },
  {
    id: 3,
    value: 3,
    suffix: " Years",
    label: "Textile Diploma (DAE)",
    sub: "Graduated with Grade A distinction",
  },
  {
    id: 4,
    value: 6,
    suffix: " Semesters",
    label: "Work & Degree Balances",
    sub: "Chase Value shift alongside university",
  },
];

// ============================================================================
// 4. THE PATH: Not a straight line
// ============================================================================
export const pathSteps: PathStep[] = [
  {
    step: 1,
    title: "APS & Village Schooling",
    category: "Foundations",
    description: "Discipline from army school postings and high school in Khanqa Dogran.",
  },
  {
    step: 2,
    title: "Textile DAE Diploma",
    category: "Technical",
    description: "3 years in dyeing & printing at GCT Samanabad; finished with Grade A.",
  },
  {
    step: 3,
    title: "NFC Institute (IT Basics)",
    category: "Transition",
    description: "Rebuffed by diploma quotas, spent a foundational year building coding basics.",
  },
  {
    step: 4,
    title: "UAF 600m Athletic Trial",
    category: "Breakthrough",
    description: "Ran 600m in 1st place, unlocking the open merit door for degree admission.",
  },
  {
    step: 5,
    title: "BS Software Engineering",
    category: "Academics & Job",
    description: "Balancing retail shifts at Chase Value with software engineering coursework.",
  },
  {
    step: 6,
    title: "Full-Stack AI Developer",
    category: "Current Destination",
    description: "Building production LLM agents, LangGraph systems, and full-stack web applications.",
    isCurrent: true,
  },
];

export const pathDetour: PathDetour = {
  title: "The Textile Diploma Detour",
  badge: "Unexpected Route",
  description:
    "After matric, I entered a 3-year DAE in textile dyeing and printing almost by chance. Though I graduated with an A grade, my diploma background initially blocked standard admissions into software engineering degrees. Rather than quitting, I built IT basics at NFC, ran the 600m track trial at UAF, and finally secured the Software Engineering seat I was working toward.",
  lesson: "Non-linear paths build resilience that a straight road never could.",
};

// ============================================================================
// 5. THE CHAPTERS: The full story
// ============================================================================
export const chapters: StoryChapter[] = [
  {
    id: 1,
    numberStr: "01",
    title: "Who I Am",
    iconName: "User",
    paragraphs: [
      "I'm Rana Summar, a Software Engineering student and Full-Stack AI developer. I come from a village in Pakistan, a soldier's son who grew up between classrooms and farm fields. That mix of discipline and hard work shapes how I build software today.",
    ],
    proof: null,
  },
  {
    id: 2,
    numberStr: "02",
    title: "Roots & Family",
    tag: "Childhood",
    iconName: "Home",
    paragraphs: [
      "My father served in the army, and our family is also deeply connected to farming. Growing up around both, I learned discipline from one and patience from the other.",
    ],
    lesson: "Respect for hard work and responsibility.",
    proof: null,
  },
  {
    id: 3,
    numberStr: "03",
    title: "Early Schooling & Moving Cities",
    tag: "Childhood",
    iconName: "School",
    paragraphs: [
      "I started my schooling at APS (ACS). Because of my father's postings, we moved from Bahawalpur to Kohat and then Islamabad. Living in different cities taught me to adapt quickly and meet new people with confidence.",
    ],
    proof: null,
  },
  {
    id: 4,
    numberStr: "04",
    title: "Back to the Village",
    iconName: "MapPin",
    paragraphs: [
      "We returned to our village, and I joined Government High School Khanqa Dogran. As a child I dreamed of joining the army. Seeing life in different places made me want to learn much more than my surroundings offered.",
    ],
    proof: null,
  },
  {
    id: 5,
    numberStr: "05",
    title: "Learning Life on the Farm",
    tag: "2016",
    iconName: "Wheat",
    paragraphs: [
      "In 2016 I learned to drive a tractor and started helping my baba and chachu on the farm, alongside school. Farm work taught me responsibility early and showed me that real results come from consistent effort.",
    ],
    proof: null,
  },
  {
    id: 6,
    numberStr: "06",
    title: "Matric & DAE",
    tag: "2018",
    iconName: "GraduationCap",
    paragraphs: [
      "After passing matric, I joined a DAE program in 2018. I entered the textile field almost by chance, and the three years were not easy, but I worked hard and finished with an A grade.",
    ],
    lesson: "I can succeed even in a field I didn't plan for.",
    proof: null,
  },
  {
    id: 7,
    numberStr: "07",
    title: "The Switch to IT",
    iconName: "Laptop",
    paragraphs: [
      "After DAE I decided to move into IT. I applied to several universities for Software Engineering, Computer Science and IT. My name appeared on merit lists, but my diploma background stopped me from getting admission in those programs. So I joined NFC in IT and spent a year building my basics.",
    ],
    proof: null,
  },
  {
    id: 8,
    numberStr: "08",
    title: "The Sports Quota Trial",
    tag: "2023",
    iconName: "Medal",
    paragraphs: [
      "A friend invited me to the UAF sports trials, and I had no idea what they would lead to. I ran the 600m race in full heat and secured 1st position among 16 boys. Even though the trials closed and I went back to NFC, that run turned out to be the start of something bigger.",
    ],
    proof: null,
  },
  {
    id: 9,
    numberStr: "09",
    title: "The Call That Changed Everything",
    tag: "2023",
    iconName: "Phone",
    paragraphs: [
      "Months later I got a call from UAF asking which degree I wanted. I thought it was a prank and even hung up on the first call! When they called again, I chose Software Engineering, Computer Science and IT in that order. At my documents submission I was nervous that my DAE background would cause rejection, but alhamdulillah, my documents were accepted and I secured my admission.",
    ],
    lesson: "Stay ready, because opportunities don't announce themselves.",
    proof: null,
  },
  {
    id: 10,
    numberStr: "10",
    title: "Study + Job: Balancing Both",
    iconName: "Briefcase",
    paragraphs: [
      "Alongside my degree, I worked a job from 2023 up to my 6th semester. My grades went up and down, but I never gave up on either study or work. Balancing both made me stronger and more independent.",
    ],
    proof: null,
  },
  {
    id: 11,
    numberStr: "11",
    title: "What the Job Taught Me",
    iconName: "Trophy",
    paragraphs: [
      "Working at Chase Value gave me lessons no classroom could:",
    ],
    bullets: [
      "Time management while balancing deadlines, classes and work",
      "Responsibility in delivering on time even when tired",
      "Communication with people from different backgrounds",
      "Staying calm under pressure",
      "A professional mindset",
    ],
    proof: {
      image: "/certificates/chase_value_certificate.jpeg",
      title: "Chase Value Star Badge Award",
      caption: "Certificate of Achievement awarded for extraordinary customer service, sales leadership, and discipline.",
    },
  },
  {
    id: 12,
    numberStr: "12",
    title: "Beyond the Screen",
    iconName: "Compass",
    paragraphs: [
      "Away from code, I love playing badminton and cricket. Sports gave me teamwork, fitness and a never-quit attitude, and honestly, my UAF journey began on a running track.",
    ],
    proof: null,
  },
  {
    id: 13,
    numberStr: "13",
    title: "Where I'm Heading",
    iconName: "Rocket",
    paragraphs: [
      "Today I build AI agents and full-stack applications with Next.js, FastAPI and LangChain. My goal is to create real products that solve real problems, especially for people like those in the community I come from. This journey is still being written.",
    ],
    proof: {
      image: "/certificates/saylani-agentic-ai.jpg",
      title: "Agentic AI Professional Certificate",
      caption: "Official Saylani Mass IT Training Program certification in Agentic AI and multi-agent workflows.",
    },
  },
];

// ============================================================================
// 6. ASK MY AI: Question Chips
// ============================================================================
export const askChips = [
  "How did the 600m race get you into Software Engineering?",
  "Tell me about your transition from textile DAE to IT",
  "How did working at Chase Value help your engineering career?",
  "What was it like growing up between classrooms and farm fields?",
  "What AI agents have you built since joining UAF?",
];
