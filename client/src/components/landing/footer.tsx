import Container from "@/components/ui/container";
import { content } from "@/lib/content";

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
    { href: "problem", label: "Problem" },
    { href: "benefits", label: "Benefits" },
    { href: "solution", label: "Solution" },
    { href: "faq", label: "FAQ" },
  ];

  const legalLinks = [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms of Service" },
    { href: "#contact", label: "Contact Us", onClick: () => scrollToSection("contact") },
  ];

  return (
    <footer className="bg-charcoal text-gray-300 py-12" data-testid="footer">
      <Container>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-semibold text-white" data-testid="footer-logo">
                {content.footer.companyName}
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md" data-testid="footer-description">
              {content.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-primary-teal transition-colors duration-200"
                    data-testid={`footer-link-${link.href}`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault();
                        link.onClick();
                      }
                    }}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
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
