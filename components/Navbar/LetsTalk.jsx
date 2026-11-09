import React from "react";
import { useSpring, animated } from "@react-spring/web";

const EMAIL = "mohammedthameem0806@gmail.com";

const LetsTalk = () => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
    x: -8,
  }));

  const [opacitySprings, opacityApi] = useSpring(() => ({
    opacity: 1,
    x: 0,
  }));

  const [opacitySpringsReverse, opacityApiReverse] = useSpring(() => ({
    opacity: 0,
    x: -8,
  }));

  return (
    <a
      href={`mailto:${EMAIL}`}
      aria-label={`Email ${EMAIL}`}
      className="nav_btn_dark flex items-center justify-center h-10 px-5 rounded-full hover:bg-brblue transition-colors text-xs font-semibold tracking-wider whitespace-nowrap cursor-pointer"
      onMouseEnter={() => {
        api.start({ x: 14 });
        opacityApi.start({ opacity: 0, x: 5 });
        opacityApiReverse.start({ opacity: 1, x: 2 });
      }}
      onMouseLeave={() => {
        api.start({ x: 0 });
        opacityApi.start({ opacity: 1, x: 0 });
        opacityApiReverse.start({ opacity: 0, x: -8 });
      }}
    >
      <animated.span style={opacitySpringsReverse} className="opacity-0">➔&nbsp;</animated.span>
      <animated.span style={springs} className="whitespace-nowrap">LET&apos;S TALK</animated.span>
      <animated.span style={opacitySprings}>&nbsp;•&nbsp;</animated.span>
    </a>
  );
};

export default LetsTalk;
