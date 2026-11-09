"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SKILLS = [
  {
    name: "React",
    category: "Frontend UI",
    desc: "Component-based architecture, hooks, state management, and modern interactive web UIs.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "JavaScript (ES6+)",
    category: "Core Language",
    desc: "Asynchronous programming, event loop, DOM manipulation, and dynamic client/server logic.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M16 8v8a2 2 0 0 1-2 2h-1" />
        <path d="M9 15a2 2 0 0 0 2 2h1" />
      </svg>
    ),
  },
  {
    name: "Node.js & Express",
    category: "Backend Engine",
    desc: "High-throughput RESTful APIs, middleware architecture, routing, and server-side runtimes.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="m12 2 8 4.5v9L12 20l-8-4.5v-9L12 2z" />
        <path d="m12 12 8-4.5" />
        <path d="M12 12v8" />
        <path d="m12 12-8-4.5" />
      </svg>
    ),
  },
  {
    name: "HTML5 & Modern CSS3",
    category: "Structure & Style",
    desc: "Semantic standards, CSS Grid, Flexbox, responsive fluid typography, and custom animations.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M4 3h16l-1.5 15L12 21l-6.5-3L4 3z" />
        <path d="M7.5 7.5h9" />
        <path d="M8 11.5h8" />
        <path d="M9 15.5l3 .8 3-.8" />
      </svg>
    ),
  },
  {
    name: "MongoDB & SQLite",
    category: "Database Systems",
    desc: "Relational and NoSQL schemas, efficient data modeling, indexing, and persistent storage.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "Backend & Scripting",
    desc: "Data manipulation, backend automation scripts, algorithmic problem-solving, and logic.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2H8a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h4v-2a2 2 0 0 1 2-2h4a2 2 0 0 0 2-2V6a4 4 0 0 0-4-4h-4z" />
        <path d="M12 22h4a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4h-4v2a2 2 0 0 1-2 2H6a2 2 0 0 0-2 2v4a4 4 0 0 0 4 4h4z" />
        <circle cx="9" cy="6" r="1" fill="currentColor" />
        <circle cx="15" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Git & Version Control",
    category: "DevOps & Workflow",
    desc: "Branching strategies, repository management, collaborative code review, and version history.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M6 9v6" />
        <path d="M9 6h4a5 5 0 0 1 5 5v4" />
      </svg>
    ),
  },
  {
    name: "UI/UX & Responsive Design",
    category: "Design & Systems",
    desc: "Pixel-perfect mobile-first design, accessibility, fluid layout scaling, and design consistency.",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect width="18" height="14" x="3" y="3" rx="2" />
        <path d="M7 21h10" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
];

const LANGUAGES = [
  { name: "English", level: "Fluent", percent: 100 },
  { name: "Hindi", level: "Conversational", percent: 75 },
  { name: "Urdu", level: "Proficient", percent: 50 },
];

const TechStack = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".skill-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      const bars = sectionRef.current?.querySelectorAll(".lang-progress-bar");
      if (bars && bars.length > 0) {
        bars.forEach((bar) => {
          const targetWidth = bar.getAttribute("data-width") || "100%";
          gsap.fromTo(
            bar,
            { width: "0%" },
            {
              width: targetWidth,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                once: true,
              },
            }
          );
        });
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="w-full px-5 sm:px-8 lg:px-20 py-20 lg:py-28 bg-bg text-fg border-t border-theme-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 lg:mb-16 gap-4">
          <div>
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-fg-muted uppercase block mb-3">
              TECHNICAL EXPERTISE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Tech Stack &amp; Tools
            </h2>
          </div>
          <p className="text-fg-muted text-sm sm:text-base max-w-md">
            Full-cycle technologies and modern frameworks I employ to build performant, reliable applications from database to screen.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SKILLS.map((skill) => (
            <div
              key={skill.name}
              className="skill-card group p-6 sm:p-7 rounded-2xl bg-bg-alt border border-theme-border/60 hover:border-theme-border transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex items-center justify-between mb-5 text-fg group-hover:text-brblue transition-colors">
                  <div className="p-2.5 rounded-xl bg-bg border border-theme-border/50">
                    {skill.icon}
                  </div>
                  <span className="text-[0.7rem] uppercase tracking-[0.2em] font-semibold text-fg-muted px-2.5 py-1 rounded-full border border-theme-border/40">
                    {skill.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-brblue transition-colors">
                  {skill.name}
                </h3>
                <p className="text-fg-muted text-xs sm:text-sm leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Spoken Languages Bar */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-10 rounded-2xl bg-bg-alt border border-theme-border/60">
          <div className="mb-8">
            <span className="text-xs font-semibold tracking-[0.25em] text-fg-muted uppercase block mb-2">
              COMMUNICATION &amp; COLLABORATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Spoken Languages
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-fg text-base whitespace-nowrap">{lang.name}</span>
                  <span className="text-fg-muted text-[0.72rem] tracking-wider uppercase font-semibold whitespace-nowrap px-2.5 py-1 rounded-md bg-bg border border-theme-border/50">
                    {lang.level}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-bg overflow-hidden border border-theme-border/40">
                  <div
                    className="lang-progress-bar h-full rounded-full bg-fg"
                    data-width={`${lang.percent}%`}
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
