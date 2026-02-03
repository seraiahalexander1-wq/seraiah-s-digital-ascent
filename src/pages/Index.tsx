import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import StrategicPillars from "@/components/StrategicPillars";
import KnowledgeHub from "@/components/KnowledgeHub";
import TechnicalSkills from "@/components/TechnicalSkills";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <AboutMe />
      <StrategicPillars />
      <KnowledgeHub />
      <TechnicalSkills />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
