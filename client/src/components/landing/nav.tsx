import { useState, useEffect } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("final-cta")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "benefits", label: "Benefits" },
    { href: "solution", label: "Solution" },
    { href: "how-it-works", label: "How We Work" },
    { href: "why-us", label: "Why Us" },
    { href: "faq", label: "FAQ" },
    { href: "contact", label: "Contact Us" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-white/80 backdrop-blur-md border-b border-gray-100"
      }`}
      data-testid="navigation"
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-semibold text-charcoal">Healio</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-charcoal hover:text-primary-teal transition-colors duration-200"
                data-testid={`nav-link-${link.href}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={scrollToForm}
              className="bg-accent-coral text-white hover:bg-accent-coral/90 focus:ring-2 focus:ring-primary-teal focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
              data-testid="nav-cta-button"
            >
              Join the Waitlist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4" data-testid="mobile-menu">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-charcoal hover:text-primary-teal transition-colors duration-200 text-left"
                  data-testid={`mobile-nav-link-${link.href}`}
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={scrollToForm}
                className="bg-accent-coral text-white hover:bg-accent-coral/90 self-start"
                data-testid="mobile-nav-cta-button"
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
