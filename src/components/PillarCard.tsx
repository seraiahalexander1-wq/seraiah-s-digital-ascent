import { ReactNode } from "react";

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  highlights: string[];
  metric: string;
  metricLabel: string;
  imageUrl: string;
  size?: "large" | "medium" | "small";
}

const PillarCard = ({ 
  title, 
  description, 
  highlights, 
  metric, 
  metricLabel, 
  imageUrl,
  size = "medium" 
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
        {/* Metric Badge */}
        <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-organic">
          <span className="font-serif text-lg font-medium text-primary">{metric}</span>
          <span className="text-sm text-muted-foreground ml-1">{metricLabel}</span>
        </div>

        <h3 className={`font-serif text-primary-foreground mb-3 ${size === 'large' ? 'text-3xl' : 'text-xl'}`}>
          {title}
        </h3>
        
        <p className={`text-primary-foreground/80 mb-4 leading-relaxed ${size === 'large' ? 'text-base' : 'text-sm'}`}>
          {description}
        </p>

        {size === 'large' && (
          <div className="space-y-2 mt-2">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span className="text-sm text-primary-foreground/70">{highlight}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PillarCard;
