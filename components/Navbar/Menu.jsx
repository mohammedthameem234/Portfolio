import { useSpring, a } from "@react-spring/web";
import React, { useEffect, useRef, useState } from "react";

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

const Menu = ({ open, onOutsideClick, onClose }) => {
  const ref = useRef();
  const handleChildClick = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onOutsideClick(event);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleChildClick);
    return () => {
      document.removeEventListener("click", handleChildClick);
    };
  }, []);

  const [contents, contentsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(20deg)" },
  }));

  const [news, newsApi] = useSpring(() => ({
    from: { y: 100, opacity: 0, transform: "rotate(-20deg)" },
  }));
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (open == false) {
      setTimeout(() => {
        setHidden(false);
      }, 500);
    } else {
      setHidden(true);
    }

    contentsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(20deg)`,
    });

    newsApi.start({
      y: open ? 0 : 100,
      opacity: open ? 1 : 0,
      transform: open ? `rotate(0deg)` : `rotate(-20deg)`,
    });
  }, [open]);

  const navItems = [
    { label: "HOME", target: "top" },
    { label: "ABOUT", target: "about" },
    { label: "SKILLS", target: "skills" },
    { label: "WORK", target: "projects-section" },
    { label: "EXPERIENCE", target: "experience" },
    { label: "CONTACT", target: "contact-section" },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    scrollToSection(target);
    if (typeof onClose === "function") onClose();
  };

  return (
    <>
      {hidden && (
        <div
          className="absolute top-[4rem] right-0 w-[20rem] "
          ref={ref}
        >
          <a.div
            className="rounded-xl bg-bg-alt text-fg flex flex-col font-Aeonik text-3xl p-8"
            style={contents}
          >
            {navItems.map((item, i) => (
              <a
                key={item.target}
                href={item.target === "top" ? "#" : `#${item.target}`}
                onClick={(e) => handleNavClick(e, item.target)}
                className={`flex items-center justify-between transition-colors duration-200 hover:text-brblue cursor-pointer ${
                  i === 0 ? "pb-3" : i === navItems.length - 1 ? "pt-3" : "py-3"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-fg-muted">•</span>
              </a>
            ))}
          </a.div>

          <a.div
            className="rounded-xl bg-bg-alt text-fg flex flex-col p-8 my-2"
            style={news}
          >
            <div className="font-Aeonik text-3xl leading-tight">
              Got an idea?
              <br />
              Let&apos;s talk.
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => onClose && onClose()}
                className="flex items-center justify-between bg-fg text-bg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span>EMAIL</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => onClose && onClose()}
                className="flex items-center justify-between border-2 border-fg text-fg rounded-xl px-4 py-3 text-sm tracking-widest font-semibold transition-colors duration-200 hover:bg-accent-soft"
              >
                <span>LINKEDIN</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </a.div>
        </div>
      )}
    </>
  );
};

export default Menu;
