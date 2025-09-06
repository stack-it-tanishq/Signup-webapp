import { useState, useEffect } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { handleSmoothScroll } from "@/utils/smooth-scroll";

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

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    handleSmoothScroll(e, 80);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#why-us", label: "Why Us" },
    { href: "#nutrition", label: "Benefits" },
    { href: "#how-it-works", label: "How We Work" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact Us" },
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
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavigation}
                className="text-charcoal hover:text-primary-teal transition-colors duration-200"
                data-testid={`nav-link-${link.href.replace('#', '')}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#final-cta"
              onClick={handleNavigation}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-accent-coral rounded-md hover:bg-accent-coral/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-teal"
              data-testid="nav-cta-button"
            >
              Join the Waitlist
            </a>
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
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavigation}
                  className="text-charcoal hover:text-primary-teal transition-colors duration-200 px-4 py-2 text-left"
                  data-testid={`mobile-nav-link-${link.href.replace('#', '')}`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#final-cta"
                onClick={handleNavigation}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-accent-coral rounded-md hover:bg-accent-coral/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-teal self-start mx-4"
                data-testid="mobile-nav-cta-button"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
