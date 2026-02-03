import { TrendingUp, MessageSquare, Code2 } from "lucide-react";
import PillarCard from "./PillarCard";

const StrategicPillars = () => {
  const pillars = [
    {
      icon: <TrendingUp size={24} />,
      title: "Brand Growth",
      description: "Driving measurable audience acquisition and revenue through data-driven strategies.",
      highlights: [
        "Shroomer/Naturealm: 0 to 22k subscribers",
        "ShellDance Designs: $148k revenue generated",
        "Focus: ROI & Audience Acquisition",
      ],
      metric: "10x",
      metricLabel: "ROI",
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Complex Communication",
      description: "Translating difficult regulations and educational data into clear, actionable narratives.",
      highlights: [
        "NCAA compliance content strategy",
        "ZenEducate educational data translation",
        "Science-backed narrative development",
      ],
      metric: "#1",
      metricLabel: "on Google",
    },
    {
      icon: <Code2 size={24} />,
      title: "Product Development",
      description: "Building with a founder mindset using cutting-edge AI-first technology stacks.",
      highlights: [
        "ClassOptic: AI-powered EdTech platform",
        "AI-first stack: React, Supabase, Cursor",
        "End-to-end product ownership",
      ],
      metric: "AI-Native",
      metricLabel: "Stack",
    },
  ];

  return (
    <section id="pillars" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Strategic Pillars</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three core competencies that drive results for high-stakes brands and complex challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicPillars;
