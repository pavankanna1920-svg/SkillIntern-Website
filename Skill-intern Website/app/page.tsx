import Hero from "@/components/Hero";
import StatsMarquee from "@/components/StatsMarquee";
import UnlockPotential from "@/components/UnlockPotential";
import Features from "@/components/Features";
import Courses from "@/components/Courses";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

import GrowthJourney from "@/components/GrowthJourney";
import TransformCareer from "@/components/TransformCareer";
import AdvancedPrograms from "@/components/AdvancedPrograms";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsMarquee />
      <Features />
      <UnlockPotential />
      <Courses />
      <GrowthJourney />
      <TransformCareer />
      <AdvancedPrograms />
      <Testimonials />
      <Contact />
    </main>
  );
}
