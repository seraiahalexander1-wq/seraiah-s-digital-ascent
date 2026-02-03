import { usePortfolioSection } from "@/hooks/usePortfolioContent";

const AboutMe = () => {
  const { data: aboutContent, isLoading } = usePortfolioSection("about_me");

  const headline = aboutContent?.headline || "Strategist, Builder, and Occasional Forager.";
  const bodyText = aboutContent?.body_text || "";
  const imageUrl = aboutContent?.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop";

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

            {/* Bio Content */}
            <div 
              className="prose prose-lg max-w-none text-foreground/80 leading-relaxed
                prose-p:text-foreground/80 prose-p:leading-relaxed
                prose-strong:text-foreground prose-strong:font-semibold
                prose-em:text-foreground/80
                prose-ul:text-foreground/80 prose-ol:text-foreground/80
                prose-li:text-foreground/80"
              dangerouslySetInnerHTML={{ __html: bodyText }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
