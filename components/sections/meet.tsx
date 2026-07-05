"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { ScrollSplitHeading } from "@/components/motion/scroll-split-heading";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/navigation";

const spring = { stiffness: 80, damping: 28, mass: 0.9 };

export function Meet() {
  const t = useTranslations("meet");
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end 0.65"],
  });

  const smoothProgress = useSpring(scrollYProgress, spring);

  const cardOpacity = useTransform(smoothProgress, [0, 0.45], [0, 1]);
  const cardY = useTransform(smoothProgress, [0, 0.5], [48, 0]);
  const cardScale = useTransform(smoothProgress, [0, 0.5], [0.96, 1]);

  const imgScale = useTransform(smoothProgress, [0.05, 0.6], [1.15, 1]);
  const imgY = useTransform(smoothProgress, [0, 1], [24, -12]);

  const textOpacity = useTransform(smoothProgress, [0.2, 0.6], [0, 1]);
  const textX = useTransform(smoothProgress, [0.2, 0.6], [32, 0]);

  const noMotion = !!prefersReduced;

  return (
    <section
      ref={sectionRef}
      className="border-b border-brand-line bg-[#f8f8f8] py-24 max-sm:py-16"
      id="about"
    >
      <Container>
        <ScrollSplitHeading
          scrollTargetRef={sectionRef}
          className="mb-12 font-sans text-[clamp(2rem,6vw,4.5rem)] max-sm:text-[clamp(2.75rem,9vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          lineOneClassName=" sm:ps-[4rem]"
          lineTwoClassName="mt-[0.15em] pe-[4rem] max-sm:ps-[1rem] max-sm:pe-[0rem]  text-right max-sm:text-left"
          lineOne={
            <>
              {t("lineOne")}{" "}
              <em className="font-medium not-italic text-brand-muted md:italic">
                {t("lineOneEmphasis")}
              </em>
            </>
          }
          lineTwo={
            <>
              {t("lineTwo")}{" "}
              <em className="font-medium not-italic text-brand-muted md:italic">
                {t("lineTwoEmphasis")}
              </em>
            </>
          }
        />

        <motion.article
          ref={cardRef}
          className="meet-card grid grid-cols-[minmax(220px,320px)_1fr] items-center gap-[clamp(1.5rem,4vw,3rem)] overflow-hidden rounded-tl-[1.25rem] rounded-tr-[999px] rounded-br-[999px] rounded-bl-[1.25rem] border border-white/12 bg-gradient-to-br from-[#3a2f2f] from-0% via-brand-dark via-45% to-[#2a2826] p-[clamp(1.5rem,3vw,2.5rem)] text-brand-on-dark will-change-transform max-[960px]:grid-cols-1 max-[960px]:rounded-lg"
          style={
            noMotion
              ? undefined
              : { opacity: cardOpacity, y: cardY, scale: cardScale }
          }
        >
          <figure className="m-0 aspect-[4/5] max-h-[380px] overflow-hidden rounded-2xl">
            <motion.div
              className="h-full w-full"
              style={
                noMotion
                  ? undefined
                  : {
                    scale: imgScale,
                    y: imgY,
                  }
              }
            >
              <Image
                src="/me-logo-origin.png"
                alt="ermili.dev"
                width={280}
                height={340}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </figure>

          <motion.div
            className="pr-[clamp(1rem,4vw,3rem)] max-[960px]:pr-0"
            style={
              noMotion ? undefined : { opacity: textOpacity, x: textX }
            }
          >
            <p className="mb-4 text-[clamp(1.5rem,3vw,2rem)]">
              <strong>{t("greeting")}</strong>
            </p>
            <p className="mb-4 max-w-[52ch] text-[1.05rem] leading-[1.65]">
              {t("bio")}
            </p>
            <p className="mb-[0.85rem] max-w-[52ch] text-[0.95rem] leading-[1.65] text-brand-faint">
              {t("experience")}
            </p>
            <p className="mb-[0.85rem] max-w-[52ch] text-[0.95rem] leading-[1.65] text-brand-faint">
              {t("cta")}
            </p>
            <Link
              href="/#contact"
              className="mt-2 inline-block text-[0.95rem] font-medium text-brand-on-dark underline underline-offset-4 transition-colors hover:text-brand-accent"
            >
              {t("learnMore")}
            </Link>
          </motion.div>
        </motion.article>
      </Container>
    </section>
  );
}
