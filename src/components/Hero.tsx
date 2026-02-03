import { ArrowDown } from "lucide-react";

const Hero = () => {
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
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-secondary border border-border mb-10">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-sm text-muted-foreground font-medium tracking-wide">Available for Strategic Projects</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-primary mb-8 leading-[1.1]">
            Digital Strategy & Growth
            <br />
            <span className="text-gradient italic">for High-Stakes Brands</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed font-light">
            Scaling audiences to 22k+, building AI-native SaaS solutions, and translating complex data into science-backed narratives.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pillars"
              className="group px-8 py-4 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all duration-300 shadow-organic hover:shadow-card-hover"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-secondary transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="p-3 rounded-full bg-secondary border border-border">
            <ArrowDown className="text-muted-foreground" size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
