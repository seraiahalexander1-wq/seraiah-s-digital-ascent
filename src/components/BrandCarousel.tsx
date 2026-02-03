import { usePortfolioSection } from "@/hooks/usePortfolioContent";

const BrandCarousel = () => {
  const { data: brandsContent } = usePortfolioSection("brands");

  const headline = brandsContent?.headline || "Trusted By Industry Leaders";
  const brands = brandsContent?.metadata?.brands || ["NCAA", "Etsy", "Shroomer", "SCCS"];

  return (
    <section className="py-16 border-b border-border">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-widest mb-10">
          {headline}
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand: string) => (
            <div
              key={brand}
              className="group flex items-center justify-center px-6 py-4 rounded-lg transition-all duration-300 hover:bg-secondary"
            >
              <span className="font-serif text-xl md:text-2xl font-medium text-primary/40 group-hover:text-primary transition-colors duration-300 tracking-wide">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
