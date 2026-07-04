"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { RefObject, ReactNode } from "react";

const springConfig = { stiffness: 85, damping: 26, mass: 0.85 };

type ScrollSplitHeadingProps = {
  scrollTargetRef: RefObject<HTMLElement | null>;
  lineOne: ReactNode;
  lineTwo: ReactNode;
  className?: string;
  lineOneClassName?: string;
  lineTwoClassName?: string;
  /** Horizontal travel distance in pixels at scroll start. */
  travel?: number;
};

export function ScrollSplitHeading({
  scrollTargetRef,
  lineOne,
  lineTwo,
  className,
  lineOneClassName,
  lineTwoClassName,
  travel = 112,
}: ScrollSplitHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start end", "end center"],
  });

  const xLeftRaw = useTransform(scrollYProgress, [0, 1], [-travel, 0]);
  const xRightRaw = useTransform(scrollYProgress, [0, 1], [travel, 0]);

  const xLeft = useSpring(xLeftRaw, springConfig);
  const xRight = useSpring(xRightRaw, springConfig);

  return (
    <h2
      className={[
        "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <SplitLine motionX={shouldReduceMotion ? 0 : xLeft} className={lineOneClassName}>
        {lineOne}
      </SplitLine>
      <SplitLine motionX={shouldReduceMotion ? 0 : xRight} className={lineTwoClassName}>
        {lineTwo}
      </SplitLine>
    </h2>
  );
}

type SplitLineProps = {
  children: ReactNode;
  className?: string;
  motionX: number | MotionValue<number>;
};

function SplitLine({ children, className, motionX }: SplitLineProps) {
  return (
    <motion.span
      className={["block will-change-transform", className].filter(Boolean).join(" ")}
      style={{ x: motionX }}
    >
      {children}
    </motion.span>
  );
}
