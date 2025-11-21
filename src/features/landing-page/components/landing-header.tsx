import { useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Caravan } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";

interface NavigationItem {
  key: string;
  href: string;
}

function LandingHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLoggedIn = useMemo(() => !!localStorage.getItem("token"), []);

  const NAVIGATION_ITEMS: NavigationItem[] = [
    { key: "common.home", href: "/" },
    { key: "common.about", href: "#about" },
    { key: "common.services", href: "#services" },
    { key: "common.pricing", href: "#pricing" },
    { key: "common.contact", href: "#contact" },
  ];

  const handleNavClick = useCallback(
    (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
      e?.preventDefault();
      if (href.startsWith("#")) {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(href);
      }
      setIsMenuOpen(false);
    },
    [navigate]
  );

  const handleScrollToTop = useCallback(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
    window.location.reload();
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <header className={cn("shadow-md sticky top-0 z-50 bg-[var(--color-cream)] border-b border-[rgba(143,171,212,0.2)]")}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className={cn("flex items-center justify-center")}>
              <Caravan className="h-8 w-8 text-[var(--color-dark-blue)]" />
            </div>
            <span className={cn("text-2xl font-bold text-[var(--color-dark-blue)]")}>
              Digi Transport
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex md:items-center md:space-x-1" aria-label="Main navigation">
            {NAVIGATION_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors duration-200 relative group",
                  "text-[var(--color-dark-blue)] hover:text-[rgba(74,112,169,0.8)]"
                )}
                aria-label={t(item.key)}
              >
                {t(item.key)}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full bg-[var(--color-dark-blue)]"
                  )}
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <LanguageToggle />
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-[var(--color-dark-blue)] hover:text-[rgba(74,112,169,0.8)]"
              >
                {t("common.logout")}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  className="bg-[var(--color-black)] text-white hover:bg-[rgba(0,0,0,0.9)]"
                  aria-label={t("common.signIn")}
                >
                  {t("common.signIn")}
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
                  aria-label={t("common.signUp")}
                >
                  {t("common.signUp")}
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="icon"
              className="text-[var(--color-dark-blue)] hover:text-[rgba(74,112,169,0.8)] hover:bg-[rgba(143,171,212,0.2)]"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">{isMenuOpen ? "Close" : "Open"} main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6 text-[var(--color-dark-blue)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6 text-[var(--color-dark-blue)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[rgba(143,171,212,0.2)]" role="dialog" aria-modal="true">
            <nav className="px-2 pt-2 pb-3 space-y-1" aria-label="Mobile navigation">
              {NAVIGATION_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    "text-[var(--color-dark-blue)] hover:text-[rgba(74,112,169,0.8)] hover:bg-[rgba(143,171,212,0.2)]"
                  )}
                  aria-label={t(item.key)}
                >
                  {t(item.key)}
                </a>
              ))}
              <div className={cn("pt-4 pb-3 space-y-1 border-t border-[rgba(143,171,212,0.2)]")}>
                <div className="px-3 pb-2">
                  <LanguageToggle />
                </div>
                {isLoggedIn ? (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="w-full justify-start text-[var(--color-dark-blue)] hover:text-[rgba(74,112,169,0.8)] hover:bg-[rgba(143,171,212,0.2)]"
                  >
                    {t("common.logout")}
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start bg-[var(--color-black)] text-white hover:bg-[rgba(0,0,0,0.9)]"
                      aria-label={t("common.signIn")}
                    >
                      {t("common.signIn")}
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/register");
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-[var(--color-dark-blue)] text-white hover:bg-[rgba(74,112,169,0.9)]"
                      aria-label={t("common.signUp")}
                    >
                      {t("common.signUp")}
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}

export default LandingHeader;
