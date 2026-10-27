import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import About from "@/components/sections/About";
import Struggles from "@/components/sections/Struggles";
import Curriculum from "@/components/sections/Curriculum";
import Quiz from "@/components/sections/Quiz";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Features />
        <About />
        <Struggles />
        <Curriculum />
        <Quiz />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <Lightbox />
    </>
  );
}
