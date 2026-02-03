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
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop",
      size: "large" as const,
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
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      size: "medium" as const,
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
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop",
      size: "medium" as const,
    },
  ];

  return (
    <section id="pillars" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">What I Do</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary mb-6">Strategic Pillars</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Three core competencies that drive results for high-stakes brands and complex challenges.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicPillars;
