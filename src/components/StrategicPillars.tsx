import { TrendingUp } from "lucide-react";
import PillarCard from "./PillarCard";
import { useProjects } from "@/hooks/useProjects";
import { usePortfolioSection } from "@/hooks/usePortfolioContent";
const StrategicPillars = () => {
  const {
    data: projects,
    isLoading
  } = useProjects(true);
  const {
    data: headerContent
  } = usePortfolioSection("pillars_header");
  const label = headerContent?.metadata?.label || "What I Do";
  const headline = headerContent?.headline || "Strategic Pillars";
  const bodyText = headerContent?.body_text || "Three core competencies that drive results for high-stakes brands and complex challenges.";
  if (isLoading) {
    return <section id="pillars" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">{label}</span>
            <h2 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-8">{headline}</h2>
            <div className="text-muted-foreground max-w-2xl mx-auto text-lg prose prose-p:m-0" dangerouslySetInnerHTML={{
            __html: bodyText
          }} />
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse text-muted-foreground">Loading projects...</div>
          </div>
        </div>
      </section>;
  }
  if (!projects || projects.length === 0) {
    return null;
  }
  return <section id="pillars" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-8">{headline}</h2>
          <div className="text-muted-foreground max-w-2xl mx-auto text-lg prose prose-p:m-0" dangerouslySetInnerHTML={{
          __html: bodyText
        }} />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
          {projects.map(project => <PillarCard key={project.id} icon={<TrendingUp size={24} />} title={project.title} description={project.description} highlights={project.highlights || []} metric={project.metric || ""} metricLabel={project.metric_label || ""} imageUrl={project.image_url} techStack={project.tech_stack} />)}
        </div>
      </div>
    </section>;
};
export default StrategicPillars;