import { ArrowUpRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  summary: string;
  tags: string[];
  readTime?: string;
}

const ArticleCard = ({ title, summary, tags, readTime = "5 min read" }: ArticleCardProps) => {
  return (
    <article className="group bg-card border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300 hover:shadow-card cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <ArrowUpRight 
          size={18} 
          className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" 
        />
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
        {title}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {summary}
      </p>

      <span className="text-xs text-muted-foreground">{readTime}</span>
    </article>
  );
};

export default ArticleCard;
