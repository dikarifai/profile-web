import AboutSection from "@/components/Layouts/AboutSection";
import BlogSection from "@/components/Layouts/BlogSection";
import ExperienceSection from "@/components/Layouts/ExperienceSection";
import HeroSection from "@/components/Layouts/HeroSection";
import PortfolioSection from "@/components/Layouts/PortfolioSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <PortfolioSection />
      <BlogSection />
    </main>
  );
}
