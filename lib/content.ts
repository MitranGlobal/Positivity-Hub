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
  lead: "Unlock the ultimate mental wellness journey that has transformed the lives of countless participants.",
  practices: ["Mindfulness practices", "Compassionate coaching", "Holistic approaches", "Supportive community"],
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
  title: "Reclaim your mind, reclaim your peace",
  lead: "Discover our transformative online program designed to help you cultivate inner harmony and resilience through mindful practices.",
  trailer: { length: "12 min intro", reach: "25K+ participants" },
  pillars: [
    {
      title: "Mindful techniques",
      body: "Experience peace through our guided mindfulness practices tailored to your needs.",
    },
    {
      title: "Professional mentorship",
      body: "Receive insights from mental health professionals with years of expertise.",
    },
    {
      title: "Supportive community",
      body: "Connect with others on a similar journey for encouragement and support.",
    },
  ],
  closing: "Eager to explore your potential? Watch the complete preview and uncover the methods transforming lives.",
};

export const struggles = {
  title: "Does any of this sound like you?",
  lead: "These are the moments the course was built for.",
  items: [
    {
      q: "Feeling overwhelmed?",
      a: "It's normal to feel lost sometimes, but our course provides a path to clarity and stability.",
    },
    {
      q: "Struggling with motivation?",
      a: "Our course teaches methods to reignite your passion and drive.",
    },
    {
      q: "Struggling to connect?",
      a: "Discover how to foster connections and thereby improve your mental health through our strategies.",
    },
    {
      q: "Finding it hard to relax?",
      a: "Learn effective techniques to unwind and embrace a calmer state of mind.",
    },
  ],
};

export const curriculum = {
  title: "Transform your mindset",
  lead: "Embrace a journey of healing and resilience while unlocking your true potential through our online mental health course.",
  modules: [
    {
      title: "Emotional intelligence development",
      body: "Enhancing self-awareness and managing emotions effectively.",
    },
    {
      title: "Coping strategies for anxiety",
      body: "Techniques to manage anxiety and enhance mental clarity.",
    },
    {
      title: "Mindfulness and meditation techniques",
      body: "Practices to cultivate mindfulness and reduce stress levels.",
    },
    {
      title: "Cultivating resilience",
      body: "Building mental strength and overcoming challenges.",
    },
    {
      title: "Nourishing relationships",
      body: "Building healthier, more supportive connections with the people around you.",
    },
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
    q: "Who leads the handholding sessions?",
    a: "A trained and certified Transformation Coach. Two of the three sessions are for parent and child together, and one is exclusively for the child.",
  },
  {
    q: "What's the difference between the two plans?",
    a: "Foundation includes 3 personalised handholding sessions and a personalised well-being report. The Complete course adds the bonus: micro lessons in 6 areas of challenge, 3 flagship courses (I Love Exams, Accelerated Learning Methodologies and Positive Mind Mastery) and group masterclasses.",
  },
  {
    q: "What if the course isn't right for us?",
    a: "Every plan comes with a 30-day money-back guarantee. If it isn't helping, contact us within 30 days of purchase for a full refund.",
  },
  {
    q: "Is this a replacement for therapy?",
    a: "No. The programme builds well-being skills and is not a medical or clinical service. If your child is struggling, please also speak with a qualified mental health professional.",
  },
];

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
