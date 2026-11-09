"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const FeaturedVideo = ({ refForward, ...props }) => {
  const ref = useRef(null);

  const variants = {
    initial: { scale: 1 },
    animate: { scale: 1.03 },
  };

  const { scrollYProgress } = useScroll({
    target: refForward,
    layoutEffect: false,
  });

  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgress(value);
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={progress > 0.3 ? "animate" : "initial"}
      className="relative z-10 w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-none aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl border border-theme-border/40"
      {...props}
    >
      <Image
        src="/profile-suit-full.jpg"
        alt="Mohammed Thameem - Featured Portrait"
        fill
        priority
        sizes="(max-width: 768px) 88vw, (max-width: 1200px) 40vw, 540px"
        className="object-cover"
      />
    </motion.div>
  );
};

export default FeaturedVideo;
