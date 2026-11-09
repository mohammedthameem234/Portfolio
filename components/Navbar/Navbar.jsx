"use client";

import React, { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import LetsTalk from "./LetsTalk";
import MenuButton from "./MenuButton";
import Link from "next/link";
import MusicButton from "./MusicButton";

const EMAIL = "mohammedthameem0806@gmail.com";
const LINKEDIN_URL = "http://linkedin.com/in/mohammed-thameem-c-a-70161a2a5";

const scrollToSection = (id) => {
  if (typeof window === "undefined") return;
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target == null) return;
  const lenis = window.__lenis;
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
    return;
  }
  if (target === 0) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const MOBILE_NAV_ITEMS = [
  { label: "HOME", target: "top" },
  { label: "ABOUT", target: "about" },
  { label: "SKILLS", target: "skills" },
  { label: "WORK", target: "projects-section" },
  { label: "EXPERIENCE", target: "experience" },
  { label: "CONTACT", target: "contact-section" },
];

function Navbar() {
  const [rotate, setRotate] = useSpring(() => ({
    transform: `rotate(0deg)`,
    config: { tension: 300, friction: 20, mass: 1 },
  }));

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const handleMobileNav = (e, target) => {
    e.preventDefault();
    setMobileOpen(false);
    setRotate({ transform: "rotate(0deg)" });
    setTimeout(() => scrollToSection(target), 50);
  };

  return (
    <>
      {/* Unified Top Navbar — Single container across all screen sizes */}
      <header
        className={`fixed top-0 left-0 w-full z-[100001] transition-all duration-300 ${
          scrolled || mobileOpen
            ? "py-3 bg-bg/90 backdrop-blur-md border-b border-theme-border/50 shadow-md"
            : "py-4 sm:py-6 lg:py-8 bg-transparent"
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          {/* Brand & Availability Status */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <Link
              href="/"
              aria-label="Home"
              onClick={(e) => handleMobileNav(e, "top")}
              className="tracking-wider font-semibold text-2xl sm:text-3xl cursor-pointer text-fg transition-opacity hover:opacity-80"
              style={{ letterSpacing: "-0.03em" }}
            >
              THAMEEM
            </Link>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[0.68rem] font-medium text-green-400 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span>Open to work</span>
            </div>
          </div>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Resume Download Button — Always available */}
            <a
              href="/resume.pdf"
              download="MOHAMMED-THAMEEM-Resume.pdf"
              className="flex items-center justify-center gap-1.5 h-10 px-4 sm:px-5 rounded-full bg-fg text-bg text-xs font-semibold tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-sm whitespace-nowrap"
              title="Download Resume"
            >
              <span>RESUME</span>
              <span aria-hidden="true">↓</span>
            </a>

            {/* Music Button — Shown on tablet & desktop */}
            <div className="hidden sm:flex items-center">
              <MusicButton />
            </div>

            {/* Let's Talk CTA — Shown on tablet & desktop */}
            <div className="hidden md:flex items-center">
              <LetsTalk />
            </div>

            {/* Desktop Menu Button (with popup) */}
            <div className="hidden md:flex items-center">
              <MenuButton />
            </div>

            {/* Mobile/Tablet Menu Hamburger Button */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="md:hidden nav_btn_sm flex items-center justify-center cursor-pointer ml-1"
              onMouseEnter={() => !mobileOpen && setRotate({ transform: "rotate(90deg)" })}
              onMouseLeave={() => !mobileOpen && setRotate({ transform: "rotate(0deg)" })}
              onClick={() => {
                const next = !mobileOpen;
                setMobileOpen(next);
                setRotate({ transform: next ? "rotate(45deg)" : "rotate(0deg)" });
              }}
            >
              <animated.div className="text-[0.6rem] leading-none" style={rotate}>
                {mobileOpen ? "✕" : "⬤ ⬤"}
              </animated.div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[100000] md:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-bg/95 backdrop-blur-lg"
          onClick={() => {
            setMobileOpen(false);
            setRotate({ transform: "rotate(0deg)" });
          }}
        />
        <div className="relative z-10 h-full w-full flex flex-col pt-24 pb-8 px-6 max-w-lg mx-auto">
          <nav className="flex flex-col gap-1">
            {MOBILE_NAV_ITEMS.map((item, i) => (
              <a
                key={item.target}
                href={item.target === "top" ? "#" : `#${item.target}`}
                onClick={(e) => handleMobileNav(e, item.target)}
                className="flex items-center justify-between py-3.5 border-b border-theme-border text-fg text-2xl sm:text-3xl font-semibold transition-colors duration-200 hover:text-brblue"
                style={{
                  letterSpacing: "-0.03em",
                  transform: mobileOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: mobileOpen ? 1 : 0,
                  transition: `transform 0.3s ease ${0.05 + i * 0.04}s, opacity 0.3s ease ${
                    0.05 + i * 0.04
                  }s, color 0.2s ease`,
                }}
              >
                <span>{item.label}</span>
                <span className="text-fg-muted text-sm sm:text-base">0{i + 1}</span>
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-8 flex flex-col gap-3">
            <p className="text-fg-muted text-xs tracking-[0.2em] uppercase">Quick Connect</p>
            <a
              href={`mailto:${EMAIL}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between bg-fg text-bg rounded-xl px-5 py-3.5 text-xs sm:text-sm tracking-[0.15em] font-semibold"
            >
              <span>SEND EMAIL</span>
              <span aria-hidden="true">➔</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-2 border-theme-border text-fg rounded-xl px-5 py-3.5 text-xs sm:text-sm tracking-[0.15em] font-semibold hover:border-fg transition-colors"
            >
              <span>LINKEDIN</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
