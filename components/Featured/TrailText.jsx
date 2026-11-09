import React from "react";
import { useTrail, a } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export const Trail = ({ children, callback, ...props }) => {
  const items = React.Children.toArray(children);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const trail = useTrail(items.length, {
    config: { mass: 2, tension: 500, friction: 60 },
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 25,
    from: { opacity: 0, y: 25 },
    onRest: () => {
      if (typeof callback === "function") callback(inView);
    },
  });

  return (
    <div {...props} ref={ref}>
      {trail.map((style, index) => (
        <a.div key={index} style={style} className="overflow-visible">
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};
