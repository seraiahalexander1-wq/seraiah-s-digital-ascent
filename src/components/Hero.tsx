import { ArrowDown } from "lucide-react";
import { usePortfolioSection } from "@/hooks/usePortfolioContent";

const Hero = () => {
  const { data: heroContent, isLoading } = usePortfolioSection("hero");

  // Fallback content while loading or if no data
  const headline = heroContent?.headline || "Digital Strategy & Growth for High-Stakes Brands";
  const bodyText = heroContent?.body_text || "Scaling audiences to 22k+, building AI-native SaaS solutions, and translating complex data into science-backed narratives.";
  const badge = heroContent?.metadata?.badge || "Available for Strategic Projects";
  const ctaLink = heroContent?.cta_link || "#pillars";
  const ctaText = heroContent?.cta_text || "View My Work";
  const secondaryCta = heroContent?.metadata?.secondary_cta || "#contact";
  const secondaryCtaText = heroContent?.metadata?.secondary_cta_text || "Get in Touch";

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Soft Organic Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Decorative botanical element */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Editorial Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary border border-border mb-12">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground font-medium tracking-wide">{badge}</span>
          </div>

          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-10 leading-[1.1] text-gradient">
            {headline}
          </h1>

          <div 
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-16 leading-relaxed font-light
              prose prose-lg max-w-none
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:m-0"
            dangerouslySetInnerHTML={{ __html: bodyText }}
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href={ctaLink}
              className="group px-10 py-5 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-organic hover:shadow-card-hover text-lg"
            >
              {ctaText}
            </a>
            <a
              href={secondaryCta}
              className="px-10 py-5 border-2 border-border text-foreground font-semibold rounded-full hover:bg-secondary transition-all duration-300 text-lg"
            >
              {secondaryCtaText}
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-12 right-6 animate-bounce cursor-pointer z-0"
          aria-label="Scroll to next section"
        >
          <div className="p-3 rounded-full bg-secondary border border-border hover:bg-accent/10 transition-colors">
            <ArrowDown className="text-muted-foreground" size={20} />
          </div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
