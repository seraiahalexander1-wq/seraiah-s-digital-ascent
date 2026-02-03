import { usePortfolioSection } from "@/hooks/usePortfolioContent";

const Footer = () => {
  const { data: footerContent } = usePortfolioSection("footer");

  const headline = footerContent?.headline || "Seraiah Alexander";
  const tagline = footerContent?.metadata?.tagline || "Growth & Digital Strategist";
  const bodyText = footerContent?.body_text || `© ${new Date().getFullYear()} Seraiah Alexander. All rights reserved.`;

  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif text-xl font-medium text-primary">
              {headline}<span className="text-accent">.</span>
            </span>
            <p className="text-sm text-muted-foreground">{tagline}</p>
          </div>

          <p className="text-sm text-muted-foreground order-last md:order-none">{bodyText}</p>

          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
