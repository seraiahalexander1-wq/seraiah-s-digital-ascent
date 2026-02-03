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
  index?: number;
  totalCards?: number;
}

const highlightIcons = [Zap, TrendingUp, Target, CheckCircle];

// Dynamic bento patterns based on total card count
const getBentoClasses = (index: number, totalCards: number, size: string): string => {
  // For 3 cards: first one large (2 cols), other two side by side
  if (totalCards === 3) {
    if (index === 0) return "md:col-span-2 md:row-span-1";
    return "md:col-span-1 md:row-span-1";
  }
  
  // For 4 cards: 2x2 grid, all equal
  if (totalCards === 4) {
    return "md:col-span-1 md:row-span-1";
  }
  
  // For 5 cards: first large, rest fill in
  if (totalCards === 5) {
    if (index === 0) return "md:col-span-2 md:row-span-1";
    return "md:col-span-1 md:row-span-1";
  }
  
  // For 6+ cards: alternating pattern
  if (totalCards >= 6) {
    // Every 5th card (0, 5, 10...) spans 2 columns
    if (index % 5 === 0) return "md:col-span-2 md:row-span-1";
    return "md:col-span-1 md:row-span-1";
  }
  
  // Default: respect the size prop
  if (size === "large") return "md:col-span-2 md:row-span-1";
  return "md:col-span-1 md:row-span-1";
};

const PillarCard = ({ 
  title, 
  description, 
  highlights, 
  imageUrl,
  size = "medium",
  techStack,
  index = 0,
  totalCards = 1
}: PillarCardProps) => {
  const bentoClasses = getBentoClasses(index, totalCards, size);
  const isLarge = bentoClasses.includes("col-span-2");

  return (
    <div className={`group relative bg-card border border-border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-card-hover ${bentoClasses}`}>
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/30" />
      
      {/* Content */}
      <div className={`relative z-10 h-full flex flex-col justify-end ${isLarge ? 'p-8' : 'p-5'}`}>
        <h3 className={`font-serif text-primary-foreground mb-2 font-semibold ${isLarge ? 'text-3xl' : 'text-xl'}`}>
          {title}
        </h3>
        
        <p className={`text-primary-foreground/80 mb-4 leading-relaxed line-clamp-2 ${isLarge ? 'text-base' : 'text-sm'}`}>
          {description}
        </p>

        {/* Key Wins with Icons - show fewer on small cards */}
        <div className="space-y-2">
          {highlights.slice(0, isLarge ? 3 : 2).map((highlight, idx) => {
            const IconComponent = highlightIcons[idx % highlightIcons.length];
            return (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                  <IconComponent size={10} className="text-accent" />
                </div>
                <span className={`text-primary-foreground/90 line-clamp-1 ${isLarge ? 'text-sm' : 'text-xs'}`}>{highlight}</span>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Footer - only show on larger cards */}
        {techStack && techStack.length > 0 && isLarge && (
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
