import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/layout/HeroSection";
import FeaturesSection from "@/components/layout/FeaturesSection";
import StatsSection from "@/components/layout/StatsSection";
import DashboardPreviewSection from "@/components/layout/DashboardPreviewSection";
import FitnessProgramsSection from "@/components/layout/FitnessProgramsSection";
import TestimonialsSection from "@/components/layout/TestimonialsSection";
import CTASection from "@/components/layout/CTASection";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <DashboardPreviewSection />
        <FitnessProgramsSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}