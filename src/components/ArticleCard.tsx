import { ArrowUpRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  summary: string;
  tags: string[];
  readTime?: string;
  imageUrl: string;
  articleUrl?: string;
}

const ArticleCard = ({ title, summary, tags, readTime = "5 min read", imageUrl, articleUrl = "#" }: ArticleCardProps) => {
  return (
    <a 
      href={articleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <article className="relative bg-card rounded-2xl overflow-hidden shadow-organic hover:shadow-card-hover transition-all duration-500">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
          
          {/* Tags Overlay - More Visible */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-4 py-2 rounded-full bg-accent text-accent-foreground font-semibold uppercase tracking-wide shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Arrow Icon */}
          <div className="absolute top-4 right-4 p-3 rounded-full bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <ArrowUpRight size={18} className="text-primary" />
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-serif text-2xl font-semibold text-primary-foreground mb-2 leading-snug">
              {title}
            </h3>
            <span className="text-xs text-primary-foreground/70">{readTime}</span>
          </div>
        </div>

        {/* Summary */}
        <div className="p-6 pt-4">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {summary}
          </p>
        </div>
      </article>
    </a>
  );
};

export default ArticleCard;
