import Container from "@/components/ui/container";
import { content } from "@/lib/content";
import { Link } from "wouter";
import { smoothScrollTo } from "@/utils/smooth-scroll";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  const quickLinks = [
    { href: "#problem", label: "Problem" },
    { href: "#nutrition", label: "Benefits" },
    { href: "#hero", label: "Solution" },
    { href: "#faq", label: "FAQ" },
  ];

  const handleFooterClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollTo(id, 80);
  };

  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
    { href: "#contact", label: "Contact Us", onClick: () => scrollToSection("contact") },
  ];

  return (
    <footer className="bg-charcoal text-gray-300 py-12" data-testid="footer">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo.png" 
                alt="Healio Logo" 
                className="h-12 w-auto"
                data-testid="footer-logo"
              />
            </div>
            <p className="text-gray-400 mb-4 max-w-md" data-testid="footer-description">
              {content.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const id = link.href.replace('#', '');
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      onClick={(e) => handleFooterClick(e, id)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={link.onClick}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400" data-testid="footer-copyright">
            &copy; 2025 {content.footer.companyName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
