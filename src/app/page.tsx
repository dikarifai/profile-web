import AboutSection from "@/components/Layouts/AboutSection";
import BlogSection from "@/components/Layouts/BlogSection";
import HeroSection from "@/components/Layouts/HeroSection";
import Image from "next/image";

export default function Home() {
  return (<>
    <HeroSection />
    <AboutSection />
    <BlogSection />
  </>
  );
}
