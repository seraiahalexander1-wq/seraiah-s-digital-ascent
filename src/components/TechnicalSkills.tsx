import { Sparkles, Database, Search, Mail, FileText, LucideIcon } from "lucide-react";
import { usePortfolioSection } from "@/hooks/usePortfolioContent";

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  database: Database,
  search: Search,
  mail: Mail,
  "file-text": FileText,
};

interface Skill {
  name: string;
  tools: string;
  icon: string;
}

const defaultSkills: Skill[] = [
  { icon: "sparkles", name: "AI-Native Workflows", tools: "Cursor, Gemini, Claude" },
  { icon: "database", name: "Backend & Data", tools: "Supabase, PostgreSQL" },
  { icon: "search", name: "SEO & SEM", tools: "Ahrefs, Semrush, GSC" },
  { icon: "mail", name: "Lifecycle Marketing", tools: "Email, SMS, Klaviyo" },
  { icon: "file-text", name: "Technical Writing", tools: "Documentation, APIs" },
];

const TechnicalSkills = () => {
  const { data: skillsContent } = usePortfolioSection("technical_skills");

  const label = skillsContent?.metadata?.label || "Expertise";
  const headline = skillsContent?.headline || "Technical Skills";
  const bodyText = skillsContent?.body_text || "A modern toolkit for building and scaling digital products.";
  const skills: Skill[] = skillsContent?.metadata?.skills || defaultSkills;

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">{label}</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary mb-6">{headline}</h2>
          <div 
            className="text-muted-foreground max-w-2xl mx-auto text-lg prose prose-p:m-0"
            dangerouslySetInnerHTML={{ __html: bodyText }}
          />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Sparkles;
            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/40 hover:shadow-organic transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent mx-auto mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                  <IconComponent size={22} />
                </div>
                <h3 className="font-serif text-sm font-medium text-primary mb-2">{skill.name}</h3>
                <p className="text-xs text-muted-foreground">{skill.tools}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
