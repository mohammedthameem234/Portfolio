"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EMAIL = "mohammedthameem0806@gmail.com";
const LINKEDIN_URL = "http://linkedin.com/in/mohammed-thameem-c-a-70161a2a5";
const GITHUB_URL = "https://github.com/mohammedthameem786";

const ArrowUpRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Contact = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const emailRef = useRef(null);
  const ctaRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ state: "idle", message: "" });

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const eyebrowChars = eyebrowRef.current?.querySelectorAll(".ct-char") ?? [];
      const headlineChars = headlineRef.current?.querySelectorAll(".ct-char") ?? [];

      gsap.from(eyebrowChars, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: { amount: 0.3, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: eyebrowRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(headlineChars, {
        opacity: 0,
        y: 80,
        duration: 1.0,
        stagger: { amount: 0.4, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from([emailRef.current, ctaRef.current, formRef.current], {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: emailRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const splitChars = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="ct-char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({ state: "error", message: "Please fill in all required fields." });
      return;
    }

    setFormStatus({ state: "submitting", message: "Opening mail client..." });
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setFormStatus({ state: "success", message: "Thank you! Your mail draft is ready to send." });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact-section" ref={sectionRef} className="w-full flex flex-col items-center">
      <div id="ct-eyebrow" ref={eyebrowRef}>
        {splitChars("have a project in mind?")}
      </div>

      <h2 id="ct-headline" ref={headlineRef}>
        {splitChars("let's talk.")}
      </h2>

      <a
        id="ct-email"
        href={`mailto:${EMAIL}`}
        ref={emailRef}
        aria-label={`Email ${EMAIL}`}
      >
        {EMAIL}
      </a>

      <div id="ct-actions" ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4">
        <a id="ct-btn" href={`mailto:${EMAIL}`}>
          <span>SAY HELLO</span>
          <ArrowUpRight />
        </a>
        <a
          id="ct-btn-secondary"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>LINKEDIN</span>
          <ArrowUpRight />
        </a>
        <a
          id="ct-btn-secondary"
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>GITHUB</span>
          <ArrowUpRight />
        </a>
      </div>

      {/* Interactive Contact Form */}
      <div ref={formRef} className="w-full max-w-2xl mt-12 sm:mt-16 px-4 sm:px-0">
        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-10 rounded-3xl bg-bg-alt border border-theme-border/70 flex flex-col gap-6 shadow-xl"
        >
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-semibold text-fg tracking-tight">Send a Direct Message</h3>
            <p className="text-fg-muted text-xs sm:text-sm">Reach out directly for freelance, collaboration, or full-time roles.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="form-name" className="text-xs uppercase font-semibold tracking-wider text-fg-muted">Your Name *</label>
              <input
                id="form-name"
                type="text"
                required
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-bg border border-theme-border text-fg text-sm focus:outline-none focus:border-fg transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="form-email" className="text-xs uppercase font-semibold tracking-wider text-fg-muted">Your Email *</label>
              <input
                id="form-email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-bg border border-theme-border text-fg text-sm focus:outline-none focus:border-fg transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="form-msg" className="text-xs uppercase font-semibold tracking-wider text-fg-muted">Message *</label>
            <textarea
              id="form-msg"
              required
              rows={4}
              placeholder="Tell me about your project or opportunity..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-bg border border-theme-border text-fg text-sm focus:outline-none focus:border-fg transition-colors resize-none"
            />
          </div>

          {formStatus.message && (
            <div
              className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium text-center ${
                formStatus.state === "success"
                  ? "bg-green-500/10 text-green-400 border border-green-500/30"
                  : formStatus.state === "error"
                  ? "bg-red-500/10 text-red-400 border border-red-500/30"
                  : "bg-blue-500/10 text-blue-400 border border-blue-500/30"
              }`}
            >
              {formStatus.message}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-fg text-bg font-semibold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity cursor-pointer mt-1"
          >
            Send Message ➔
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
