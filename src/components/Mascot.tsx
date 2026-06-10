/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";

interface MascotProps {
  className?: string;
  size?: number;
  expression?: "happy" | "thinking" | "neutral" | "waving";
}

export default function Mascot({ className = "", size = 200, expression = "happy" }: MascotProps) {
  // Eye paths & coordinates based on emotional states
  const getEyesAnimation = () => {
    switch (expression) {
      case "thinking":
        return {
          scaleY: [1, 0.1, 1],
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        };
      case "neutral":
        return {
          scaleY: 1,
        };
      case "happy":
      default:
        return {
          scaleY: [1, 0.8, 1.1, 1],
          transition: { repeat: Infinity, duration: 4, ease: "easeInOut" }
        };
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      {/* Background neon halo effect */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-2xl animate-pulse" />

      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          y: [-4, 4, -4],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {/* Antennas / Core Uplink Receiver */}
        <path d="M100 50V35" stroke="#06b6d4" strokeWidth="6" strokeLinecap="round" />
        <motion.circle
          cx="100"
          cy="28"
          r="8"
          fill="#06b6d4"
          animate={{
            fill: expression === "thinking" ? ["#06b6d4", "#a5f3fc", "#06b6d4"] : "#06b6d4",
            scale: expression === "thinking" ? [1, 1.25, 1] : 1,
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
          }}
        />
        
        {/* Ears / Acoustic Sensors */}
        <rect x="38" y="85" width="8" height="30" rx="4" fill="#0891b2" />
        <rect x="154" y="85" width="8" height="30" rx="4" fill="#0891b2" />
        {/* Neon ear indicator lines */}
        <line x1="42" y1="90" x2="42" y2="110" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
        <line x1="158" y1="90" x2="158" y2="110" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />

        {/* Head Shell */}
        <rect x="46" y="60" width="108" height="80" rx="28" fill="#1f2937" stroke="#374151" strokeWidth="5" />
        {/* Secondary bezel ring */}
        <rect x="52" y="66" width="96" height="68" rx="22" fill="#111827" stroke="#06b6d4" strokeWidth="2" />

        {/* Dynamic Display Panel Screen */}
        <rect x="58" y="72" width="84" height="56" rx="16" fill="#030712" />

        {/* Face Screen Grid Accents (Subtle pixel aesthetic) */}
        {expression === "happy" && (
          <g>
            {/* Curved happy left eye */}
            <motion.path
              d="M74 94 Q80 86 86 94"
              stroke="#22d3ee"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              animate={getEyesAnimation()}
            />
            {/* Curved happy right eye */}
            <motion.path
              d="M114 94 Q120 86 126 94"
              stroke="#22d3ee"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              animate={getEyesAnimation()}
            />
            {/* Digital smile mouth */}
            <motion.path
              d="M92 110 Q100 118 108 110"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Rosy power LED cheeks */}
            <circle cx="68" cy="106" r="3" fill="#ec4899" opacity="0.8" />
            <circle cx="132" cy="106" r="3" fill="#ec4899" opacity="0.8" />
          </g>
        )}

        {expression === "thinking" && (
          <g>
            {/* Thinking circular eyes, shifting size slightly */}
            <motion.circle
              cx="80"
              cy="95"
              r="6"
              fill="#22d3ee"
              animate={{ r: [5, 7, 5] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            <motion.circle
              cx="120"
              cy="95"
              r="6"
              fill="#22d3ee"
              animate={{ r: [7, 5, 7] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
            {/* Straight neutral processing mouth */}
            <motion.line
              x1="92"
              y1="112"
              x2="108"
              y2="112"
              stroke="#22d3ee"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{
                scaleX: [0.8, 1.2, 0.8],
              }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />
          </g>
        )}

        {expression === "neutral" && (
          <g>
            {/* Round pixel eyes */}
            <circle cx="80" cy="96" r="5" fill="#22d3ee" />
            <circle cx="120" cy="96" r="5" fill="#22d3ee" />
            {/* Small flat line mouth */}
            <line x1="94" y1="112" x2="106" y2="112" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {expression === "waving" && (
          <g>
            {/* Wink eyes */}
            <path d="M72 96 L88 96" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" />
            <path d="M114 94 Q120 86 126 94" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" fill="none" />
            {/* Happy laughing mouth */}
            <path d="M92 108 Q100 118 108 108" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="68" cy="106" r="3" fill="#ec4899" opacity="0.8" />
            <circle cx="132" cy="106" r="3" fill="#ec4899" opacity="0.8" />
          </g>
        )}

        {/* Neck Bridge */}
        <rect x="88" y="140" width="24" height="12" rx="4" fill="#374151" stroke="#4b5563" strokeWidth="2" />
        {/* Core Power Connector Line */}
        <line x1="100" y1="140" x2="100" y2="152" stroke="#06b6d4" strokeWidth="2" />

        {/* Torso Shell */}
        <path d="M60 152H140C148 152 152 158 152 165V184H48V165C48 158 52 152 60 152Z" fill="#1f2937" stroke="#374151" strokeWidth="4" />
        
        {/* Chest Processor Box with Neon Power Indicator Core */}
        <rect x="76" y="158" width="48" height="22" rx="6" fill="#111827" stroke="#374151" strokeWidth="2" />
        <motion.circle
          cx="100"
          cy="169"
          r="5"
          fill="#06b6d4"
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.9, 1.15, 0.9],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
        {/* Left and Right accessory status indicators on chest */}
        <rect x="84" y="166" width="6" height="6" rx="1" fill="#ec4899" />
        <rect x="110" y="166" width="6" height="6" rx="1" fill="#10b981" />
      </motion.svg>
    </div>
  );
}
