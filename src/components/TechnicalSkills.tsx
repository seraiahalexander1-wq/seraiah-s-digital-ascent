import { Sparkles, Database, Search, Mail, FileText } from "lucide-react";

const skills = [
  {
    icon: <Sparkles size={22} />,
    name: "AI-Native Workflows",
    tools: "Cursor, Gemini, Claude",
  },
  {
    icon: <Database size={22} />,
    name: "Backend & Data",
    tools: "Supabase, PostgreSQL",
  },
  {
    icon: <Search size={22} />,
    name: "SEO & SEM",
    tools: "Ahrefs, Semrush, GSC",
  },
  {
    icon: <Mail size={22} />,
    name: "Lifecycle Marketing",
    tools: "Email, SMS, Klaviyo",
  },
  {
    icon: <FileText size={22} />,
    name: "Technical Writing",
    tools: "Documentation, APIs",
  },
];

const TechnicalSkills = () => {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-medium tracking-widest uppercase mb-4 block">Expertise</span>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary mb-6">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A modern toolkit for building and scaling digital products.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-6 text-center hover:border-accent/40 hover:shadow-organic transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-accent mx-auto mb-4 group-hover:bg-accent/10 transition-colors duration-300">
                {skill.icon}
              </div>
              <h3 className="font-serif text-sm font-medium text-primary mb-2">{skill.name}</h3>
              <p className="text-xs text-muted-foreground">{skill.tools}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
