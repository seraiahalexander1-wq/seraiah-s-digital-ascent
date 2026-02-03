import { useState } from "react";
import ArticleCard from "./ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { usePortfolioSection } from "@/hooks/usePortfolioContent";
const categories = ["All", "Metabolic Health", "Education Strategy", "SEO & Growth", "Compliance"];
const KnowledgeHub = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const {
    data: articles,
    isLoading
  } = useArticles(true);
  const {
    data: headerContent
  } = usePortfolioSection("knowledge_header");
  const label = headerContent?.metadata?.label || "Insights";
  const headline = headerContent?.headline || "Knowledge Hub";
  const bodyText = headerContent?.body_text || "Insights, case studies, and strategic thinking across industries.";
  const filteredArticles = activeFilter === "All" ? articles : articles?.filter(article => article.tags.includes(activeFilter as any));
  return <section id="gallery" className="py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-8">{headline}</h2>
          <div className="text-muted-foreground max-w-2xl mx-auto text-lg prose prose-p:m-0" dangerouslySetInnerHTML={{
          __html: bodyText
        }} />
        </div>

        {/* Filter Bar - Enhanced Visibility */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(category => <button key={category} onClick={() => setActiveFilter(category)} className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${activeFilter === category ? "bg-accent text-accent-foreground shadow-organic" : "bg-card border-2 border-border text-muted-foreground hover:text-primary hover:border-accent/50"}`}>
              {category}
            </button>)}
        </div>

        {/* Articles Grid */}
        {isLoading ? <div className="flex justify-center py-12">
            <div className="animate-pulse text-muted-foreground">Loading articles...</div>
          </div> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredArticles?.map(article => <ArticleCard key={article.id} title={article.title} summary={article.summary} tags={article.tags} imageUrl={article.image_url} articleUrl={article.article_url || "#"} readTime={article.read_time} />)}
          </div>}

        {filteredArticles?.length === 0 && !isLoading && <p className="text-center text-muted-foreground py-12">
            No articles found for this category.
          </p>}
      </div>
    </section>;
};
export default KnowledgeHub;