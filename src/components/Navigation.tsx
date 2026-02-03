import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePortfolioSection } from "@/hooks/usePortfolioContent";

interface NavLink {
  href: string;
  label: string;
}

const defaultNavLinks: NavLink[] = [
  { href: "#about", label: "About Me" },
  { href: "#pillars", label: "Growth & Strategy" },
  { href: "#gallery", label: "Content Gallery" },
  { href: "#projects", label: "Technical Projects" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: navContent } = usePortfolioSection("navigation");

  const siteName = navContent?.metadata?.site_name || "Seraiah";
  const navLinks: NavLink[] = navContent?.metadata?.nav_links || defaultNavLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="font-serif text-2xl font-medium tracking-tight text-primary">
            {siteName}<span className="text-accent">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-border mt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-3 text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
