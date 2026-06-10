/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Check, Lock, ChevronRight, MapPin, Award, BookOpen, Compass, Sparkles } from "lucide-react";
import { Milestone } from "../types";

interface RoadmapViewProps {
  milestones: Milestone[];
  onOpenAssistant: (initialPrompt?: string, mode?: string) => void;
}

export default function RoadmapView({ milestones, onOpenAssistant }: RoadmapViewProps) {
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>("ms2");

  return (
    <div id="roadmap-hub" className="space-y-6 text-left pb-12">
      
      {/* Banner introduction card */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl relative overflow-hidden animate-fadeIn">
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/20 text-[9px] font-bold text-cyan-400 tracking-widest uppercase">
            Career Pipeline
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">Full Stack Web Developer Roadmap</h2>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed">
            Your customized university learning pathway. Complete milestone exams and coding challenges to unlock premium developer credentials.
          </p>
        </div>

        {/* Global pipeline tracking status metrics */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-white/5 flex items-center space-x-4 self-stretch md:self-auto justify-around">
          <div className="text-center">
            <div className="text-xl font-bold text-cyan-400">2 / 4</div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider font-extrabold">Milestones Completed</div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-400">50%</div>
            <div className="text-[9px] text-slate-500 uppercase tracking-wider font-extrabold">Overall Completeness</div>
          </div>
        </div>
      </div>

      {/* Sequential roadmap blocks loop display page */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Step-by-step scrolling timeline list */}
        <div className="lg:col-span-2 space-y-6 text-left relative">
          
          {/* Vertical path tracer line connecting circles */}
          <div className="absolute left-7 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-500 via-indigo-500 to-slate-900/10 pointer-events-none hidden sm:block" />

          {milestones.map((ms, index) => {
            const isActive = activeMilestoneId === ms.id;
            
            return (
              <div
                key={ms.id}
                onClick={() => setActiveMilestoneId(ms.id)}
                className={`relative flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer animate-fadeIn ${
                  isActive
                    ? "glass-panel border-cyan-400/40 shadow-lg shadow-cyan-950/10"
                    : "glass-panel opacity-85 hover:opacity-100"
                }`}
              >
                {/* Node Milestone icon bubble indicator */}
                <div className="relative z-10 self-center sm:self-start">
                  <div className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center ${
                    ms.status === "Completed"
                      ? "bg-cyan-500 text-black border-cyan-400"
                      : ms.status === "In Progress"
                      ? "bg-slate-950 text-indigo-400 border-indigo-400 animate-pulse"
                      : "bg-slate-950 text-slate-600 border-white/5"
                  }`}>
                    {ms.status === "Completed" ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    ) : ms.status === "In Progress" ? (
                      <Compass className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    ) : (
                      <Lock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    )}
                  </div>
                </div>

                {/* Core block details */}
                <div className="flex-1 space-y-2.5 text-left w-full">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 font-mono block">STEP {ms.stepNumber} OF {milestones.length}</span>
                      <h3 className="text-sm font-extrabold text-white">{ms.title}</h3>
                    </div>
                    
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono ${
                      ms.status === "Completed"
                        ? "bg-cyan-950/40 text-cyan-300 border border-cyan-500/20"
                        : ms.status === "In Progress"
                        ? "bg-indigo-950/60 text-indigo-400 border border-indigo-500/30"
                        : "bg-slate-950 text-slate-500 border border-white/5"
                    }`}>
                      {ms.status}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {ms.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {ms.skillsLearned.map((skill, sIdx) => (
                      <span key={sIdx} className="text-[9px] font-medium bg-slate-950/60 text-slate-300 px-2 py-0.5 rounded-md border border-white/5 font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Informative selected item action center */}
        <div className="space-y-6">
          {(() => {
            const activeMilestone = milestones.find((m) => m.id === activeMilestoneId);
            if (!activeMilestone) return null;
            
            return (
              <div className="glass-panel rounded-2xl p-5 space-y-5 text-left shadow-xl animate-fadeIn">
                <div className="space-y-1">
                  <span className="text-[9px] font-extrabold text-slate-500 tracking-wider block uppercase">Interactive Blueprint Panel</span>
                  <h3 className="text-sm font-black text-white">{activeMilestone.title}</h3>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed">
                  Analyze key assignments or deconstruct syllabus curriculum maps using our secure generative model co-pilots.
                </p>

                <div className="space-y-3 bg-slate-950/40 p-4 rounded-xl border border-white/5">
                  <div className="text-[10px] font-bold text-slate-500 font-mono">CURRICULUM HIGHLIGHTS:</div>
                  <div className="space-y-2">
                    {activeMilestone.skillsLearned.map((skill, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span className="text-slate-300 font-medium">{skill} master syllabus</span>
                      </div>
                    ))}
                  </div>
                </div>

                {activeMilestone.status !== "Locked" ? (
                  <button
                    onClick={() => onOpenAssistant(`Explain and deep-dive into standard interview questions around: ${activeMilestone.skillsLearned.join(", ")}`, "tutor")}
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Analyze Step with AI Tutor</span>
                  </button>
                ) : (
                  <div className="p-3 bg-slate-950 text-slate-500 rounded-xl text-center text-xs font-bold border border-white/5">
                    🔐 Complete previous steps to unlock tutor options
                  </div>
                )}
              </div>
            );
          })()}
        </div>

      </div>

    </div>
  );
}
