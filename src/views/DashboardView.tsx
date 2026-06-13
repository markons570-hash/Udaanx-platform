/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { 
  Sparkles, Bell, Calendar, Search, ChevronRight, User, LogOut, CheckCircle, Circle, Plus, AlertCircle, PlusCircle, MinusCircle, Award, Flame, CheckSquare
} from "lucide-react";
import Mascot from "../components/Mascot";
import { SubjectProgress, Task, UserProfile } from "../types";

interface DashboardViewProps {
  user: UserProfile;
  subjects: SubjectProgress[];
  tasks: Task[];
  onClaimCheckin: () => void;
  onUpdateSubjectCompleted: (id: string, delta: number) => void;
  onAddTask: (title: string, type: Task["type"]) => void;
  onToggleTaskChecked: (id: string) => void;
  onOpenAssistant: (initialPrompt?: string, mode?: string) => void;
  onNavigateTab: (tab: string) => void;
  hasClaimedCheckin: boolean;
}

export default function DashboardView({
  user,
  subjects,
  tasks,
  onClaimCheckin,
  onUpdateSubjectCompleted,
  onAddTask,
  onToggleTaskChecked,
  onOpenAssistant,
  onNavigateTab,
  hasClaimedCheckin
}: DashboardViewProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState<Task["type"]>("Quiz");
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const handleAddNewTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    onAddTask(newTaskTitle, newTaskType);
    setNewTaskTitle("");
  };

  // Dynamically calculate progress metrics based on real subjects data
  const totalCompleted = subjects.reduce((sum, s) => sum + s.completedLessons, 0);
  const totalLessons = subjects.reduce((sum, s) => sum + s.totalLessons, 0);
  const overallProgressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Circular progress SVG variables
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallProgressPercent / 100) * circumference;

  return (
    <div id="dashboard-hub" className="space-y-6 text-left pb-12">
      {/* Top navbar containing contextual breadcrumb search & notification alerts */}
      <div className="flex flex-col sm:flex-row justify-between items-center glass-panel p-4 rounded-2xl gap-4">
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search for topics, courses, resources..."
            className="w-full bg-slate-950/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none border border-white/5 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center space-x-4 self-end sm:self-auto">
          {/* Calendar Indicator */}
          <div className="p-2 bg-slate-950/60 rounded-xl border border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1.5 text-xs font-semibold">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">June 10, 2026</span>
          </div>

          {/* Alarm notification */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationPopup(!showNotificationPopup)}
              className="p-2.5 bg-slate-950/60 rounded-xl border border-white/5 text-slate-400 hover:text-white transition-colors relative cursor-pointer"
            >
              <Bell className="w-4.5 h-4.5 text-cyan-400" />
              {tasks.filter(t => t.status !== "Completed").length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
              )}
            </button>
            {showNotificationPopup && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-white/10 rounded-xl p-4 shadow-xl z-50 text-xs text-left">
                <div className="font-bold text-white pb-2 border-b border-white/5 flex justify-between">
                  <span>Pending Alerts</span>
                  <span className="text-cyan-400">{tasks.filter(t => t.status !== "Completed").length} Active</span>
                </div>
                <div className="space-y-2.5 pt-2 max-h-48 overflow-y-auto">
                  {tasks.filter(t => t.status !== "Completed").length === 0 ? (
                    <div className="text-slate-500 italic py-2">No remaining deadlines for today. Good job!</div>
                  ) : (
                    tasks.filter(t => t.status !== "Completed").map(t => (
                      <div key={t.id} className="flex justify-between items-start">
                        <div className="text-slate-300 font-medium leading-normal pr-2">{t.title}</div>
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold scale-90">{t.type}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mini profile pill */}
          <div className="flex items-center space-x-2.5 bg-slate-950/80 p-1.5 pr-4 rounded-xl border border-white/5">
            <img className="w-8 h-8 rounded-lg object-cover border border-cyan-400/30" src={user.avatarUrl} alt="User Avatar" />
            <div className="text-left">
              <div className="text-xs font-bold text-white leading-none">{user.name}</div>
              <div className="text-[10px] text-cyan-400 font-bold mt-0.5">Lvl {user.level} Standard Scholar</div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Greetings Row with Mascot & Motivation widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Good night companion briefing card */}
        <div id="ai-companion-briefing" className="lg:col-span-2 rounded-2xl glass-panel p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shadow-xl animate-fadeIn">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
          
          <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5">
            <Mascot expression="happy" size={130} />
          </div>

          <div className="space-y-4 flex-1 text-center md:text-left">
            <div>
              <div className="text-xl md:text-2xl font-black text-white">
                Good evening, <span className="bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">{user.name}</span>! 👋
              </div>
              <p className="text-slate-300 text-xs md:text-sm leading-relaxed mt-2">
                I'm your AI learning assistant. I can help you with study topics, explanations, summaries, practice questions, and much more. What would you like to know today?
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => onOpenAssistant("Explain Binary Search in Simple Analogy", "tutor")}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-all flex items-center space-x-1.5 cursor-pointer shadow-md shadow-cyan-500/15"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chat with AI Tutor</span>
              </button>
              <button
                onClick={() => onNavigateTab("study")}
                className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white font-bold text-xs transition-all cursor-pointer"
              >
                Browse Study Library
              </button>
            </div>
          </div>
        </div>

        {/* Daily Motivation & Check-in streak trigger card */}
        <div id="motivation-streak" className="rounded-2xl glass-panel p-6 flex flex-col justify-between shadow-xl text-left animate-fadeIn">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Daily Motivation</span>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>Level up!</span>
            </span>
          </div>

          <div className="my-5 flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-orange-950/80 border border-orange-500/30 flex items-center justify-center shadow-lg">
              <Flame className="w-7 h-7 text-orange-500 fill-orange-500 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-orange-500/10 text-[10px] font-bold text-orange-400 uppercase">
                Active Streak
              </div>
              <div className="text-2xl font-black text-white">{user.studyStreak} Days</div>
              <div className="text-[11px] text-slate-500">Current Study Streak tracker</div>
            </div>
          </div>

          <button
            onClick={onClaimCheckin}
            disabled={hasClaimedCheckin}
            className={`w-full py-3.5 rounded-xl text-center font-black text-xs transition-all shadow-md transform active:scale-95 cursor-pointer ${
              hasClaimedCheckin
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-none cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/15"
            }`}
          >
            {hasClaimedCheckin ? "✓ COPILOT CHECKED IN (+500 XP SECURED)" : "CLAIM DAILY CHECK-IN (+500 XP)"}
          </button>
        </div>

      </div>

      {/* Middle Grid Row: Core Metric Ring & Linear bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Overall Circle progress ring */}
        <div className="rounded-2xl glass-panel p-6 flex flex-col justify-between shadow-lg animate-fadeIn">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Overall Progress</span>
          
          <div className="my-3 flex items-center justify-center">
            <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
                {/* Background track circle */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="8"
                />
                {/* Active progress circle indicator */}
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  fill="transparent"
                  stroke="#00e5ff"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <div className="text-2xl font-black text-white">{overallProgressPercent}%</div>
                <div className="text-[8px] font-black text-cyan-400 uppercase tracking-widest">
                  {overallProgressPercent >= 75 ? "Excellent" : overallProgressPercent >= 40 ? "Steady" : overallProgressPercent > 0 ? "Started" : "Beginner"}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-400 font-medium">Keep completing lessons to earn XP bonuses.</div>
        </div>

        {/* 2. Lessons Completed Numeric metrics */}
        <div className="rounded-2xl glass-panel p-6 flex flex-col justify-between shadow-lg animate-fadeIn">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Lessons Completed</span>
          
          <div className="my-auto py-4">
            <span className="text-5xl font-black text-white tracking-tight">{totalCompleted}</span>
            <div className="text-xs font-bold text-emerald-400 mt-2 flex items-center space-x-1">
              <span>{overallProgressPercent > 0 ? `+${totalCompleted} total units` : "Start lessons below"}</span>
              <span className="text-[10px] text-slate-500 font-normal">({totalLessons - totalCompleted} remaining)</span>
            </div>
          </div>

          {/* Custom SVG line bar decoration */}
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallProgressPercent}%` }} />
          </div>
        </div>

        {/* 3. Level Progression metrics */}
        <div className="rounded-2xl glass-panel p-6 flex flex-col justify-between shadow-lg animate-fadeIn">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Level Status</span>
          
          <div className="my-auto py-4">
            <div className="text-2xl font-black text-white flex items-baseline space-x-1.5">
              <span>Lvl {user.level}</span>
              <span className="text-xs font-bold text-cyan-400">({user.xpPoints}/3000 XP)</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1.5 leading-normal">
              Earn {3000 - user.xpPoints} more XP to reach **Level {user.level + 1}**.
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-bold text-slate-500">
              <span>PROGRES</span>
              <span>{Math.round((user.xpPoints / 3000) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500" 
                style={{ width: `${(user.xpPoints / 3000) * 100}%` }} 
              />
            </div>
          </div>
        </div>

      </div>

      {/* Main Core Content Row: Subject list & Task timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Subject progression panel */}
        <div className="lg:col-span-2 rounded-2xl glass-panel p-6 space-y-6 shadow-xl text-left animate-fadeIn">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-white tracking-tight">Subject-wise Progress</h2>
              <p className="text-[11px] text-slate-500">Click lessons to adjust completed counts (Awards XP!).</p>
            </div>
            <button 
              onClick={() => onNavigateTab("progress")}
              className="text-cyan-400 hover:text-cyan-300 font-extrabold text-xs transition-colors flex items-center cursor-pointer"
            >
              <span>View Analytics</span>
              <ChevronRight className="w-3.5 h-3.5 mt-0.5" />
            </button>
          </div>

          <div className="space-y-5">
            {subjects.map((sub) => (
              <div key={sub.id} className="space-y-2 bg-slate-950/30 p-3.5 rounded-xl border border-white/5">
                <div className="flex justify-between items-center font-bold text-xs">
                  <span className="text-slate-200">{sub.name}</span>
                  
                  {/* Progress adjusting controls */}
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => onUpdateSubjectCompleted(sub.id, -1)}
                      className="text-slate-500 hover:text-rose-400 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      title="Completed 1 lesson less"
                    >
                      <MinusCircle className="w-4.5 h-4.5" />
                    </button>
                    <span className="font-mono text-slate-300 px-1.5 py-0.5 bg-slate-900 rounded border border-white/5 text-[10px]">
                      {sub.completedLessons} / {sub.totalLessons}
                    </span>
                    <button 
                      onClick={() => onUpdateSubjectCompleted(sub.id, 1)}
                      className="text-slate-500 hover:text-cyan-400 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      title="Completed 1 lesson more! (+100 XP)"
                    >
                      <PlusCircle className="w-4.5 h-4.5" />
                    </button>
                    <span className="text-cyan-400 font-semibold pl-2">{sub.percentage}%</span>
                  </div>
                </div>

                {/* Performance linear bar */}
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5 relative">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${sub.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Task timeline manager */}
        <div className="rounded-2xl glass-panel p-6 space-y-5 shadow-xl text-left flex flex-col justify-between animate-fadeIn">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-black text-white tracking-tight flex items-center space-x-2">
                <CheckSquare className="w-4.5 h-4.5 text-cyan-400" />
                <span>Upcoming Tasks</span>
              </h2>
              <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                TODAY
              </span>
            </div>

            {/* Quick append Task form */}
            <form onSubmit={handleAddNewTask} className="flex gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-white/5">
              <input
                type="text"
                required
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a custom study task..."
                className="flex-1 bg-transparent px-2.5 py-1 text-xs text-white placeholder-slate-600 focus:outline-none"
              />
              <select
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value as Task["type"])}
                className="bg-slate-900 border border-white/5 rounded px-2 py-0.5 text-[10px] text-slate-400 font-bold focus:outline-none"
              >
                <option value="Quiz">Quiz</option>
                <option value="Problem Set">P-Set</option>
                <option value="Notes">Notes</option>
                <option value="Exam">Exam</option>
              </select>
              <button
                type="submit"
                className="p-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black cursor-pointer shadow-md"
              >
                <Plus className="w-4.5 h-4.5 stroke-[3]" />
              </button>
            </form>

            {/* Task rows list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-0.5 select-none text-left">
              {tasks.length === 0 ? (
                <div className="text-slate-500 italic py-6 text-center text-xs">No tasks mapped out yet.</div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                      task.status === "Completed"
                        ? "bg-slate-950/10 border-white/5 opacity-50"
                        : "bg-slate-950/40 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <button
                      onClick={() => onToggleTaskChecked(task.id)}
                      className="mt-0.5 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {task.status === "Completed" ? (
                        <CheckCircle className="w-4.5 h-4.5 text-cyan-400 fill-cyan-400/20" />
                      ) : (
                        <Circle className="w-4.5 h-4.5 text-slate-600 hover:text-cyan-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold leading-normal truncate ${task.status === "Completed" ? "line-through text-slate-500" : "text-slate-200"}`}>
                        {task.title}
                      </div>
                      <div className="flex items-center space-x-2 mt-1.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950/40 text-cyan-300 uppercase tracking-wide">
                          {task.type}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 font-bold">
                          +{task.xpReward} XP
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 font-bold">• Due {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="text-[10px] text-slate-500 leading-normal flex items-center space-x-1.5 border-t border-white/5 pt-3">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 text-cyan-500" />
            <span>Completing upcoming tasks gives you bonus level progression XP points.</span>
          </div>
        </div>

      </div>

      {/* Bottom Media Card Deck: Recommended for you */}
      <div className="rounded-2xl glass-panel p-6 space-y-4 shadow-xl text-left animate-fadeIn">
        <h2 className="text-base font-black text-white tracking-tight">Recommended study modules for you</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-3 hover:border-cyan-400/30 transition-all flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full">TUTORIAL VIDEO</span>
              <h3 className="text-xs font-bold text-white">Dynamic Programming: Kadane's Model</h3>
              <p className="text-[11px] text-slate-400">Master continuous subarray optimizations instantly.</p>
            </div>
            <button 
              onClick={() => onOpenAssistant("Explain dynamic programming Kadane's algorithm", "tutor")}
              className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors border border-white/5 cursor-pointer"
            >
              🚀 Analyze with AI Tutor
            </button>
          </div>

          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-3 hover:border-cyan-400/30 transition-all flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full">HIGH-YIELD PDF</span>
              <h3 className="text-xs font-bold text-white">Top 50 Data Structures Scenarios</h3>
              <p className="text-[11px] text-slate-400">Exam-centric Cheat Sheets tailored for universities.</p>
            </div>
            <button 
              onClick={() => onOpenAssistant("Provide summary of top 10 data structure interview topics for computer science exam", "summary")}
              className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors border border-white/5 cursor-pointer"
            >
              ⚡ Generate Exam Summary
            </button>
          </div>

          <div className="bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-3 hover:border-cyan-400/30 transition-all flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[9px] uppercase font-bold text-pink-400 bg-pink-950 px-2 py-0.5 rounded-full">ARTICLE</span>
              <h3 className="text-xs font-bold text-white">Microservice Load Balancing Standards</h3>
              <p className="text-[11px] text-slate-400">System design fundamentals for scalable servers.</p>
            </div>
            <button 
              onClick={() => onOpenAssistant("Explain Microservice Load balancing algorithms", "tutor")}
              className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-pink-400 hover:text-pink-300 transition-colors border border-white/5 cursor-pointer"
            >
              🎓 Read with AI Co-Pilot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
