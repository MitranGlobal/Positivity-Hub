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
  /** One breathing cycle in seconds, shared by the 3D orb and its caption. */
  breath: { inhale: 4, exhale: 6 },
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Help", href: "#help" },
];

export const hero = {
  title: ["Elevate your", "mind & spirit"],
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

export type Plan = {
  id: "foundation" | "complete";
  name: string;
  tagline: string;
  price: number;
  was?: number;
  featured?: boolean;
  cta: string;
  /** TODO(client): paste the payment / checkout link for this plan (e.g. a Razorpay payment page). */
  checkoutUrl: string;
  intro?: string;
  benefits: string[];
};

export const plans: Plan[] = [
  {
    id: "foundation",
    name: "Foundation course",
    tagline: "Ideal for those beginning their mental health journey.",
    price: 1499,
    cta: "Start with Foundation",
    checkoutUrl: "",
    benefits: [
      "Understanding mental health basics",
      "Access to calming resources",
      "Community support group access",
      "Lifetime access",
      "30-day money-back guarantee",
    ],
  },
  {
    id: "complete",
    name: "Complete course",
    tagline: "Enhance your understanding with deeper insights.",
    price: 1999,
    was: 4999,
    featured: true,
    cta: "Enrol in the Complete course",
    checkoutUrl: "",
    intro: "Everything in Foundation, plus:",
    benefits: [
      "All five course modules",
      "Comprehensive mental health strategies",
      "In-depth resources & tools",
      "Access to expert-led webinars",
      "Certificate included",
      "24/7 support",
    ],
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
        { label: "With live webinars and a certificate", weight: 2 },
      ] as QuizOption[],
    },
  ],
};

export const faqs = [
  {
    q: "How long do I have access?",
    a: "Both plans include lifetime access. Learn at your own pace and come back to the material whenever you need it.",
  },
  {
    q: "What if the course isn't right for me?",
    a: "Every plan comes with a 30-day money-back guarantee. If it isn't helping, contact us within 30 days of purchase for a full refund.",
  },
  {
    q: "What's the difference between the two plans?",
    a: "Foundation covers mental health basics, calming resources and community access. The Complete course adds all five modules, expert-led webinars, in-depth tools, a certificate and 24/7 support.",
  },
  {
    q: "Is this a replacement for therapy?",
    a: "No. The course teaches wellbeing skills and is not a medical or clinical service. If you're struggling, please also speak with a qualified mental health professional.",
  },
  {
    q: "Do I get a certificate?",
    a: "Yes, a certificate is included with the Complete course.",
  },
];

export const helpline = {
  name: "Tele-MANAS",
  numbers: ["14416", "1-800-891-4416"],
  note: "If you are in crisis or thinking about harming yourself, call India's free 24/7 Tele-MANAS helpline.",
};

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
