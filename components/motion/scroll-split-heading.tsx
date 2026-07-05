"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import type { RefObject, ReactNode } from "react";

import {
  SM_MIN_WIDTH_QUERY,
  useMediaQuery,
} from "@/hooks/use-media-query";

const springConfig = { stiffness: 85, damping: 26, mass: 0.85 };
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const mobileLineVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

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
  const isDesktopOrTablet = useMediaQuery(SM_MIN_WIDTH_QUERY);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ["start end", "end center"],
  });

  const xLeftRaw = useTransform(scrollYProgress, [0, 1], [-travel, 0]);
  const xRightRaw = useTransform(scrollYProgress, [0, 1], [travel, 0]);

  const xLeft = useSpring(xLeftRaw, springConfig);
  const xRight = useSpring(xRightRaw, springConfig);

  const useScrollAnimation =
    isReady && isDesktopOrTablet && !shouldReduceMotion;
  const useMobileAnimation =
    isReady && !isDesktopOrTablet && !shouldReduceMotion;

  return (
    <h2
      className={["max-w-full", className].filter(Boolean).join(" ")}
    >
      {useScrollAnimation ? (
        <DesktopClipStage travel={travel}>
          <DesktopSplitLine motionX={xLeft} className={lineOneClassName}>
            {lineOne}
          </DesktopSplitLine>
          <DesktopSplitLine motionX={xRight} className={lineTwoClassName}>
            {lineTwo}
          </DesktopSplitLine>
        </DesktopClipStage>
      ) : useMobileAnimation ? (
        <>
          <MobileSplitLine className={lineOneClassName} delay={0}>
            {lineOne}
          </MobileSplitLine>
          <MobileSplitLine className={lineTwoClassName} delay={0.14}>
            {lineTwo}
          </MobileSplitLine>
        </>
      ) : (
        <>
          <StaticLine className={lineOneClassName}>{lineOne}</StaticLine>
          <StaticLine className={lineTwoClassName}>{lineTwo}</StaticLine>
        </>
      )}
    </h2>
  );
}

type SplitLineProps = {
  children: ReactNode;
  className?: string;
};

type DesktopSplitLineProps = SplitLineProps & {
  motionX: number | MotionValue<number>;
};

/** Wider clip region so translateX scroll motion is not cut off by the heading box. */
function DesktopClipStage({
  children,
  travel,
}: {
  children: ReactNode;
  travel: number;
}) {
  return (
    <div
      className="overflow-x-clip"
      style={{
        width: `calc(100% + ${travel * 2}px)`,
        marginInline: -travel,
        paddingInline: travel,
      }}
    >
      {children}
    </div>
  );
}

function DesktopSplitLine({ children, className, motionX }: DesktopSplitLineProps) {
  return (
    <motion.span
      className={["block will-change-transform", className].filter(Boolean).join(" ")}
      style={{ x: motionX }}
    >
      {children}
    </motion.span>
  );
}

function MobileSplitLine({
  children,
  className,
  delay,
}: SplitLineProps & { delay: number }) {
  return (
    <motion.span
      className={["block max-w-full will-change-[opacity,transform,filter]", className]
        .filter(Boolean)
        .join(" ")}
      variants={mobileLineVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35, margin: "0px 0px -32px 0px" }}
    >
      {children}
    </motion.span>
  );
}

function StaticLine({ children, className }: SplitLineProps) {
  return (
    <span className={["block max-w-full", className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
