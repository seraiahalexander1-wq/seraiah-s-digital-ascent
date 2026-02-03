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
  size?: "large" | "medium" | "small";
  techStack?: string[];
}

const highlightIcons = [Zap, TrendingUp, Target, CheckCircle];

const PillarCard = ({ 
  title, 
  description, 
  highlights, 
  metric, 
  metricLabel, 
  imageUrl,
  size = "medium",
  techStack 
}: PillarCardProps) => {
  const sizeClasses = {
    large: "md:col-span-2 md:row-span-2",
    medium: "md:col-span-1 md:row-span-1",
    small: "md:col-span-1 md:row-span-1",
  };

  return (
    <div className={`group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-card-hover ${sizeClasses[size]}`}>
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/30" />
      
      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-end ${size === 'large' ? 'p-10' : 'p-6'}`}>

        <h3 className={`font-serif text-primary-foreground mb-3 font-semibold ${size === 'large' ? 'text-4xl' : 'text-2xl'}`}>
          {title}
        </h3>
        
        <p className={`text-primary-foreground/80 mb-5 leading-relaxed ${size === 'large' ? 'text-base' : 'text-sm'}`}>
          {description}
        </p>

        {/* Key Wins with Icons */}
        <div className="space-y-2.5 mt-2">
          {highlights.slice(0, 3).map((highlight, index) => {
            const IconComponent = highlightIcons[index % highlightIcons.length];
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <IconComponent size={12} className="text-accent" />
                </div>
                <span className={`text-primary-foreground/90 ${size === 'large' ? 'text-sm' : 'text-xs'}`}>{highlight}</span>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Footer */}
        {techStack && techStack.length > 0 && (
          <div className="mt-6 pt-4 border-t border-primary-foreground/20">
            <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="text-xs px-3 py-1.5 rounded-full bg-background/20 text-primary-foreground/90 backdrop-blur-sm"
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
