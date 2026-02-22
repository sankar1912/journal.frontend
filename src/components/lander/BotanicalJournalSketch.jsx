'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';



export default function BotanicalJournalSketch({
  scrollYProgress,
  style,
}) {
  const draw = useTransform(scrollYProgress, [0.25, 0.7], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  return (
    <motion.svg
      width="520"
      height="620"
      viewBox="0 0 520 620"
      fill="none"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        opacity,
        ...style,
      }}
    >
      {/* Main stem */}
      <motion.path
        d="M260 560 C250 460, 270 380, 260 300 C250 220, 280 140, 300 80"
        stroke="black"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        style={{ pathLength: draw }}
      />

      {/* Large central flower */}
      <motion.path
        d="
          M260 300
          C230 260, 180 260, 170 300
          C160 340, 210 370, 260 350
          C310 370, 360 340, 350 300
          C340 260, 290 260, 260 300
        "
        stroke="black"
        strokeWidth="1.6"
        fill="none"
        style={{ pathLength: draw }}
      />

      {/* Inner petal lines */}
      <motion.path
        d="M260 300 C250 290, 240 285, 230 290"
        stroke="black"
        strokeWidth="1"
        style={{ pathLength: draw }}
      />
      <motion.path
        d="M260 300 C270 290, 280 285, 290 290"
        stroke="black"
        strokeWidth="1"
        style={{ pathLength: draw }}
      />

      {/* Upper flower */}
      <motion.path
        d="
          M300 140
          C280 110, 240 110, 230 140
          C220 170, 250 190, 300 175
          C350 190, 380 170, 370 140
          C360 110, 320 110, 300 140
        "
        stroke="black"
        strokeWidth="1.4"
        fill="none"
        style={{ pathLength: draw }}
      />

      {/* Side flower */}
      <motion.path
        d="
          M200 360
          C175 335, 145 340, 140 365
          C135 395, 165 410, 200 395
          C235 410, 265 395, 260 365
          C255 340, 225 335, 200 360
        "
        stroke="black"
        strokeWidth="1.3"
        fill="none"
        style={{ pathLength: draw }}
      />

      {/* Leaves */}
      <motion.path
        d="M240 420 C200 410, 170 430, 160 460 C190 470, 220 455, 240 420"
        stroke="black"
        strokeWidth="1.2"
        fill="none"
        style={{ pathLength: draw }}
      />

      <motion.path
        d="M280 410 C320 400, 350 420, 360 450 C330 460, 300 445, 280 410"
        stroke="black"
        strokeWidth="1.2"
        fill="none"
        style={{ pathLength: draw }}
      />

      {/* Bud */}
      <motion.path
        d="M220 240 C210 220, 215 205, 230 200 C245 205, 250 220, 240 240"
        stroke="black"
        strokeWidth="1.1"
        fill="none"
        style={{ pathLength: draw }}
      />
    </motion.svg>
  );
}
