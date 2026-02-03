import { ReactNode } from "react";

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlights: string[];
  metric: string;
  metricLabel: string;
}

const PillarCard = ({ icon, title, description, highlights, metric, metricLabel }: PillarCardProps) => {
  return (
    <div className="group relative bg-card border border-border rounded-2xl p-8 hover:border-accent/50 transition-all duration-500 hover:shadow-card overflow-hidden">
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Metric Reveal on Hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <div className="bg-accent/10 border border-accent/30 rounded-lg px-3 py-1.5">
          <span className="text-accent font-bold text-sm">{metric}</span>
          <span className="text-accent/70 text-xs ml-1">{metricLabel}</span>
        </div>
      </div>

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

        <div className="space-y-3">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span className="text-sm text-muted-foreground">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PillarCard;
