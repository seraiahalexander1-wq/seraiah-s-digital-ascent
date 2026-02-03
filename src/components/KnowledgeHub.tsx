import { useState } from "react";
import ArticleCard from "./ArticleCard";

const categories = [
  "All",
  "Metabolic Health",
  "Education Strategy",
  "SEO & Growth",
  "Compliance",
];

const articles = [
  {
    title: "The Science of Metabolic Flexibility",
    summary: "How understanding metabolic adaptation can transform supplement marketing and consumer trust.",
    tags: ["Metabolic Health", "SEO & Growth"],
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop",
    articleUrl: "#metabolic-flexibility",
  },
  {
    title: "NCAA NIL Compliance: A Content Strategy Framework",
    summary: "Navigating the complex landscape of Name, Image, and Likeness regulations through clear communication.",
    tags: ["Compliance", "Education Strategy"],
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop",
    articleUrl: "#ncaa-nil-compliance",
  },
  {
    title: "Building AI-Native SaaS: Lessons from ClassOptic",
    summary: "From concept to MVP using Cursor, React, and Supabase—a founder's technical journey.",
    tags: ["SEO & Growth"],
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop",
    articleUrl: "#ai-native-saas",
  },
  {
    title: "Data-Driven Content for EdTech Platforms",
    summary: "How ZenEducate transformed complex educational metrics into actionable insights for schools.",
    tags: ["Education Strategy"],
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&auto=format&fit=crop",
    articleUrl: "#edtech-content",
  },
  {
    title: "The 22k Subscriber Playbook",
    summary: "A deep dive into the organic growth strategies that scaled Shroomer from zero to engaged community.",
    tags: ["SEO & Growth", "Metabolic Health"],
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop",
    articleUrl: "#subscriber-playbook",
  },
  {
    title: "Regulatory Communication in Wellness Brands",
    summary: "Balancing FDA compliance with compelling storytelling in the supplement industry.",
    tags: ["Compliance", "Metabolic Health"],
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&auto=format&fit=crop",
    articleUrl: "#regulatory-communication",
  },
];

const KnowledgeHub = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredArticles = activeFilter === "All"
    ? articles
    : articles.filter((article) => article.tags.includes(activeFilter));

  return (
    <section id="gallery" className="py-32 bg-secondary/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">Insights</span>
          <h2 className="font-serif text-5xl md:text-6xl font-semibold text-primary mb-8">Knowledge Hub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Insights, case studies, and strategic thinking across industries.
          </p>
        </div>

        {/* Filter Bar - Enhanced Visibility */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                activeFilter === category
                  ? "bg-accent text-accent-foreground shadow-organic"
                  : "bg-card border-2 border-border text-muted-foreground hover:text-primary hover:border-accent/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredArticles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No articles found for this category.
          </p>
        )}
      </div>
    </section>
  );
};

export default KnowledgeHub;
