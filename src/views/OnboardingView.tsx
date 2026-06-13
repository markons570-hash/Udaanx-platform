import { useState } from "react";
import { Sparkles, Calendar, BookOpen, Clock, Heart, Award, ChevronRight, ChevronLeft, Check, Compass, Terminal } from "lucide-react";
import Mascot from "../components/Mascot";
import { UserProfile, SubjectProgress, Task, Milestone } from "../types";

interface OnboardingViewProps {
  email: string;
  onCompleteOnboarding: (setup: {
    user: UserProfile;
    subjects: SubjectProgress[];
    milestones: Milestone[];
    tasks: Task[];
  }) => void;
  onBackToLogin: () => void;
}

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80"
];

export default function OnboardingView({ email, onCompleteOnboarding, onBackToLogin }: OnboardingViewProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState(
    email.split("@")[0].split(".").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "Scholar Name"
  );
  const [avatar, setAvatar] = useState(AVATAR_OPTIONS[0]);
  const [stream, setStream] = useState<"cs" | "fs" | "math" | "general">("general");
  const [entryPoint, setEntryPoint] = useState<"beginner" | "experienced">("beginner");
  const [commitment, setCommitment] = useState<"casual" | "regular" | "serious">("regular");

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBackToLogin();
    }
  };

  const handleFinish = () => {
    // Generate state according to entry point selection
    let userPoints = 0;
    let initialLvl = 1;
    let streakDays = 1;
    let completedLessonsCount = 0;

    // Commitment starting points
    if (commitment === "casual") userPoints = 50;
    if (commitment === "regular") userPoints = 150;
    if (commitment === "serious") userPoints = 300;

    let subProgress: SubjectProgress[] = [];
    let milestoneProgress: Milestone[] = [];
    let initialTasks: Task[] = [];

    if (entryPoint === "beginner") {
      // Clean slate Level 1
      subProgress = [
        { id: "sub1", name: "Data Structures", completedLessons: 0, totalLessons: 24, percentage: 0 },
        { id: "sub2", name: "Operating Systems", completedLessons: 0, totalLessons: 20, percentage: 0 },
        { id: "sub3", name: "DBMS", completedLessons: 0, totalLessons: 20, percentage: 0 },
        { id: "sub4", name: "Computer Networks", completedLessons: 0, totalLessons: 15, percentage: 0 },
        { id: "sub5", name: "Algorithms", completedLessons: 0, totalLessons: 20, percentage: 0 }
      ];

      milestoneProgress = [
        {
          id: "ms1",
          stepNumber: 1,
          title: "Fundamentals & Big O Analysis",
          description: "Acquire basic syntax skills, variable structures, sorting, array memory bounds, and logarithmic complexities.",
          status: "In Progress",
          skillsLearned: ["HTML/CSS", "Linear search", "Big-O Analysis", "Git Hooks"]
        },
        {
          id: "ms2",
          stepNumber: 2,
          title: "Frontend Engineering Core",
          description: "Explore atomic DOM hierarchies, React states hooks, flexbox grid layouts, and API fetching wrappers.",
          status: "Locked",
          skillsLearned: ["Vite Core", "Tailwind CSS", "Hook States", "JSON REST Fetch"]
        },
        {
          id: "ms3",
          stepNumber: 3,
          title: "Backend Servers & Express Routing",
          description: "Construct custom REST controllers using modular NodeJS servers, load middlewares, and secure access channels.",
          status: "Locked",
          skillsLearned: ["Express Framework", "Node Core", "API Proxies", "JWT Auth tokens"]
        },
        {
          id: "ms4",
          stepNumber: 4,
          title: "Databases & ORM Schemas",
          description: "Build relational database models, write queries, seed records, and synchronize SQL layouts.",
          status: "Locked",
          skillsLearned: ["SQL queries", "Drizzle Schema", "Join relations", "Indices indexing"]
        }
      ];

      initialTasks = [
        {
          id: "tsk-starter-1",
          title: "Complete your first lesson to earn study XP",
          type: "Quiz",
          status: "Pending",
          xpReward: 100,
          dueDate: "Today"
        },
        {
          id: "tsk-starter-2",
          title: "Introduce yourself in the Collaborate Forums",
          type: "Notes",
          status: "Pending",
          xpReward: 100,
          dueDate: "Today"
        },
        {
          id: "tsk-starter-3",
          title: "Ask the AI Tutor to explain complex topics",
          type: "Problem Set",
          status: "Pending",
          xpReward: 100,
          dueDate: "Today"
        }
      ];
    } else {
      // Experienced placement with Level 4 prefilled
      initialLvl = 4;
      userPoints = 2450;
      streakDays = 12;

      subProgress = [
        { id: "sub1", name: "Data Structures", completedLessons: 18, totalLessons: 24, percentage: 75 },
        { id: "sub2", name: "Operating Systems", completedLessons: 12, totalLessons: 20, percentage: 60 },
        { id: "sub3", name: "DBMS", completedLessons: 9, totalLessons: 20, percentage: 45 },
        { id: "sub4", name: "Computer Networks", completedLessons: 10, totalLessons: 15, percentage: 66 },
        { id: "sub5", name: "Algorithms", completedLessons: 15, totalLessons: 20, percentage: 75 }
      ];

      milestoneProgress = [
        {
          id: "ms1",
          stepNumber: 1,
          title: "Fundamentals & Big O Analysis",
          description: "Acquire basic syntax skills, variables structures, sorting, arrays memory bounds, and logarithmic complexities.",
          status: "Completed",
          skillsLearned: ["HTML/CSS", "Linear search", "Big-O Analysis", "Git Hooks"]
        },
        {
          id: "ms2",
          stepNumber: 2,
          title: "Frontend Engineering Core",
          description: "Explore atomic DOM hierarchies, React states hooks, flexbox grid layouts, and API fetching wrappers.",
          status: "Completed",
          skillsLearned: ["Vite Core", "Tailwind CSS", "Hook States", "JSON REST Fetch"]
        },
        {
          id: "ms3",
          stepNumber: 3,
          title: "Backend Servers & Express Routing",
          description: "Construct customs REST controllers using modular NodeJS servers, load middlewares, and secure access channels.",
          status: "In Progress",
          skillsLearned: ["Express Framework", "Node Core", "API Proxies", "JWT Auth tokens"]
        },
        {
          id: "ms4",
          stepNumber: 4,
          title: "Databases & ORM Schemas",
          description: "Build relational database models, write queries, seed records, and synchronize SQL layouts.",
          status: "Locked",
          skillsLearned: ["SQL queries", "Drizzle Schema", "Join relations", "Indices indexing"]
        }
      ];

      initialTasks = [
        {
          id: "tsk1",
          title: "Practice Stack and Queue questions on AI Tutor",
          type: "Quiz",
          status: "Pending",
          xpReward: 100,
          dueDate: "Today"
        },
        {
          id: "tsk2",
          title: "Upload OS Synchronization notes to summary scanner",
          type: "Notes",
          status: "In Progress",
          xpReward: 100,
          dueDate: "Today"
        },
        {
          id: "tsk3",
          title: "Submit Full-Stack Roadmap Step 3 assignment",
          type: "Problem Set",
          status: "Completed",
          xpReward: 100,
          dueDate: "Yesterday"
        }
      ];
    }

    const createdProfile: UserProfile = {
      email,
      name: name || "Scholar",
      avatarUrl: avatar,
      xpPoints: userPoints,
      xpRequired: 3000,
      level: initialLvl,
      studyStreak: streakDays,
      tasksDone: entryPoint === "experienced" ? 28 : 0,
      tasksTotal: entryPoint === "experienced" ? 40 : 3
    };

    onCompleteOnboarding({
      user: createdProfile,
      subjects: subProgress,
      milestones: milestoneProgress,
      tasks: initialTasks
    });
  };

  return (
    <div id="onboarding-container" className="relative bg-[#030712] min-h-screen text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-12 font-sans overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-3xl rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 overflow-hidden shadow-2xl p-6 sm:p-10 flex flex-col justify-between min-h-[580px]">
        
        {/* Step Indicator Top Bar */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span className="text-cyan-400">Onboarding Quest</span>
            <span>Step {step} of {totalSteps}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-950/80 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-300" 
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Dynamic step body switch */}
        <div className="my-auto py-8">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <Mascot expression="happy" size={120} className="shrink-0" />
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-2xl font-black text-white tracking-tight">Create your avatar & study track</h2>
                  <p className="text-xs text-slate-400 max-w-lg">
                    Welcome to **Udaan X**! In Khan Academy style, let's configure your profile detail so the AI tutor knows how to label your progress.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-2">
                {/* Profile Name & Avatar selector */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Your Display Name</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Arjun Patel"
                      className="w-full px-4 py-3 bg-slate-950/80 rounded-xl border border-white/10 text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Choose Avatar Icon</label>
                    <div className="flex gap-3">
                      {AVATAR_OPTIONS.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(img)}
                          className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                            avatar === img ? "border-cyan-400 scale-105 shadow-md shadow-cyan-400/20" : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Course stream selectors */}
                <div className="space-y-3">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Specialized Study Path</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStream("cs")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        stream === "cs" ? "bg-cyan-500/10 border-cyan-400 text-cyan-400" : "bg-slate-950/40 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-[11px] font-extrabold">🧠 Core CS</div>
                      <div className="text-[8px] mt-1 text-slate-500">DSA, OS, DBMS</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStream("fs")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        stream === "fs" ? "bg-cyan-500/10 border-cyan-400 text-cyan-400" : "bg-slate-950/40 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-[11px] font-extrabold">🚀 Full-Stack Web</div>
                      <div className="text-[8px] mt-1 text-slate-500">Node, React, APIs</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStream("math")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        stream === "math" ? "bg-cyan-500/10 border-cyan-400 text-cyan-400" : "bg-slate-950/40 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-[11px] font-extrabold">📐 Analytical Logic</div>
                      <div className="text-[8px] mt-1 text-slate-500">Linear Algebra & Logic</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStream("general")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        stream === "general" ? "bg-cyan-500/10 border-cyan-400 text-cyan-400" : "bg-slate-950/40 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-[11px] font-extrabold">🌐 General Scholar</div>
                      <div className="text-[8px] mt-1 text-slate-500">Mix of everything</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-[9px] font-bold text-cyan-400 uppercase tracking-widest mx-auto">
                <Compass className="w-3.5 h-3.5" />
                <span>EXPERIENCE LEVEL SELECTION</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white">How would you like to start?</h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Like Duolingo, we support both fresh academic beginnings and testing out to pre-fill standard profiles.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto text-left pt-4">
                {/* Pure Beginner Option */}
                <button
                  type="button"
                  onClick={() => setEntryPoint("beginner")}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all font-sans relative overflow-hidden ${
                    entryPoint === "beginner" 
                      ? "bg-slate-900 border-cyan-400 text-cyan-400 shadow-xl shadow-cyan-400/5 ring-1 ring-cyan-400/20" 
                      : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                  }`}
                >
                  <div className="absolute top-2 right-2">
                    {entryPoint === "beginner" && <div className="w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-black stroke-[3]" /></div>}
                  </div>
                  <div className="space-y-3">
                    <span className="text-2xl">🐣</span>
                    <div>
                      <h4 className="text-sm font-black text-white">Fresh Beginner (Level 1)</h4>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        Start fresh at **Level 1**, **0 XP**, and **0 completed lessons**. Build lists and unlock syllabus elements step by step!
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 w-full text-[10px] text-slate-500 font-semibold font-mono flex justify-between">
                    <span>INITIAL LEVEL: 1</span>
                    <span>COMPLETED UNIT: 0%</span>
                  </div>
                </button>

                {/* Placement Option */}
                <button
                  type="button"
                  onClick={() => setEntryPoint("experienced")}
                  className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all font-sans relative overflow-hidden ${
                    entryPoint === "experienced" 
                      ? "bg-slate-900 border-cyan-400 text-cyan-400 shadow-xl shadow-cyan-400/5 ring-1 ring-cyan-400/20" 
                      : "bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
                  }`}
                >
                  <div className="absolute top-2 right-2">
                    {entryPoint === "experienced" && <div className="w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-black stroke-[3]" /></div>}
                  </div>
                  <div className="space-y-3">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <h4 className="text-sm font-black text-white">Placement Skip (Level 4)</h4>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                        Instant unlock! Start at **Level 4** and **2450 XP** with prefilled milestones. Best for reviewing dashboards, charts, and job fits.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/5 w-full text-[10px] text-slate-500 font-semibold font-mono flex justify-between">
                    <span>INITIAL LEVEL: 4</span>
                    <span>COMPLETED UNIT: 75%</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-[9px] font-bold text-indigo-400 uppercase tracking-widest mx-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>DAILY LEARNING COMMITMENT</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white">Select your daily learning goal</h2>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Set a study timeline targets that fits around your schedule. We reward you based on consistency!
                </p>
              </div>

              <div className="space-y-2.5 max-w-md mx-auto text-left pt-2">
                {[
                  { value: "casual", label: "☕ Casual", desc: "5 mins a day — Perfect for staying sharp slowly.", xp: "+50 Onboarding XP Starter" },
                  { value: "regular", label: "📚 Regular", desc: "15 mins a day — Great for steady course acceleration.", xp: "+150 Onboarding XP Starter" },
                  { value: "serious", label: "🔥 Intense", desc: "30 mins a day — Serious bootcamp acceleration path.", xp: "+300 Onboarding XP Starter" }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setCommitment(item.value as any)}
                    className={`w-full p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                      commitment === item.value 
                        ? "bg-slate-900 border-indigo-400 text-indigo-300 shadow-lg" 
                        : "bg-slate-950/40 border-white/5 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-black text-white">{item.label}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{item.desc}</div>
                    </div>
                    <span className={`text-[9px] font-mono font-bold px-2 py-1 rounded ${
                      commitment === item.value ? "bg-indigo-500/20 text-indigo-400" : "bg-slate-900 text-slate-500"
                    }`}>
                      {item.xp}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-center space-x-2 text-[10px] text-emerald-400 font-semibold bg-emerald-500/5 px-4 py-2.5 rounded-xl border border-emerald-500/10 max-w-md mx-auto">
                <Award className="w-4 h-4 flex-shrink-0" />
                <span>You can adjust this target anytime within your personal settings dashboard.</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Footer Row */}
        <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-4">
          <button
            onClick={handleBack}
            className="px-4 py-2.5 hover:bg-white/5 text-[11px] font-bold text-slate-400 hover:text-white transition-colors flex items-center space-x-1 rounded-xl cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{step === 1 ? "Cancel/Back" : "Go Back"}</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs tracking-tight transition-all rounded-xl cursor-pointer flex items-center space-x-1 shadow-md shadow-cyan-400/15 active:scale-95 transform"
          >
            <span>{step === totalSteps ? "Launch Learning Path 🚀" : "Continue"}</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>
    </div>
  );
}
