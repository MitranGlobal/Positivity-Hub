/**
 * All page copy lives here so it can be edited without touching layout code.
 * Text is taken from the client's existing Mitran Global page.
 */

export const site = {
  name: "Positivity Hub",
  by: "Mitran Global",
  /**
   * Video/trailer is hidden for now. Set to true to bring back the video block in
   * the "Build confidence" section, the hero's "Watch trailer" button and the
   * trailer popup. All of that code is kept and works as before.
   */
  showTrailer: false,
  /**
   * Set this to a video URL (e.g. "/trailer.mp4" in /public, or a hosted .mp4)
   * and the "Watch trailer" lightbox will play it. While empty, the lightbox
   * shows a "coming soon" note instead of a broken player.
   */
  trailerSrc: "",
  /** Where "Register now" sends people. */
  registerUrl: "https://hub.mitranglobal.com/web/checkout/6ace0ed5f506917ea09e28b5",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Help", href: "#help" },
];

export const hero = {
  title: "Positivity Hub",
  lead: "Empower your teen to build confidence, manage emotions, overcome challenges, and develop a positive mindset for life.",
  practices: ["Personalised growth guidance", "Emotional resilience building", "Confidence development", "Positive mindset cultivation"],
  proofLabel: "Supported by wellness seekers globally",
  stats: [
    { value: "10K+", label: "Participants" },
    { value: "4.9★", label: "Feedback" },
    { value: "95%", label: "Success indicator" },
  ],
};

export const about = {
  title: "Build confidence, strengthen your mind",
  lead: "Discover a personalised journey designed to help your teen manage emotions, overcome challenges, build resilience, and develop a positive mindset for life.",
  trailer: { length: "12 min intro", reach: "25K+ participants" },
  pillars: [
    {
      title: "Confidence & self-awareness",
      body: "Encourage your teen to understand their emotions, trust their abilities, and express themselves with greater confidence.",
    },
    {
      title: "Supportive parent-child connection",
      body: "Build better understanding and communication between you and your teen through guided sessions that encourage growth together.",
    },
    {
      title: "Practical life skills",
      body: "Equip your teen with essential skills to make thoughtful decisions, manage emotions, and handle real-life situations.",
    },
  ],
  closing:
    "Ready to help your teen thrive? Discover the MiTran Global Positivity Hub and take the first step towards building confidence, emotional strength, and a positive future.",
};

export type CardShape = "wide" | "tall" | "square";

export const struggles: {
  title: string;
  lead: string;
  items: { q: string; a: string; image: string; shape: CardShape }[];
} = {
  title: "Does This Sound Like Your Teen?",
  lead: "These are the everyday challenges the MiTran Global Positivity Hub is designed to help your child navigate.",
  items: [
    {
      q: "Feeling overwhelmed by pressure?",
      image: "/challenges/pressure.webp",
      shape: "square",
      a: "Exams, expectations, and everyday challenges can feel like a lot. Help your teen understand their emotions and face pressure with greater confidence.",
    },
    {
      q: "Struggling to stay motivated?",
      image: "/challenges/motivation.webp",
      shape: "wide",
      a: "When distractions take over or setbacks feel discouraging, help your teen rediscover their focus, build positive habits, and take small steps forward.",
    },
    {
      q: "Finding it difficult to express themselves?",
      image: "/challenges/expression.webp",
      shape: "tall",
      a: "Sometimes, teens find it hard to share what they feel or connect with others. Help your child develop self-awareness, communicate openly, and build healthier relationships.",
    },
    {
      q: "Finding it hard to manage emotions?",
      image: "/challenges/emotions.webp",
      shape: "wide",
      a: "Frustration, worry, and self-doubt are part of growing up. Help your teen develop emotional strength and practical ways to respond to challenging situations.",
    },
  ],
};

export const curriculum = {
  title: "Every Child Deserves the Opportunity to Grow from Within",
  paragraphs: [
    "You don't have to wait for your child to struggle before investing in their emotional well-being.",
    "Whether your child needs support with confidence, exam pressure, focus, or everyday challenges, the MiTran Global Positivity Hub offers a personalised journey to help you understand your child better and support their growth.",
  ],
  emphasis: [
    "Take the first step towards a more confident, emotionally stronger child.",
    "Connect with MiTran Global to explore the program and enroll your child.",
  ],
};

export type Benefit = { title: string; detail?: string; list?: string[] };
export type BenefitGroup = { heading: string; items: Benefit[] };

/** The client's current benefits. */
export const coreBenefits: BenefitGroup = {
  heading: "What your child receives",
  items: [
    {
      title: "3 personalised handholding sessions",
      detail:
        "Guided by a trained and certified Transformation Coach. Two sessions are for parent and child together, and one is exclusively for the child.",
    },
    {
      title: "Personalised well-being report",
      detail: "A tailor-made report on your child's overall well-being, strengths and areas for growth.",
    },
  ],
};

