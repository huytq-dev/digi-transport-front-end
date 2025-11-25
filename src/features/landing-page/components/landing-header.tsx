import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Caravan, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";
import { AnimatedText } from "@/components/animated-text";

interface NavigationItem {
  key: string;
  href: string;
}

// Constants
const SCROLL_THRESHOLD = 50;
const VIEWPORT_TOP_OFFSET = 150;
const VIEWPORT_BOTTOM_OFFSET = 100;
const BOTTOM_THRESHOLD = 200;
const ANIMATION_DURATION = 0.2;
const CLICK_TIMEOUT = 1500;

const NAVIGATION_ITEMS: NavigationItem[] = [
  { key: "header.about", href: "#about" },
  { key: "header.bookingGuide", href: "#booking-guide" },
  { key: "header.forPartners", href: "#pricing" },
  { key: "header.contact", href: "#contact" },
] as const;

function LandingHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("");
  // Initialize isScrolled to false to avoid hydration mismatch
  // Will be updated in useEffect after mount
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionsCacheRef = useRef<Map<string, Element>>(new Map());
  // Ref để chặn sự kiện scroll khi đang click menu
  const isClickingRef = useRef(false);
  // Ref để lưu timeout ID để có thể clear khi click item mới
  const clickingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isLoggedIn = useMemo(() => !!localStorage.getItem("token"), []);

  // Use framer-motion's useScroll hook for better scroll detection
  const { scrollY } = useScroll();

  // Cache section elements to avoid repeated queries
  const getSectionElements = useCallback(() => {
    const sections: Array<{ href: string; top: number; bottom: number }> = [];

    NAVIGATION_ITEMS.forEach((item) => {
      if (item.href.startsWith("#")) {
        let element = sectionsCacheRef.current.get(item.href);
        if (!element) {
          const foundElement = document.querySelector(item.href);
          if (foundElement) {
            sectionsCacheRef.current.set(item.href, foundElement);
            element = foundElement;
          }
        }

        if (element) {
          const rect = element.getBoundingClientRect();
          sections.push({
            href: item.href,
            top: rect.top,
            bottom: rect.bottom,
          });
        }
      }
    });

    return sections;
  }, []);

  // Optimized scroll detection with performance improvements
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);

    // Skip active nav calculation if clicking navigation
    if (isClickingRef.current) return;

    const sections = getSectionElements();
    if (latest < SCROLL_THRESHOLD || sections.length === 0) {
      setActiveNav("");
      return;
    }

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = latest + windowHeight;

    // Check if near bottom (for contact section) - early return for better performance
    if (scrollPosition >= documentHeight - BOTTOM_THRESHOLD) {
      const contactSection = sections.find((s) => s.href === "#contact");
      if (contactSection) {
        setActiveNav("#contact");
        return;
      }
    }

    // Find section in viewport
    const viewportTop = VIEWPORT_TOP_OFFSET;
    const viewportBottom = windowHeight - VIEWPORT_BOTTOM_OFFSET;

    // Optimize: use for loop instead of find for better performance
    let currentSection: { href: string; top: number; bottom: number } | undefined;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (section.top <= viewportBottom && section.bottom >= viewportTop) {
        currentSection = section;
        break;
      }
    }

    if (currentSection) {
      setActiveNav(currentSection.href);
      return;
    }

    // Find closest section above viewport - optimized with single pass
    let closestAbove: { href: string; top: number; bottom: number } | undefined;
    let maxTop = -Infinity;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (section.top < viewportTop && section.top > maxTop) {
        maxTop = section.top;
        closestAbove = section;
      }
    }

    if (closestAbove) {
      setActiveNav(closestAbove.href);
      return;
    }

    // Fallback: find last section below viewport - optimized with single pass
    let lastBelow: { href: string; top: number; bottom: number } | undefined;
    let maxTopBelow = -Infinity;
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (section.top < viewportBottom && section.top > maxTopBelow) {
        maxTopBelow = section.top;
        lastBelow = section;
      }
    }

    if (lastBelow) {
      setActiveNav(lastBelow.href);
    }
  });

  const handleNavClick = useCallback(
    (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
      e?.preventDefault();

      // Clear previous timeout
      if (clickingTimeoutRef.current) {
        clearTimeout(clickingTimeoutRef.current);
        clickingTimeoutRef.current = null;
      }

      setActiveNav(href);
      isClickingRef.current = true;
      setIsMenuOpen(false);

      if (href.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          sectionsCacheRef.current.set(href, element);
          element.scrollIntoView({ behavior: "smooth" });
          clickingTimeoutRef.current = setTimeout(() => {
            isClickingRef.current = false;
            clickingTimeoutRef.current = null;
          }, CLICK_TIMEOUT);
        } else {
          isClickingRef.current = false;
        }
      } else {
        navigate(href);
        isClickingRef.current = false;
      }
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

  // Sync scroll position on mount to prevent flash
  // Only runs on client side after mount to avoid hydration mismatch
  useEffect(() => {
    const checkScrollPosition = () => {
      if (typeof window !== "undefined") {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      }
    };

    // Check immediately after mount
    checkScrollPosition();
    // Also check after a short delay to catch any initial scroll position
    const timeoutId = setTimeout(checkScrollPosition, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle hash changes and initial state
  useEffect(() => {
    const checkHash = () => {
      if (location.hash) {
        setActiveNav(location.hash);
        // Update cache
        const element = document.querySelector(location.hash);
        if (element) {
          sectionsCacheRef.current.set(location.hash, element);
        }
      }
    };

    checkHash();
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, [location.hash]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  // Clear cache and timeout on unmount
  useEffect(() => {
    return () => {
      sectionsCacheRef.current.clear();
      if (clickingTimeoutRef.current) {
        clearTimeout(clickingTimeoutRef.current);
      }
    };
  }, []);

  // Memoize navigation items with translations
  // Add fallback to prevent showing translation keys if translation fails
  const navigationItems = useMemo(
    () =>
      NAVIGATION_ITEMS.map((item) => {
        let translation = t(item.key, { defaultValue: '' });
        
        // If translation is empty or same as key, use fallback
        if (!translation || translation === item.key) {
          // Try to get a readable label from the key
          const keyParts = item.key.split('.');
          const lastPart = keyParts[keyParts.length - 1];
          // Convert camelCase to readable text as last resort
          translation = lastPart
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
        }
        
        return {
        ...item,
          label: translation,
        };
      }),
    [t, currentLanguage]
  );

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50",
        "border-b border-white/50",
        "overflow-hidden"
      )}
      initial={false}
      animate={{
        height: isScrolled ? "4rem" : "5rem", // h-16 : h-20
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[400px] h-[400px] bg-[var(--color-dark-blue)]/20 rounded-full mix-blend-multiply filter blur-[80px]"
          animate={{
            x: [0, 80, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[10%] right-[-10%] w-[350px] h-[350px] bg-[var(--color-light-blue)]/25 rounded-full mix-blend-multiply filter blur-[80px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[-30%] left-[30%] w-[450px] h-[450px] bg-[var(--color-dark-blue)]/15 rounded-full mix-blend-multiply filter blur-[90px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Glass Overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full border-b border-white/50"
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.75)"
            : "rgba(255, 255, 255, 0.5)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(8px)",
          boxShadow: isScrolled
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* Content */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <motion.div
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 cursor-pointer"
            whileHover={{ opacity: 0.8 }}
            transition={{ duration: ANIMATION_DURATION }}
          >
            <motion.div
              initial={false}
              animate={{
                scale: isScrolled ? 0.9 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <Caravan className="h-8 w-8 text-[var(--color-dark-blue)]" />
            </motion.div>
            <motion.span
              className="text-2xl font-extrabold text-[var(--color-dark-blue)]"
              initial={false}
              animate={{
                fontSize: isScrolled ? "1.25rem" : "1.5rem",
              }}
              transition={{ duration: 0.3 }}
            >
              DigiTransport
            </motion.span>
          </motion.div>

          {/* Desktop Navigation Links */}
          <div
            className="hidden md:flex md:items-center md:space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigationItems.map((item) => {
              const isActive = activeNav === item.href;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={cn(
                    "relative px-4 py-2 text-sm rounded-full transition-colors duration-300",
                    isActive
                      ? "text-[var(--color-dark-blue)] font-bold"
                      : "text-[var(--color-dark-blue)]/70 font-semibold hover:text-[var(--color-dark-blue)]"
                  )}
                  aria-label={item.label}
                >
                  {/* Lớp kính lỏng (Liquid Glass Pill) - Chỉ hiện khi Active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavGlass"
                      className="absolute inset-0 rounded-full bg-[var(--color-dark-blue)]/10 backdrop-blur-sm border border-[var(--color-dark-blue)]/20 shadow-sm -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Label nằm đè lên trên lớp kính */}
                  <span className="relative z-10">
                    <AnimatedText>{item.label}</AnimatedText>
                  </span>
                </a>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <LanguageToggle />
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-transparent"
              >
                <AnimatedText>{t("common.logout")}</AnimatedText>
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/auth/sign-in")}
                  variant="ghost"
                  className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-transparent"
                  aria-label={t("common.signIn")}
                >
                  <AnimatedText>{t("common.signIn")}</AnimatedText>
                </Button>
                <Button
                  onClick={() => navigate("/auth/sign-up")}
                  className="rounded-full bg-[var(--color-dark-blue)] text-white font-medium shadow-sm hover:bg-[var(--color-dark-blue)]/90 hover:shadow-md transition-all duration-200"
                  aria-label={t("common.signUp")}
                >
                  <AnimatedText>{t("common.signUp")}</AnimatedText>
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
              className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-[var(--color-light-blue)]/20"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: ANIMATION_DURATION }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: ANIMATION_DURATION }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile menu with AnimatePresence */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-[var(--color-light-blue)]/20"
              role="dialog"
              aria-modal="true"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: ANIMATION_DURATION }}
            >
              <nav
                className="px-2 pt-2 pb-3 space-y-1"
                aria-label="Mobile navigation"
              >
                {navigationItems.map((item, index) => {
                  const isActive = activeNav === item.href;
                  return (
                    <motion.a
                      key={item.key}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.href, e)}
                      className={cn(
                        "block px-3 py-2 rounded-full text-base relative transition-colors duration-300",
                        isActive
                          ? "text-[var(--color-dark-blue)] font-bold"
                          : "text-[var(--color-dark-blue)]/70 font-semibold hover:text-[var(--color-dark-blue)]"
                      )}
                      aria-label={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {/* Lớp kính lỏng (Liquid Glass Pill) - Chỉ hiện khi Active */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNavGlassMobile"
                          className="absolute inset-0 rounded-full bg-[var(--color-dark-blue)]/10 backdrop-blur-sm border border-[var(--color-dark-blue)]/20 shadow-sm -z-10"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Label nằm đè lên trên lớp kính */}
                      <span className="relative z-10">
                        <AnimatedText>{item.label}</AnimatedText>
                      </span>
                    </motion.a>
                  );
                })}
                <div
                  className={cn(
                    "pt-4 pb-3 space-y-1 border-t border-[var(--color-light-blue)]/20"
                  )}
                >
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
                      className="w-full justify-start text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-[var(--color-light-blue)]/20"
                    >
                      <AnimatedText>{t("common.logout")}</AnimatedText>
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          navigate("/auth/sign-in");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-start text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-transparent"
                        aria-label={t("common.signIn")}
                      >
                        <AnimatedText>{t("common.signIn")}</AnimatedText>
                      </Button>
                      <Button
                        onClick={() => {
                          navigate("/auth/sign-up");
                          setIsMenuOpen(false);
                        }}
                        className="w-full rounded-full bg-[var(--color-dark-blue)] text-white font-medium shadow-sm hover:bg-[var(--color-dark-blue)]/90 hover:shadow-md transition-all duration-200"
                        aria-label={t("common.signUp")}
                      >
                        <AnimatedText>{t("common.signUp")}</AnimatedText>
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}

export default LandingHeader;
