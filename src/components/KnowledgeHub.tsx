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
  },
  {
    title: "NCAA NIL Compliance: A Content Strategy Framework",
    summary: "Navigating the complex landscape of Name, Image, and Likeness regulations through clear communication.",
    tags: ["Compliance", "Education Strategy"],
  },
  {
    title: "Building AI-Native SaaS: Lessons from ClassOptic",
    summary: "From concept to MVP using Cursor, React, and Supabase—a founder's technical journey.",
    tags: ["SEO & Growth"],
  },
  {
    title: "Data-Driven Content for EdTech Platforms",
    summary: "How ZenEducate transformed complex educational metrics into actionable insights for schools.",
    tags: ["Education Strategy"],
  },
  {
    title: "The 22k Subscriber Playbook",
    summary: "A deep dive into the organic growth strategies that scaled Shroomer from zero to engaged community.",
    tags: ["SEO & Growth", "Metabolic Health"],
  },
  {
    title: "Regulatory Communication in Wellness Brands",
    summary: "Balancing FDA compliance with compelling storytelling in the supplement industry.",
    tags: ["Compliance", "Metabolic Health"],
  },
];

const KnowledgeHub = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredArticles = activeFilter === "All"
    ? articles
    : articles.filter((article) => article.tags.includes(activeFilter));

  return (
    <section id="gallery" className="py-24 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Knowledge Hub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, case studies, and strategic thinking across industries.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === category
                  ? "bg-accent text-accent-foreground shadow-glow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-accent/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