export const bonusBenefits: BenefitGroup = {
  heading: "Bonus",
  items: [
    {
      title: "Micro lessons in 6 areas of challenge",
      detail: "Short, focused lessons that help your child work through the challenges teens face most.",
    },
    {
      title: "3 flagship courses",
      list: ["I Love Exams", "Accelerated Learning Methodologies", "Positive Mind Mastery"],
    },
    {
      title: "Group masterclasses",
      detail: "Interactive sessions on confidence, personal growth and building a positive mindset.",
    },
  ],
};

/** The single program offering. */
export const plan = {
  name: "Positivity Hub program",
  tagline: "Everything your child receives, plus every bonus.",
  price: 1999,
  was: 4999,
  cta: "Enroll now",
  groups: [coreBenefits, bonusBenefits],
};

export const pricing = {
  title: "Enroll your teen",
  lead: "One program with everything included: personalised coaching, a well-being report and every bonus.",
};

// Student testimonials, as published on https://www.mitranglobal.com/
export const testimonials = {
  title: "Here's what our current students have to say",
  lead: "Students from schools across India and abroad on what changed for them with MiTran Global.",
  items: [
    {
      name: "Banshika Kumari",
      photo: "/testimonials/banshika.webp",
      role: "9th Grade, Jammu Sanskriti School, Jammu",
      quote:
        "I am Banshika Kumari. I always face the problems of slow reading and learning but, since I am using MiTran Global everything took a turn. The platform MiTran Global has many courses like I love exams, Accelerated learning methodologies, Positive mind mastery. All these courses contain the stuff that is much needed for a student. From the accelerated learning methodologies course, I learned to read and learn fast. I especially thank the whole MiTran Global team for making my life much easier.",
    },
    {
      name: "Raju Adnani",
      photo: "/testimonials/raju.webp",
      role: "11th Grade, Dubai English School, UAE",
      quote:
        "Working at the foundational level the system created by Vidyashankar has instilled in Siddharth a drive for success and a belief in failure as a stepping stone to success. Siddharth has not only honed his leadership skills but also integrated essential self-beliefs into his personality. When Siddharth participated in a panel discussion at MiTran Global, we were happy to notice he made significant contributions. In my opinion, the whole coaching process has been fundamental in shaping Siddharth trajectory addressing aspects often overlooked by mainstream education.",
    },
    {
      name: "Mahathi",
      photo: "/testimonials/mahathi.webp",
      role: "8th Grade, KRM Public School, Chennai",
      quote:
        "This is Mahathi and I have been part of MiTran Global sessions. I have learned many new things from these classes. Also, the online courses that have been shared in the link were very understandable and made me believe Exams are easy once we love the same. The other courses like Positive Mind Mastery changed me from feeling negative to thinking positive. Thank you MiTran Global for creating this wonderful hub for students",
    },
    {
      name: "Anshikha Kumar",
      photo: "/testimonials/anshikha.webp",
      role: "9th Grade, The Srijan School, Delhi",
      quote:
        "Hi, I’m Anshika Kumar, a 9th-grade student from The Srijan School, Delhi. Before joining MiTran Global’s Positivity Hub, I was eager to understand teenage life better and learn how to navigate challenges with confidence. One of the most fascinating things I discovered was about the power of the mind and how our neurons shape our thoughts and actions, it was truly eye-opening! I’ve learned the importance of staying positive, believing in myself, Thank you, Mitran Global, for creating such an impactful platform!",
    },
    {
      name: "Justin Jiby",
      photo: "/testimonials/justin.webp",
      role: "6th Grade, St. Alonso Senior Secondary School",
      quote:
        "Hi, I’m Justin, a 6th-grade student from St. Alonso Senior Secondary School. Thank you for this amazing session! It was a new and exciting experience for me. Before this, I had never thought about these ideas. But after the session, when I asked myself what I had learned, the first thing that came to my mind was: \"If others can do it, I can do it too!\" This made me feel more confident and motivated. I’m really grateful for this life-changing opportunity through MiTran Global. Thank you for helping me believe in myself and discover my true potential!",
    },
    {
      name: "Likith Bardwaj",
      photo: "/testimonials/likith.webp",
      role: "7th Grade, Delhi Public School, North Bangalore",
      quote:
        "Earlier, I used to feel like I couldn't achieve much and that my life would always be the same. But after taking these courses, I learned a lot about the human brain, emotions, and self-control. One of the best things was making a weekly plan, which helped me stay focused. Now, I feel better both mentally and physically. My favorite part of the program was learning through mnemonics like POPM and discovering the eight principles of superpower memory. These techniques have helped me understand how to control my emotions and improve my focus. Thank you, MiTran Global, for this amazing experience!",
    },
  ],
};

export const faqs = [
  {
    q: "Is this an academic course?",
    a: "No. Its primary focus is emotional well-being, confidence, mindset, and life skills.",
  },
  {
    q: "Is the report a psychological diagnosis?",
    a: "No. It is intended for well-being awareness and personal development, not clinical diagnosis.",
  },
  {
    q: "What exactly will my child receive?",
    a: "Three personalised handholding sessions, a personalised well-being report, and additional bonus resources.",
  },
  {
    q: "Is this suitable for a child who is already doing well?",
    a: "Yes. The program also supports children who want to strengthen their existing abilities and personal growth.",
  },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
