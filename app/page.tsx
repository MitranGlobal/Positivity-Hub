import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import LeadGate from "@/components/LeadGate";
import { site } from "@/lib/content";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Struggles from "@/components/sections/Struggles";
import Program from "@/components/sections/Program";
import Curriculum from "@/components/sections/Curriculum";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";

export default function Home() {
  return (
    <>
      {/* Everything behind the sign-up popup (opened by CTA buttons); made inert while it is open. */}
      <div id="site">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Nav />
        <main id="main">
          {/* Problem → recognition → cause → approach → Positivity Hub → proof → offer */}
          <Hero />
          <Struggles />
          <About />
          <Program />
          <Testimonials />
          <Curriculum />
          <Pricing />
          <Faq />
        </main>
        <Footer />
      </div>
      <LeadGate />
      {/* Trailer popup, only needed while the video is shown. */}
      {site.showTrailer && <Lightbox />}
    </>
  );
}
