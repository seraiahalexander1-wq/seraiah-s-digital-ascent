const brands = [
  { name: "NCAA", initials: "NCAA" },
  { name: "Etsy", initials: "Etsy" },
  { name: "Shroomer", initials: "Shroomer" },
  { name: "Santa Cruz County Schools", initials: "SCCS" },
];

const BrandCarousel = () => {
  return (
    <section className="py-16 border-b border-border">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-widest mb-10">
          Trusted By Industry Leaders
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex items-center justify-center px-6 py-4 rounded-lg transition-all duration-300 hover:bg-secondary"
            >
              <span className="font-serif text-xl md:text-2xl font-medium text-primary/40 group-hover:text-primary transition-colors duration-300 tracking-wide">
                {brand.initials}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
