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
            <span className="text-sm text-muted-foreground">{tagline}</span>
          </div>

          <span className="text-sm text-muted-foreground order-last md:order-none">{bodyText}</span>

          <a
            href="https://www.linkedin.com/in/seraiahalexander"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
