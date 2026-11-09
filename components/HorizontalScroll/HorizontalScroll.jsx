"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TEXT = "Building High-Impact Full-Stack Systems & Immersive Web Experiences.";

const HorizontalScroll = () => {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const text = textRef.current;
    if (!wrapper || !sticky || !text) return;

    const isMobile = window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile / Tablet: Smooth continuous marquee banner.
        // No screen pinning that causes empty black spaces!
        gsap.to(text, {
          xPercent: -50,
          repeat: -1,
          duration: 20,
          ease: "none",
        });
      } else {
        // Desktop: Interactive scroll-driven scrub
        const getPinDistance = () => {
          const textWidth = text.scrollWidth;
          const viewport = window.innerWidth;
          return Math.max(textWidth - viewport * 0.4, viewport * 0.8);
        };

        gsap.to(text, {
          xPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sticky,
            start: "top top",
            end: () => "+=" + getPinDistance(),
            scrub: 0.4,
            pin: sticky,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  const renderText = () => {
    return TEXT.split(" ").map((word, wi, arr) => (
      <span key={wi} className="hs-word" style={{ display: "inline-block", whiteSpace: "nowrap" }}>
        {word.split("").map((char, ci) => (
          <span key={ci} className="hs-char" style={{ display: "inline-block" }}>
            {char}
          </span>
        ))}
        {wi < arr.length - 1 && <span className="hs-char" style={{ display: "inline-block" }}>&nbsp;</span>}
      </span>
    ));
  };

  return (
    <section className="Horizontal" ref={wrapperRef}>
      <div className="hs-sticky" ref={stickyRef}>
        <div className="Horizontal__track flex items-center overflow-hidden">
          <h3 className="Horizontal__text heading-xl" ref={textRef}>
            {renderText()}
            <span className="opacity-40">&nbsp;&nbsp;•&nbsp;&nbsp;</span>
            {renderText()}
          </h3>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
