/**
 * All page copy lives here so it can be edited without touching layout code.
 * Text is taken from the client's existing Mitran Global page.
 */

export const site = {
  name: "Positivity Hub",
  by: "Mitran Global",
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
  outcomes: [
    { title: "Achieved calm", note: "Better mental health" },
    { title: "Lifetime skills", note: "Lasting change" },
    { title: "Community growth", note: "Unmatched support" },
  ],
  proofLabel: "Supported by wellness seekers globally",
  stats: [
    { value: "10K+", label: "Participants" },
    { value: "4.9★", label: "Feedback" },
    { value: "95%", label: "Success indicator" },
  ],
};

export const features = [
  {
    title: "Flexible learning",
    body: "Engage at your own pace with resources tailored to your journey.",
    icon: "clock",
  },
  {
    title: "Transformational impact",
    body: "Methods rooted in psychological principles with successful case histories.",
    icon: "spark",
  },
  {
    title: "Guided expertise",
    body: "Receive expert feedback and strategies from licensed wellness coaches.",
    icon: "people",
  },
] as const;

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

export const struggles = {
  title: "Does Your Teen Relate to Any of These?",
  lead: "These are the everyday challenges the MiTran Global Positivity Hub is designed to help your child navigate.",
  items: [
    {
      q: "Feeling overwhelmed by pressure?",
      a: "Exams, expectations, and everyday challenges can feel like a lot. Help your teen understand their emotions and face pressure with greater confidence.",
    },
    {
      q: "Struggling to stay motivated?",
      a: "When distractions take over or setbacks feel discouraging, help your teen rediscover their focus, build positive habits, and take small steps forward.",
    },
    {
      q: "Finding it difficult to express themselves?",
      a: "Sometimes, teens find it hard to share what they feel or connect with others. Help your child develop self-awareness, communicate openly, and build healthier relationships.",
    },
    {
      q: "Finding it hard to manage emotions?",
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
    "Connect with MiTran Global to explore the program and enrol your child.",
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

export type Plan = {
  id: "foundation" | "complete";
  name: string;
  tagline: string;
  price: number;
  was?: number;
  featured?: boolean;
  cta: string;
  /** TODO(client): payment / checkout link for this plan. Empty keeps the button on the pricing section. */
  checkoutUrl: string;
  groups: BenefitGroup[];
  /** Shown muted, to make clear what the higher plan adds. */
  notIncluded?: BenefitGroup;
};

// TODO(client): confirm the split. Currently the ₹1,499 plan has the core benefits
// and the ₹1,999 plan adds the bonus.
export const plans: Plan[] = [
  {
    id: "foundation",
    name: "Foundation course",
    tagline: "Ideal for those beginning their mental health journey.",
    price: 1499,
    cta: "Start with Foundation",
    checkoutUrl: "",
    groups: [coreBenefits],
    notIncluded: { heading: "Bonus, in the Complete course", items: bonusBenefits.items },
  },
  {
    id: "complete",
    name: "Complete course",
    tagline: "Everything in Foundation, plus the full bonus.",
    price: 1999,
    was: 4999,
    featured: true,
    cta: "Enrol in the Complete course",
    checkoutUrl: "",
    groups: [coreBenefits, bonusBenefits],
  },
];

export const pricing = {
  title: "Choose your plan",
  lead: "Select the plan that aligns with your mental health journey and unlock a world of transformative insights.",
  assurances: ["Secure payment processing", "30-day money-back guarantee"],
  closing: "Join our community of individuals seeking positive mental health transformations.",
};

export const testimonials = {
  title: "Transform your mind with our course",
  lead: "How our online course enhances well-being and fosters personal growth for individuals worldwide.",
  // TODO(client): replace with verified reviews from real participants (with their consent) before launch.
  items: [
    {
      name: "Emily Rodriguez",
      role: "Business Development Director",
      quote:
        "The course reshaped my perspective on mental health. Within weeks, I felt more positive and engaged in my work. The tools provided were a game-changer for personal growth.",
      achievement: "Enhanced well-being in my personal life",
    },
    {
      name: "David Martinez",
      role: "Founder, Innovation Labs",
      quote:
        "Engaging with this course redefined my outlook on life's challenges. I've implemented healthier coping mechanisms that improved my productivity significantly!",
      achievement: "Increased workplace efficiency by 50%",
    },
    {
      name: "Michael Chen",
      role: "CEO, TechVentures Inc.",
      quote:
        "This course helped me overcome procrastination and embrace my mental well-being! I now have a clear roadmap for my communication strategies.",
      achievement: "Improved personal relationships",
    },
    {
      name: "Sarah Johnson",
      role: "VP of Sales, GlobalTech Solutions",
      quote:
        "Participating in this course changed my life perspective. It not only improved my mental health but also enhanced my relationship with my family. Truly worth every minute!",
      achievement: "Strengthened family connections",
    },
  ],
};

export type QuizOption = { label: string; weight: 0 | 1 | 2 };
export const quiz = {
  title: "Not sure where to start?",
  lead: "Four quick questions to point you to the plan that fits. This is a guide, not a diagnosis.",
  questions: [
    {
      q: "How much time can you give this each week?",
      options: [
        { label: "Under an hour", weight: 0 },
        { label: "One to three hours", weight: 1 },
        { label: "More than three hours", weight: 2 },
      ] as QuizOption[],
    },
    {
      q: "Have you tried mindfulness or wellbeing practices before?",
      options: [
        { label: "This is new to me", weight: 0 },
        { label: "A little, here and there", weight: 1 },
        { label: "Yes, I want to go deeper", weight: 2 },
      ] as QuizOption[],
    },
    {
      q: "What would help you most right now?",
      options: [
        { label: "Simple ways to feel calmer", weight: 0 },
        { label: "Tools for stress and anxiety", weight: 1 },
        { label: "A full plan with expert input", weight: 2 },
      ] as QuizOption[],
    },
    {
      q: "How do you like to learn?",
      options: [
        { label: "On my own, in short bursts", weight: 0 },
        { label: "With a community alongside me", weight: 1 },
        { label: "With live group masterclasses", weight: 2 },
      ] as QuizOption[],
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
