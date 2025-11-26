'use client';

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedText } from "@/components/animated-text";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export function HomeFooter() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSubscribe = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Handle newsletter subscription
      console.log("Subscribe:", email);
      setEmail("");
    },
    [email]
  );

  const SOCIAL_LINKS: SocialLink[] = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      ),
    },
    {
      name: "Zalo",
      href: "#",
      icon: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "#",
      icon: (
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
    },
  ] as const;

  // Quick links - Navigate về landing page với anchor
  const QUICK_LINKS = [
    { key: "header.about", href: "/#about" },
    { key: "header.bookingGuide", href: "/#booking-guide" },
    { key: "header.forPartners", href: "/#for-partners" },
    { key: "header.contact", href: "/#contact" },
  ];

  const LEGAL_LINKS = [
    { key: "footer.links.privacy", href: "/privacy" },
    { key: "footer.links.terms", href: "/terms" },
    { key: "footer.links.regulations", href: "/regulations" },
    { key: "footer.links.complaints", href: "/complaints" },
  ];

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden border-t border-white/10">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-[var(--color-dark-blue)]/20 rounded-full blur-[100px]" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-[var(--color-light-blue)]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* --- COL 1: Company Info (Chiếm 4/12) --- */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                <AnimatedText>{t("footer.companyInfo.name")}</AnimatedText>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Kết nối hành trình, trọn vẹn niềm vui. Giải pháp di chuyển thông
                minh hàng đầu Việt Nam.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors group">
                <MapPin className="w-5 h-5 mt-0.5 text-[var(--color-light-blue)] group-hover:text-white transition-colors" />
                <p className="text-sm leading-snug">
                  <AnimatedText>{t("footer.companyInfo.address")}</AnimatedText>
                </p>
              </div>
              <div className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 text-[var(--color-light-blue)] group-hover:text-white transition-colors" />
                <p className="text-sm font-medium">
                  <AnimatedText>{t("footer.companyInfo.hotline")}</AnimatedText>
                </p>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                  MST:
                </span>
                <p className="text-sm">
                  <AnimatedText>{t("footer.companyInfo.taxCode")}</AnimatedText>
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-3 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                    "bg-white/5 border border-white/10 text-slate-300",
                    "hover:bg-[var(--color-light-blue)] hover:border-[var(--color-light-blue)] hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-[var(--color-light-blue)]/25"
                  )}
                  aria-label={`Follow us on ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* --- COL 2: Quick Links (Chiếm 2/12) --- */}
          <div className="lg:col-span-2 lg:pl-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 inline-block">
              <AnimatedText>{t("footer.quickLinks")}</AnimatedText>
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.href.startsWith("/#")) {
                        navigate(link.href);
                      } else {
                        navigate(link.href);
                      }
                    }}
                    className="text-sm text-slate-400 hover:text-[var(--color-light-blue)] hover:pl-1 transition-all duration-200 block"
                  >
                    <AnimatedText>{t(link.key)}</AnimatedText>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- COL 3: Legal Links (Chiếm 2/12) --- */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-6 border-b border-white/10 pb-2 inline-block">
              <AnimatedText>{t("footer.legal")}</AnimatedText>
            </h4>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.href);
                    }}
                    className="text-sm text-slate-400 hover:text-[var(--color-light-blue)] hover:pl-1 transition-all duration-200 block"
                  >
                    <AnimatedText>{t(link.key)}</AnimatedText>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* --- COL 4: Newsletter (Chiếm 4/12) --- */}
          <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
            <h4 className="text-white text-base font-bold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[var(--color-light-blue)]" />
              <AnimatedText>{t("footer.newsletter.title")}</AnimatedText>
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              <AnimatedText>{t("footer.newsletter.subtitle")}</AnimatedText>
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubscribe} className="relative">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.placeholder")}
                className={cn(
                  "w-full h-12 pl-4 pr-28 rounded-full",
                  "bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500",
                  "focus-visible:ring-1 focus-visible:ring-[var(--color-light-blue)] focus-visible:border-[var(--color-light-blue)]"
                )}
                required
              />
              <Button
                type="submit"
                size="sm"
                className={cn(
                  "absolute right-1 top-1/2 -translate-y-1/2 h-10 rounded-full px-5",
                  "bg-[var(--color-light-blue)] hover:bg-[var(--color-light-blue)]/90 text-[var(--color-dark-blue)] font-bold",
                  "transition-all hover:shadow-lg shadow-[var(--color-light-blue)]/20",
                  "flex items-center justify-center whitespace-nowrap"
                )}
              >
                <AnimatedText>{t("footer.newsletter.subscribe")}</AnimatedText>
              </Button>
            </form>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-300">
              {t("footer.companyInfo.name")}
            </span>
            . All rights reserved.
          </p>

          <Button
            onClick={handleScrollToTop}
            variant="ghost"
            size="sm"
            className="text-xs text-slate-400 hover:text-white hover:bg-white/5 rounded-full gap-2 group"
          >
            <AnimatedText>{t("footer.backToTop")}</AnimatedText>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[var(--color-light-blue)] group-hover:text-[var(--color-dark-blue)] transition-colors">
              <ArrowUp className="h-3.5 w-3.5" />
            </div>
          </Button>
        </div>
      </div>
    </footer>
  );
}

