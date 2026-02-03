import { Zap, TrendingUp, Target } from "lucide-react";
import PillarCard from "./PillarCard";
import { useProjects } from "@/hooks/useProjects";

const StrategicPillars = () => {
  const { data: projects, isLoading } = useProjects(true);

  if (isLoading) {
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
          <div className="flex justify-center">
            <div className="animate-pulse text-muted-foreground">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return null;
  }

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
          {projects.map((project) => (
            <PillarCard
              key={project.id}
              icon={<TrendingUp size={24} />}
              title={project.title}
              description={project.description}
              highlights={project.highlights || []}
              metric={project.metric || ""}
              metricLabel={project.metric_label || ""}
              imageUrl={project.image_url}
              size={project.size as "large" | "medium" | "small"}
              techStack={project.tech_stack}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategicPillars;
