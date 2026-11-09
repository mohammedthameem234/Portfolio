import { a, useSpring } from "@react-spring/web";
import { Trail } from "./TrailText";
import React, { useEffect, useState } from "react";

const Header = () => {
  const [open, set] = useState();

  useEffect(() => {
    set(true);
  }, []);

  const [horizontal, api] = useSpring(() => ({ from: { transform: 'translateX(0%)' } }));

  const horizontalCallback = (isOpen) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      api.start({ transform: `translateX(${isOpen ? '5%' : '0%'})` });
    }
  };

  return (
    <div className="w-full z-10 relative font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-center lg:text-left leading-[0.98] tracking-tight pb-4" style={{ letterSpacing: "-0.04em" }}>
      <Trail callback={horizontalCallback}>
        <a.div className="flex justify-center lg:justify-start flex-wrap lg:flex-nowrap" style={horizontal}>
          <div>Building&nbsp;</div>
          <div>Real&nbsp;</div>
        </a.div>
        <div className="flex justify-center lg:justify-start flex-wrap lg:flex-nowrap">
          <div>Digital&nbsp;</div>
          <div>Systems&nbsp;</div>
        </div>
      </Trail>
    </div>
  );
};

export default Header;
