import { TrendingUp, MessageSquare, Code2 } from "lucide-react";
import PillarCard from "./PillarCard";

const StrategicPillars = () => {
  const pillars = [
    {
      icon: <TrendingUp size={24} />,
      title: "Audience & Revenue Growth",
      description: "Driving measurable audience acquisition and revenue through data-driven strategies.",
      highlights: [
        "0 → 22k subscribers organically",
        "$148k revenue generated",
        "10x ROI on campaigns",
      ],
      metric: "10x",
      metricLabel: "ROI",
      imageUrl: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop",
      size: "large" as const,
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Strategic Communications",
      description: "Translating complex regulations and data into clear, actionable narratives.",
      highlights: [
        "NCAA compliance strategy",
        "Educational data translation",
        "Ranked #1 on Google",
      ],
      metric: "#1",
      metricLabel: "on Google",
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop",
      size: "medium" as const,
    },
    {
      icon: <Code2 size={24} />,
      title: "Product Strategy & AI Workflows",
      description: "Building with a founder mindset using cutting-edge AI-first technology stacks.",
      highlights: [
        "ClassOptic EdTech platform",
        "End-to-end product ownership",
        "AI-native development",
      ],
      metric: "AI-Native",
      metricLabel: "Stack",
      imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop",
      size: "medium" as const,
      techStack: ["React", "Supabase", "Cursor", "Gemini"],
    },
  ];

  return (
    <section id="pillars" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">What I Do</span>
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-8">Strategic Pillars</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Three core competencies that drive results for high-stakes brands and complex challenges.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicPillars;
