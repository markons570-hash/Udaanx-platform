/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrendingUp, Award, Calendar, BookOpen, Flame, Sparkles, CheckCircle } from "lucide-react";
import { SubjectProgress, UserProfile } from "../types";

interface ProgressViewProps {
  user: UserProfile;
  subjects: SubjectProgress[];
}

export default function ProgressView({ user, subjects }: ProgressViewProps) {
  const totalCompleted = subjects.reduce((sum, s) => sum + s.completedLessons, 0);
  const totalLessons = subjects.reduce((sum, s) => sum + s.totalLessons, 0);
  const overallProgressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Weekly performance coordinate metrics (Week 1 to Week 5) dynamically calculated
  const chartData = [
    { label: "W1", percent: Math.round(overallProgressPercent * 0.2) },
    { label: "W2", percent: Math.round(overallProgressPercent * 0.45) },
    { label: "W3", percent: Math.round(overallProgressPercent * 0.65) },
    { label: "W4", percent: Math.round(overallProgressPercent * 0.8) },
    { label: "W5", percent: overallProgressPercent }
  ];

  // SVG Area Coordinates mapping system
  // We have a 480x160 area
  const svgWidth = 500;
  const svgHeight = 180;
  const paddingX = 40;
  const paddingY = 25;

  const getCoordinates = () => {
    return chartData.map((d, index) => {
      const x = paddingX + (index * (svgWidth - 2 * paddingX)) / (chartData.length - 1);
      // y-coordinate is inverted, 100% is top-paddingY, 0% is svgHeight-paddingY
      const y = svgHeight - paddingY - (d.percent / 100) * (svgHeight - 2 * paddingY);
      return { x, y };
    });
  };

  const coords = getCoordinates();
  
  // Create SVG path string for the stroke
  const linePath = coords.reduce((acc, c, index) => {
    return acc + (index === 0 ? `M ${c.x} ${c.y}` : ` L ${c.x} ${c.y}`);
  }, "");

  // Create SVG path string for the gradient fill area
  const fillPath = `${linePath} L ${coords[coords.length - 1].x} ${svgHeight - paddingY} L ${coords[0].x} ${svgHeight - paddingY} Z`;

  // Badges accomplishments definitions dynamically verified
  const achievements = [
    {
      id: "ach1",
      title: "Syllabus Crusher",
      desc: "Complete over 50 deep syllabus lessons",
      unlockedAt: totalCompleted >= 50 ? "June 2, 2026" : "Pending",
      isUnlocked: totalCompleted >= 50,
      reward: "+1000 XP"
    },
    {
      id: "ach2",
      title: "Double-Digit Fire",
      desc: "Shatter a study streak of 10+ days",
      unlockedAt: user.studyStreak >= 10 ? "June 8, 2026" : "Pending",
      isUnlocked: user.studyStreak >= 10,
      reward: "+500 XP"
    },
    {
      id: "ach3",
      title: "AI Zen Master",
      desc: "Trigger 50 AI Assistant queries",
      unlockedAt: "Pending",
      isUnlocked: false,
      reward: "+250 XP"
    },
    {
      id: "ach4",
      title: "Campus Pioneer",
      desc: "Publish 5 forum guides",
      unlockedAt: "Pending",
      isUnlocked: false,
      reward: "+300 XP"
    }
  ];

  return (
    <div id="progress-hub" className="space-y-6 text-left pb-12">
      
      {/* Overview header cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="rounded-2xl glass-panel p-5 space-y-3 shadow-lg animate-fadeIn">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Courses Enrolled</div>
          <div className="text-3xl font-black text-white">8 Subjects</div>
          <div className="text-[11px] text-slate-400">Engineering specialization</div>
        </div>

        <div className="rounded-2xl glass-panel p-5 space-y-3 shadow-lg animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Lessons Completed</div>
          <div className="text-3xl font-black text-white">{totalCompleted} units</div>
          <div className="text-[11px] text-slate-400">Total completed units</div>
        </div>

        <div className="rounded-2xl glass-panel p-5 space-y-3 shadow-lg animate-fadeIn">
          <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Active Study Streak</div>
          <div className="text-3xl font-black text-white">{user.studyStreak} Days</div>
          <div className="text-[11px] text-orange-400 font-bold">12 Days Active • Level up!</div>
        </div>

      </div>

      {/* Week over Week Performance graph chart block */}
      <div className="rounded-2xl glass-panel p-6 space-y-4 shadow-xl animate-fadeIn">
        <div className="flex justify-between items-center text-left">
          <div className="space-y-1">
            <h3 className="text-base font-black text-white flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <span>Performance Vectors</span>
            </h3>
            <p className="text-[11px] text-slate-500 leading-none">Fluid area chart tracking cumulative student progression percentages.</p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-cyan-400">{overallProgressPercent}%</span>
            <span className="text-[10px] font-bold text-slate-500 block">CURRENT CUMULATIVE</span>
          </div>
        </div>

        {/* Scalable, custom SVG Continuous Area graph of coordinates */}
        <div className="w-full bg-slate-950/60 rounded-xl border border-white/5 p-4 overflow-hidden">
          <svg
            id="analytics-chart"
            width="100%"
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
            className="overflow-visible"
          >
            {/* Define Glimmering Gradients */}
            <defs>
              <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[25, 50, 75, 100].map((gridPercent, i) => {
              const y = svgHeight - paddingY - (gridPercent / 100) * (svgHeight - 2 * paddingY);
              return (
                <g key={i}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="1"
                    strokeDasharray="4,4"
                  />
                  <text
                    x={paddingX - 10}
                    y={y + 4}
                    fill="rgba(255,255,255,0.25)"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    {gridPercent}%
                  </text>
                </g>
              );
            })}

            {/* Continuous Area filled polygon gradient */}
            <path d={fillPath} fill="url(#chartAreaGradient)" />

            {/* Outer high precision line stroke */}
            <path d={linePath} stroke="#06b6d4" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Interactive dot coordinate beads */}
            {coords.map((c, index) => (
              <g key={index}>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r="6"
                  fill="#030712"
                  stroke="#00e5ff"
                  strokeWidth="2.5"
                />
                <text
                  x={c.x}
                  y={c.y - 12}
                  fill="#fff"
                  fontSize="9"
                  fontWeight="black"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {chartData[index].percent}%
                </text>
                {/* Horizontal label axes */}
                <text
                  x={c.x}
                  y={svgHeight - 8}
                  fill="rgba(255,255,255,0.35)"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {chartData[index].label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Grid of Subject completion percentages & Medal Badge highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Subject completion bar lists */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-2xl text-left space-y-4 animate-fadeIn">
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Syllabus Breakdown</h4>
          
          <div className="space-y-4 select-none">
            {subjects.map((sub) => (
              <div key={sub.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{sub.name}</span>
                  <span className="text-cyan-400 font-extrabold">{sub.percentage}% completed</span>
                </div>
                <div className="w-full h-2 bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full" 
                    style={{ width: `${sub.percentage}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements unlocks list */}
        <div className="glass-panel p-5 rounded-2xl text-left space-y-4 animate-fadeIn">
          <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center space-x-1.5">
            <Award className="w-4.5 h-4.5 text-cyan-400" />
            <span>Badges & Medals ({achievements.filter(a => a.isUnlocked).length})</span>
          </h4>

          <div className="space-y-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-3.5 rounded-xl border flex items-center gap-3 ${
                  ach.isUnlocked
                    ? "bg-slate-950/50 border-cyan-500/20"
                    : "bg-slate-950/10 border-white/5 opacity-50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                  ach.isUnlocked
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-500/40"
                    : "bg-slate-900 text-slate-700 border-white/5"
                }`}>
                  🏆
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-extrabold leading-0 truncate ${ach.isUnlocked ? "text-white" : "text-slate-500"}`}>
                    {ach.title}
                  </div>
                  <p className="text-[10px] text-slate-400 truncate leading-relaxed mt-0.5">{ach.desc}</p>
                </div>
                <span className="text-[9px] font-black text-cyan-400 font-mono shrink-0 uppercase">
                  {ach.reward}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
