import { Sparkles, Database, Search, Mail, FileText } from "lucide-react";

const skills = [
  {
    icon: <Sparkles size={20} />,
    label: "AI-Native Workflows",
    tools: "Cursor, Gemini, Claude",
  },
  {
    icon: <Database size={20} />,
    label: "Backend & Database",
    tools: "Supabase, PostgreSQL",
  },
  {
    icon: <Search size={20} />,
    label: "SEO & SEM",
    tools: "Technical SEO, Content Strategy",
  },
  {
    icon: <Mail size={20} />,
    label: "Lifecycle Marketing",
    tools: "Email, SMS, Automation",
  },
  {
    icon: <FileText size={20} />,
    label: "Technical Writing",
    tools: "Documentation, API Guides",
  },
];

const TechnicalSkills = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Technical Stack</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Modern tools and workflows for building and scaling digital products.
          </p>
        </div>

        {/* Skills Horizontal Scroll */}
        <div className="relative">
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x snap-mandatory">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 snap-start bg-card border border-border rounded-xl p-6 min-w-[280px] hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{skill.label}</h3>
                <p className="text-sm text-muted-foreground">{skill.tools}</p>
              </div>
            ))}
          </div>

          {/* Fade Edges */}
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
