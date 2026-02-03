import { usePortfolioSection } from "@/hooks/usePortfolioContent";

interface QuickStat {
  label: string;
  value: string;
}

const AboutMe = () => {
  const { data: aboutContent, isLoading } = usePortfolioSection("about_me");

  const headline = aboutContent?.headline || "Strategist, Builder, and Occasional Forager.";
  const bodyText = aboutContent?.body_text || "";
  const imageUrl = aboutContent?.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop";
  
  const quickStats: QuickStat[] = (aboutContent?.metadata as { quick_stats?: QuickStat[] })?.quick_stats || [
    { label: "Current Focus", value: "Building ClassOptic / Scaling Wellness Brands" },
    { label: "Field Work", value: "Mycology & Foraging (Santa Cruz)" },
    { label: "Training", value: "Squat & Bench focus" },
    { label: "Travel", value: "16+ countries" },
  ];

  // Split body text into paragraphs
  const paragraphs = bodyText.split('\n\n').filter(Boolean);

  if (isLoading) {
    return (
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="animate-pulse flex flex-col lg:flex-row gap-12 lg:gap-16">
            <div className="lg:w-5/12 h-[500px] bg-muted rounded-2xl" />
            <div className="lg:w-7/12 space-y-4">
              <div className="h-10 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* Left Column - Image */}
          <div className="w-full lg:w-5/12">
            <div className="relative">
              <div 
                className="w-full aspect-[3/4] rounded-2xl bg-cover bg-center shadow-organic"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-accent/30 -z-10" />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="w-full lg:w-7/12 space-y-8">
            {/* Headline */}
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-primary leading-tight">
              {headline}
            </h2>

            {/* Bio Paragraphs */}
            <div className="space-y-6">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg text-foreground/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {bodyText}
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="pt-6">
              <div className="border-l-2 border-accent pl-6 space-y-4">
                <h3 className="font-serif text-xl text-primary font-medium mb-4">
                  Quick Stats
                </h3>
                <ul className="space-y-3">
                  {quickStats.map((stat, index) => (
                    <li key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                      <span className="text-sm font-medium text-accent uppercase tracking-wide">
                        {stat.label}:
                      </span>
                      <span className="text-foreground/80">
                        {stat.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
