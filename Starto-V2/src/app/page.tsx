import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AntigravityHero } from "@/components/home/AntigravityHero";
import { LocalExploration } from "@/components/home/LocalExploration";
import { HowItWorks } from "@/components/home/HowItWorks";
import { StartoIntelligence } from "@/components/home/StartoIntelligence";

import { RolesEcosystem } from "@/components/home/RolesEcosystem";
import { CoreActionSplit } from "@/components/home/CoreActionSplit";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/home/Navbar";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <Navbar />
      <main className="flex-1">
        <AntigravityHero />
        <LocalExploration />
        <HowItWorks />
        <StartoIntelligence />
        <CoreActionSplit />

        <RolesEcosystem />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}
