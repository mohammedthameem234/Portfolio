"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    name: "Flowstate Fashion",
    role: "E-Commerce Experience • May 2025",
    note: "A refined digital retail experience for modern apparel, engineered with fluid mobile-first navigation and a streamlined checkout flow.",
    href: "https://github.com/mohammedthameem786",
    kind: "Website Design",
  },
  {
    name: "Full-Stack Commerce Platform",
    role: "Web Application • March 2025",
    note: "A production-grade e-commerce application powered by React and Node.js, featuring real-time inventory tracking and secure payment integration.",
    href: "https://github.com/mohammedthameem786",
    kind: "Web Application",
  },
  {
    name: "Admin Analytics Dashboard",
    role: "UI/UX & Systems • January 2025",
    note: "An intuitive administration panel offering data visualization, user authorization workflows, and real-time CRM communication logs.",
    href: "https://github.com/mohammedthameem786",
    kind: "UI/UX Design",
  },
  {
    name: "3D Immersive Portfolio",
    role: "Next.js, Three.js & GSAP • 2026",
    note: "A high-performance interactive developer portfolio featuring WebGL fluid simulation, 3D mouse parallax, and smooth Lenis scroll physics.",
    href: "https://github.com/mohammedthameem786",
    kind: "Interactive Web",
  },
];

const EXPERIENCES = [
  {
    name: "Full-Stack Software Developer",
    role: "Freelance & Independent Projects • 2023 - Present",
    kind: "Experience",
    href: null,
    note: "Designing, building, and deploying modern web applications and APIs. Delivering complete client solutions from conception to production launch.",
  },
  {
    name: "C Abdul Hakeem College Of Engineering & Technology",
    role: "B-Tech in Information Technology • 2023 - 2027",
    kind: "Education",
    href: null,
    note: "Rigorous academic curriculum covering data structures, computer networks, database systems, and modern software engineering principles.",
  },
  {
    name: "Full-Stack Web Development Certification",
    role: "Accredited Certification Provider • 2023",
    kind: "Certificate",
    href: null,
    note: "Demonstrated technical proficiency in HTML5, CSS3, modern JavaScript (ES6+), React, Node.js, Express, and database management.",
  },
];

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const Row = ({ item, index }) => {
  const hasLink = Boolean(item.href);
  const Wrapper = hasLink ? "a" : "div";
  const wrapperProps = hasLink
    ? { href: item.href, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <li className="pj-row">
      <Wrapper
        className={`pj-link${hasLink ? "" : " pj-link--static"}`}
        {...wrapperProps}
      >
        <span className="pj-num">{String(index + 1).padStart(2, "0")}</span>
        <div className="pj-meta">
          <span className="pj-name">{item.name}</span>
          {item.role && <span className="pj-role">{item.role}</span>}
          {item.note && <span className="pj-note">{item.note}</span>}
        </div>
        <span className="pj-kind">{item.kind}</span>
        <span className="pj-arrow" aria-hidden="true">
          {hasLink ? <ArrowIcon /> : <span className="pj-dot">•</span>}
        </span>
      </Wrapper>
    </li>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rows = sectionRef.current?.querySelectorAll(".pj-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { opacity: 0.3, y: 30 },
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

      const titles = sectionRef.current?.querySelectorAll(".pj-title");
      if (titles && titles.length > 0) {
        gsap.fromTo(
          titles,
          { opacity: 0.4, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects-section" ref={sectionRef} className="w-full">
      <div className="pj-head">
        <span className="pj-label">SELECTED WORK</span>
        <h2 className="pj-title">featured projects</h2>
      </div>

      <ul className="pj-list">
        {PROJECTS.map((p, i) => (
          <Row key={p.name} item={p} index={i} />
        ))}
      </ul>

      <div id="experience" className="pj-head pj-head--secondary">
        <span className="pj-label">EXPERIENCE &amp; EDUCATION</span>
        <h2 className="pj-title">journey &amp; credentials</h2>
      </div>

      <ul className="pj-list">
        {EXPERIENCES.map((v, i) => (
          <Row key={v.name} item={v} index={i} />
        ))}
      </ul>
    </section>
  );
};

export default Projects;
