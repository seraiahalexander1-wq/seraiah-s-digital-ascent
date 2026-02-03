import { ReactNode } from "react";
import { Zap, TrendingUp, Target, CheckCircle } from "lucide-react";

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlights: string[];
  metric: string;
  metricLabel: string;
  imageUrl: string;
  techStack?: string[];
}

const highlightIcons = [Zap, TrendingUp, Target, CheckCircle];

const PillarCard = ({ 
  title, 
  description, 
  highlights, 
  imageUrl,
  techStack,
}: PillarCardProps) => {
  return (
    <div className="group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-card-hover h-[320px]">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/30" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h3 className="font-serif text-primary-foreground mb-2 font-semibold text-2xl">
          {title}
        </h3>
        
        <p className="text-primary-foreground/80 mb-4 leading-relaxed line-clamp-2 text-sm">
          {description}
        </p>

        {/* Key Wins with Icons */}
        <div className="space-y-2">
          {highlights.slice(0, 3).map((highlight, idx) => {
            const IconComponent = highlightIcons[idx % highlightIcons.length];
            return (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <IconComponent size={10} className="text-accent" />
                </div>
                <span className="text-primary-foreground/90 line-clamp-1 text-xs">{highlight}</span>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Footer */}
        {techStack && techStack.length > 0 && (
          <div className="mt-4 pt-3 border-t border-primary-foreground/20">
            <div className="flex flex-wrap gap-1.5">
              {techStack.slice(0, 4).map((tech, idx) => (
                <span 
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full bg-background/20 text-primary-foreground/90 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PillarCard;
