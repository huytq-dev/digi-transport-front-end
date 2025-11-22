import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Caravan } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/language-toggle";

interface NavigationItem {
  key: string;
  href: string;
}

// Constants
const SCROLL_THRESHOLD = 100;
const VIEWPORT_TOP_OFFSET = 150;
const VIEWPORT_BOTTOM_OFFSET = 100;
const BOTTOM_THRESHOLD = 200;
const ANIMATION_DURATION = 0.2;

const NAVIGATION_ITEMS: NavigationItem[] = [
  { key: "header.about", href: "#about" },
  { key: "header.bookingGuide", href: "#booking-guide" },
  { key: "header.forPartners", href: "#for-partners" },
  { key: "header.promotions", href: "#promotions" },
  { key: "header.contact", href: "#contact" },
] as const;

function LandingHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("");
  // Initialize isScrolled based on current scroll position to prevent flash
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 50;
    }
    return false;
  });
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

  // Optimized scroll detection with throttling
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Vẫn cho phép cập nhật hiệu ứng mờ kính của Header
    setIsScrolled(latest > 50);

    // [FIX QUAN TRỌNG]: Nếu đang trong quá trình click navigation, bỏ qua TẤT CẢ logic tính toán activeNav
    if (isClickingRef.current) {
      return;
    }

    const sections = getSectionElements();
    if (latest < SCROLL_THRESHOLD || sections.length === 0) {
      if (latest < SCROLL_THRESHOLD) {
        setActiveNav("");
      }
      return;
    }

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = latest + windowHeight;

    // Check if near bottom (for contact section)
    if (scrollPosition >= documentHeight - BOTTOM_THRESHOLD) {
      const contactSection = sections.find((s) => s.href === "#contact");
      if (contactSection) {
        setActiveNav((prev) => (prev !== "#contact" ? "#contact" : prev));
        return;
      }
    }

    // Find section in viewport
    const viewportTop = VIEWPORT_TOP_OFFSET;
    const viewportBottom = windowHeight - VIEWPORT_BOTTOM_OFFSET;

    const currentSection = sections.find(
      (section) =>
        section.top <= viewportBottom && section.bottom >= viewportTop
    );

    if (currentSection) {
      setActiveNav((prev) =>
        prev !== currentSection.href ? currentSection.href : prev
      );
      return;
    }

    // Find closest section above viewport
    const sectionsAbove = sections.filter((s) => s.top < viewportTop);
    if (sectionsAbove.length > 0) {
      const closest = sectionsAbove.reduce((prev, curr) =>
        curr.top > prev.top ? curr : prev
      );
      setActiveNav((prev) => (prev !== closest.href ? closest.href : prev));
      return;
    }

    // Fallback: find last section below viewport
    const sectionsBelow = sections.filter((s) => s.top < viewportBottom);
    if (sectionsBelow.length > 0) {
      const lastSection = sectionsBelow.reduce((prev, curr) =>
        curr.top > prev.top ? curr : prev
      );
      setActiveNav((prev) =>
        prev !== lastSection.href ? lastSection.href : prev
      );
    }
  });

  const handleNavClick = useCallback(
    (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
      e?.preventDefault();
      
      // [FIX QUAN TRỌNG]: Clear timeout cũ nếu có để tránh conflict
      if (clickingTimeoutRef.current) {
        clearTimeout(clickingTimeoutRef.current);
        clickingTimeoutRef.current = null;
      }

      // Set activeNav ngay lập tức để UI phản hồi ngay
      setActiveNav(href);

      // [FIX QUAN TRỌNG]: Bật cờ báo hiệu đang click
      isClickingRef.current = true;

      if (href.startsWith("#")) {
        const element = document.querySelector(href);
        if (element) {
          sectionsCacheRef.current.set(href, element);
          element.scrollIntoView({ behavior: "smooth" });

          // [FIX QUAN TRỌNG]: Tắt cờ sau 1.5 giây (đủ để scroll xong và ổn định)
          clickingTimeoutRef.current = setTimeout(() => {
            isClickingRef.current = false;
            clickingTimeoutRef.current = null;
          }, 1500);
        } else {
          isClickingRef.current = false;
        }
      } else {
        navigate(href);
        isClickingRef.current = false;
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

  // Sync scroll position on mount to prevent flash
  useEffect(() => {
    const checkScrollPosition = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check immediately
    checkScrollPosition();

    // Also check after a short delay to ensure DOM is ready
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
  const navigationItems = useMemo(
    () =>
      NAVIGATION_ITEMS.map((item) => ({
        ...item,
        label: t(item.key),
      })),
    [t]
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
      {/* --- LIQUID GLASS BACKGROUND BLobs --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Blob 1: Dark Blue chủ đạo */}
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

        {/* Blob 2: Light Blue điểm nhấn */}
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

        {/* Blob 3: Dark Blue nhạt để cân bằng */}
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

      {/* --- NOISE TEXTURE (Optional) --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* --- GLASS OVERLAY --- */}
      <motion.div
        className="absolute inset-0 w-full h-full border-b border-white/50"
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(255, 255, 255, 0.4)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(8px)",
          boxShadow: isScrolled
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {/* --- CONTENT (Relative để hiển thị trên glass) --- */}
      <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <motion.div
          className="flex justify-between items-center h-full"
          animate={{
            height: isScrolled ? "100%" : "100%",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
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
          <nav
            className="hidden md:flex md:items-center md:space-x-1"
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
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <LanguageToggle />
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-transparent"
              >
                {t("common.logout")}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  variant="ghost"
                  className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-transparent"
                  aria-label={t("common.signIn")}
                >
                  {t("common.signIn")}
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  className="rounded-full bg-[var(--color-dark-blue)] text-white font-medium shadow-sm hover:bg-[var(--color-dark-blue)]/90 hover:shadow-md transition-all duration-200"
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
              className="text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-[var(--color-light-blue)]/20"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">
                {isMenuOpen ? "Close" : "Open"} main menu
              </span>
              <motion.svg
                className="block h-6 w-6 text-[var(--color-dark-blue)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: ANIMATION_DURATION }}
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </motion.svg>
            </Button>
          </div>
        </motion.div>

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
                      <span className="relative z-10">{item.label}</span>
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
                      {t("common.logout")}
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => {
                          navigate("/login");
                          setIsMenuOpen(false);
                        }}
                        className="w-full justify-start text-[var(--color-dark-blue)] hover:text-[var(--color-dark-blue)]/80 hover:bg-transparent"
                        aria-label={t("common.signIn")}
                      >
                        {t("common.signIn")}
                      </Button>
                      <Button
                        onClick={() => {
                          navigate("/register");
                          setIsMenuOpen(false);
                        }}
                        className="w-full rounded-full bg-[var(--color-dark-blue)] text-white font-medium shadow-sm hover:bg-[var(--color-dark-blue)]/90 hover:shadow-md transition-all duration-200"
                        aria-label={t("common.signUp")}
                      >
                        {t("common.signUp")}
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
