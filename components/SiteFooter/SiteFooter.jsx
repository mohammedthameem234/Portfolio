"use client";

import React from "react";

const Icon = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const LinkedinIcon = () => (
  <Icon>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

const GithubIcon = () => (
  <Icon>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </Icon>
);

const MailIcon = () => (
  <Icon>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
);

const SiteFooter = () => {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h1 className="f-logo">THAMEEM</h1>
          <p className="f-desc">
            Mohammed Thameem crafts full-stack applications. <br />
            Transforming complex systems into seamless digital experiences.
          </p>
          <div className="f-socials">
            <a
              href="http://linkedin.com/in/mohammed-thameem-c-a-70161a2a5"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://github.com/mohammedthameem786"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
            <a
              href="mailto:mohammedthameem0806@gmail.com"
              aria-label="Email"
            >
              <MailIcon />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div className="f-col">
            <h3>EXPLORE</h3>
            <a href="#projects-section">Projects</a>
            <a href="#experience">Experience &amp; Education</a>
            <a href="#skills">Tech Stack</a>
            <a href="#contact-section">Get in touch</a>
            <a href="/resume.pdf" download="MOHAMMED-THAMEEM-Resume.pdf">Download Resume</a>
          </div>
          <div className="f-col">
            <h3>CONTACT</h3>
            <a href="mailto:mohammedthameem0806@gmail.com">
              mohammedthameem0806@gmail.com
            </a>
            <span>Location: Vellore, Tamil Nadu, India</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Mohammed Thameem. All rights reserved.</p>
        <p>Built with Next.js, Three.js &amp; GSAP</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
