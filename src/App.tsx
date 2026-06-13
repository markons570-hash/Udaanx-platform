/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Sparkles, LayoutDashboard, MessageSquare, BookOpen, Compass, Users, TrendingUp, Briefcase, Settings, LogOut, ChevronRight, Share, Award
} from "lucide-react";

import { UserProfile, SubjectProgress, Task, CourseModule, Milestone, DiscussionThread } from "./types";
import LandingView from "./views/LandingView";
import LoginView from "./views/LoginView";
import CustomOnboardingView from "./views/OnboardingView";
import DashboardView from "./views/DashboardView";
import AssistantView from "./views/AssistantView";
import StudyView from "./views/StudyView";
import RoadmapView from "./views/RoadmapView";
import CommunityView from "./views/CommunityView";
import ProgressView from "./views/ProgressView";

export default function App() {
  // Navigation states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard"); // main tabs
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingEmail, setOnboardingEmail] = useState("");

  // Assistant cross-linking parameters
  const [assistantPrompt, setAssistantPrompt] = useState("");
  const [assistantMode, setAssistantMode] = useState("tutor");

  // Daily checkin claim lock
  const [hasClaimedCheckin, setHasClaimedCheckin] = useState(false);

  // User profiles
  const [user, setUser] = useState<UserProfile>({
    email: "student@university.edu",
    name: "Google Scholar",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    xpPoints: 2450,
    xpRequired: 3000,
    level: 4,
    studyStreak: 12,
    tasksDone: 28,
    tasksTotal: 40
  });

  // Subjects lists
  const [subjects, setSubjects] = useState<SubjectProgress[]>([
    { id: "sub1", name: "Data Structures", completedLessons: 18, totalLessons: 24, percentage: 85 },
    { id: "sub2", name: "Operating Systems", completedLessons: 12, totalLessons: 20, percentage: 72 },
    { id: "sub3", name: "DBMS", completedLessons: 9, totalLessons: 20, percentage: 60 },
    { id: "sub4", name: "Computer Networks", completedLessons: 10, totalLessons: 15, percentage: 66 },
    { id: "sub5", name: "Algorithms", completedLessons: 15, totalLessons: 20, percentage: 75 }
  ]);

  // Tasks lists
  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  // Catalog items
  const [courses] = useState<CourseModule[]>([
    {
      id: "c1",
      title: "Asymptotic Analysis & Big O Complexity",
      category: "Computer Science",
      progress: 90,
      duration: "45 mins",
      description: "Analyze how program performance scales with input size and master worst-case performance tags.",
      resourceType: "video",
      resourceTitle: "Mastering Big O Fundamentals"
    },
    {
      id: "c2",
      title: "Process Synchronization & Semaphore Locks",
      category: "Computer Science",
      progress: 60,
      duration: "1 hr 10 mins",
      description: "Understand multithreading hazards, mutex controls, and critical sections inside kernel stacks.",
      resourceType: "video",
      resourceTitle: "Visualizing Mutex & Semaphores"
    },
    {
      id: "c3",
      title: "Linear Algebra: Vector Transformations",
      category: "Mathematics",
      progress: 35,
      duration: "1 hr 30 mins",
      description: "Deep dive into matrix projections, dot products, vector spaces, and eigen transformations.",
      resourceType: "pdf",
      resourceTitle: "Matrix Projections cheat sheet"
    },
    {
      id: "c4",
      title: "SQL Normalization: Third Normal Form (3NF)",
      category: "Computer Science",
      progress: 70,
      duration: "50 mins",
      description: "Deconstruct redundant field structures, transitive dependencies, and logical key dividers.",
      resourceType: "pdf",
      resourceTitle: "Normalization Rules Handout"
    },
    {
      id: "c5",
      title: "Effective Technical Writing for Engineers",
      category: "Soft Skills",
      progress: 25,
      duration: "35 mins",
      description: "Master summarizing compiler errors, drafting comprehensive architecture designs, and clear documentation.",
      resourceType: "article",
      resourceTitle: "RFC Documentation standards"
    }
  ]);

  // Roadmaps steps
  const [milestones, setMilestones] = useState<Milestone[]>([
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
  ]);

  // Community discussion threads
  const [threads, setThreads] = useState<DiscussionThread[]>([
    {
      id: "th1",
      title: "Are we expected to handle concurrent semaphore deadlocks in DBMS final exams??",
      content: "Hi all, our lecture touched briefly on circular waits but database transactions also feature rigorous lock controls. Do professors usually test the physical lock manager code or just logical locking formulas?",
      authorName: "Arjun Patel",
      authorRole: "Sophomore Core CS",
      authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80",
      upvotes: 24,
      replies: 8,
      category: "Computer Science",
      relativeTime: "2 hrs"
    },
    {
      id: "th2",
      title: "Kadane's Dynamic Programming loop explanation for absolute beginners",
      content: "Kadane's algorithm works by carrying current subarray max and global max. If your sum falls below zero, reset current sum to zero. Here's a quick visualization of indices checking array ranges.",
      authorName: "Divya Shah",
      authorRole: "Graduate Assistant",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      upvotes: 42,
      replies: 12,
      category: "Algorithms",
      relativeTime: "4 hrs"
    }
  ]);

  // XP progression engine
  const awardXP = (pts: number) => {
    setUser(prev => {
      let nextXP = prev.xpPoints + pts;
      let nextLvl = prev.level;
      if (nextXP >= 3000) {
        nextXP = nextXP - 3000;
        nextLvl += 1;
      }
      return {
        ...prev,
        xpPoints: nextXP,
        level: nextLvl
      };
    });
  };

  // Actions custom handlers
  const handleClaimCheckin = () => {
    if (hasClaimedCheckin) return;
    setHasClaimedCheckin(true);
    awardXP(500);
  };

  const handleUpdateSubjectCompleted = (id: string, delta: number) => {
    setSubjects(prev =>
      prev.map(sub => {
        if (sub.id === id) {
          const newCompleted = Math.max(0, Math.min(sub.totalLessons, sub.completedLessons + delta));
          const newPercent = Math.round((newCompleted / sub.totalLessons) * 100);
          
          // Award XP bonus only if count increased
          if (delta > 0 && newCompleted > sub.completedLessons) {
            awardXP(100);
          }

          return {
            ...sub,
            completedLessons: newCompleted,
            percentage: newPercent
          };
        }
        return sub;
      })
    );
  };

  const handleAddTask = (title: string, type: Task["type"]) => {
    const newTask: Task = {
      id: "tsk-" + Date.now(),
      title,
      type,
      status: "Pending",
      xpReward: 100,
      dueDate: "Today"
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggleTaskChecked = (id: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const newStatus = task.status === "Completed" ? "Pending" : "Completed";
          if (newStatus === "Completed") {
            awardXP(task.xpReward);
          }
          return {
            ...task,
            status: newStatus
          };
        }
        return task;
      })
    );
  };

  const handleAddPost = (title: string, content: string, category: string) => {
    const newThread: DiscussionThread = {
      id: "th-" + Date.now(),
      title,
      content,
      category,
      authorName: user.name,
      authorRole: "Standard Scholar",
      authorAvatar: user.avatarUrl,
      upvotes: 1,
      replies: 0,
      relativeTime: "Just now"
    };
    setThreads(prev => [newThread, ...prev]);
    awardXP(200); // Posting rewards XP
  };

  const handleUpvotePost = (id: string) => {
    setThreads(prev =>
      prev.map(th => {
        if (th.id === id) {
          return { ...th, upvotes: th.upvotes + 1 };
        }
        return th;
      })
    );
  };

  const handleOpenAssistant = (prompt?: string, mode?: string) => {
    if (prompt) setAssistantPrompt(prompt);
    if (mode) setAssistantMode(mode);
    setActiveTab("assistant");
  };

  const handleLoginSuccess = (email: string) => {
    setUser(prev => ({
      ...prev,
      email: email,
      name: email.split("@")[0].split(".").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") || "Arjun Patel"
    }));
    setIsLoggedIn(true);
    setShowLoginPage(false);
    setActiveTab("dashboard");
  };

  // Navigations sidebar tabs loop list
  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "assistant", label: "AI Assistant", icon: MessageSquare, badge: true },
    { id: "study", label: "Study Hub", icon: BookOpen },
    { id: "roadmap", label: "Custom Roadmap", icon: Compass },
    { id: "community", label: "Collaborate Feed", icon: Users },
    { id: "progress", label: "Analytics Diagrams", icon: TrendingUp },
    { id: "career", label: "Career Search", icon: Briefcase },
    { id: "settings", label: "Credentials Key", icon: Settings },
  ];

  // Routing conditional rendering
  if (!isLoggedIn) {
    if (showOnboarding) {
      return (
        <CustomOnboardingView
          email={onboardingEmail}
          onCompleteOnboarding={(setup) => {
            setUser(setup.user);
            setSubjects(setup.subjects);
            setMilestones(setup.milestones);
            setTasks(setup.tasks);
            setIsLoggedIn(true);
            setShowOnboarding(false);
            setShowLoginPage(false);
            setActiveTab("dashboard");
          }}
          onBackToLogin={() => {
            setShowOnboarding(false);
            setShowLoginPage(true);
          }}
        />
      );
    }
    if (showLoginPage) {
      return (
        <LoginView 
          onLoginSuccess={handleLoginSuccess} 
          onSignUpNewUser={(email) => {
            setOnboardingEmail(email);
            setShowOnboarding(true);
          }}
          onBack={() => setShowLoginPage(false)} 
        />
      );
    }
    return (
      <LandingView 
        onNavigate={(tab) => {
          if (tab === "home") setShowLoginPage(false);
        }} 
        onLoginClick={() => setShowLoginPage(true)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans overflow-x-hidden">
      
      {/* 1. LEFT COLUMN SIDEBAR */}
      <aside className="w-64 bg-[#0a0f1d] border-r border-white/5 flex flex-col justify-between p-5 hidden md:flex shrink-0">
        
        <div className="space-y-6">
          {/* Logo brand */}
          <div className="flex items-center space-x-3 pb-3 border-b border-white/5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center border border-cyan-400/20">
              <Sparkles className="w-4 h-4 text-black" />
            </div>
            <span className="text-base font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
              Udaan <span className="text-cyan-400">X</span>
            </span>
          </div>

          {/* Links navigation directories */}
          <nav className="space-y-1.5 text-left">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                    isActive
                      ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Upgrade block, User capsule & logout */}
        <div className="space-y-5 text-left">
          
          {/* Promotional Pro card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-2.5">
            <div className="text-xs font-black text-white flex items-center space-x-1">
              <span>⭐ Upgrade to Pro</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-normal">
              Unlock ultimate AI models, personalized roadmap details, and mock tests.
            </p>
            <button
              onClick={() => alert("Udaan X Pro tier checkout is integrated. Setup process.env.STRIPE_SECRET_KEY to complete.")}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1 transition-colors hover:underline cursor-pointer"
            >
              <span>Unlock all features</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Progress capsule */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex items-center space-x-2.5">
              <img className="w-9 h-9 rounded-full object-cover border border-cyan-400/20" src={user.avatarUrl} alt={user.name} />
              <div>
                <div className="text-xs font-bold text-white leading-none">{user.name}</div>
                <div className="text-[10px] text-orange-400 font-bold mt-1">🔥 {user.studyStreak} Days Streak</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[8px] font-bold text-slate-500">
                <span>XP PROGRESS</span>
                <span>{user.xpPoints} / 3000 XP</span>
              </div>
              <div className="w-full h-1 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500" style={{ width: `${(user.xpPoints / 3000) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Exit door action link */}
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setActiveTab("dashboard");
            }}
            className="w-full pt-1 text-xs font-bold text-rose-500 hover:text-rose-400 flex items-center space-x-2.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* 2. RIGHT MASS CONTAINER COLUMN */}
      <main className="flex-1 min-w-0 bg-[#030712] p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
        
        {/* Render Mobile menu header bar if window is narrow */}
        <div className="md:hidden flex justify-between items-center bg-[#0a0f1d] p-3.5 rounded-xl border border-white/5 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center border border-cyan-400/20">
              <Sparkles className="w-4.5 h-4.5 text-black" />
            </div>
            <span className="text-sm font-bold text-white">Udaan X</span>
          </div>

          {/* Quick select directory tabs slider for compact devices */}
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-slate-950 border border-white/15 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none"
          >
            {sidebarLinks.map(link => (
              <option key={link.id} value={link.id}>{link.label}</option>
            ))}
            <option value="logout">Logout Account</option>
          </select>
        </div>

        {/* Tab routing container */}
        <div className="flex-grow">
          {activeTab === "dashboard" && (
            <DashboardView
              user={user}
              subjects={subjects}
              tasks={tasks}
              hasClaimedCheckin={hasClaimedCheckin}
              onClaimCheckin={handleClaimCheckin}
              onUpdateSubjectCompleted={handleUpdateSubjectCompleted}
              onAddTask={handleAddTask}
              onToggleTaskChecked={handleToggleTaskChecked}
              onOpenAssistant={handleOpenAssistant}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === "assistant" && (
            <AssistantView
              user={user}
              initialPrompt={assistantPrompt}
              initialMode={assistantMode}
              onClearInitialState={() => {
                setAssistantPrompt("");
              }}
            />
          )}

          {activeTab === "study" && (
            <StudyView
              courses={courses}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === "roadmap" && (
            <RoadmapView
              milestones={milestones}
              onOpenAssistant={handleOpenAssistant}
            />
          )}

          {activeTab === "community" && (
            <CommunityView
              threads={threads}
              onAddPost={handleAddPost}
              onUpvotePost={handleUpvotePost}
            />
          )}

          {activeTab === "progress" && (
            <ProgressView
              user={user}
              subjects={subjects}
            />
          )}

          {activeTab === "career" && (
            <div className="space-y-6 text-left">
              <div className="bg-slate-900/30 p-6 rounded-2xl border border-white/5 space-y-1">
                <h2 className="text-xl font-black text-white">Career Search Engine</h2>
                <p className="text-xs text-slate-400">Match your completed milestones and XP achievements directly to active internships and junior roles.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0a0f1d]/20 border border-white/5 p-5 rounded-2xl space-y-4">
                  <div className="text-xs font-extrabold text-cyan-400">MATCHED PROFILE ROLES</div>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-white">Junior Web Developer</div>
                        <div className="text-[10px] text-slate-500 mt-1">Requires Fundamentals + Frontend (Unlocked)</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">92% Match</span>
                    </div>

                    <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-white">Associate Frontend Tech</div>
                        <div className="text-[10px] text-slate-500 mt-1">Requires React + Styling frameworks</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">85% Match</span>
                    </div>

                    <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5 flex justify-between items-center opacity-50">
                      <div>
                        <div className="text-xs font-bold text-white">Backend Systems Intern</div>
                        <div className="text-[10px] text-slate-500 mt-1">Requires Backend Node + SQL databases (Locked)</div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">35% Match</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0f1d]/20 border border-white/5 p-5 rounded-2xl space-y-4">
                  <div className="text-xs font-extrabold text-indigo-400">UPCOMING HACKATHONS</div>
                  <div className="p-4 bg-gradient-to-br from-indigo-950/20 to-slate-950 rounded-xl border border-indigo-500/10 space-y-3">
                    <h4 className="text-xs font-bold text-white">Google Space Hack 2026</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">Assemble a team inside Collaborate boards and present functional AI companion prototypes. Exciting token grants await.</p>
                    <button 
                      onClick={() => handleOpenAssistant("Draft a full high impact team proposal and project ideas for Google Space Hack 2026 using web technologies", "summary")}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Brainstorm with AI</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 text-left">
              <div className="bg-slate-900/30 p-6 rounded-2xl border border-white/5 space-y-1">
                <h2 className="text-xl font-black text-white font-sans">Settings & Credentials</h2>
                <p className="text-xs text-slate-400">Confirm your secure configuration parameters below. Secrets are injected at runtime.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0a0f1d]/20 border border-white/5 p-5 rounded-2xl space-y-4">
                  <div className="text-xs font-extrabold text-cyan-400 uppercase tracking-widest">Environment Variables</div>
                  
                  <div className="space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-slate-500 block uppercase">Gemini API Connection Code</label>
                      <div className="p-3.5 bg-slate-950/80 rounded-xl border border-white/5 text-xs font-mono text-slate-400 flex justify-between items-center">
                        <span>GEMINI_API_KEY = "********"</span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">AUTO INJECTED</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold text-slate-500 block uppercase font-mono">App URL Anchor</label>
                      <div className="p-3.5 bg-slate-950/80 rounded-xl border border-white/5 text-xs font-mono text-slate-400">
                        APP_URL = "https://ais-dev..."
                      </div>
                    </div>
                  </div>

                  <div className="p-3 text-[11px] text-slate-500 leading-normal bg-slate-950/40 rounded-xl border border-white/5">
                    🔒 Highly encoded sessions. To supply a new private token, visit the AI Studio Secrets panel in the sidebar menu. Do not write keys in plain text.
                  </div>
                </div>

                <div className="bg-[#0a0f1d]/20 border border-white/5 p-5 rounded-2xl space-y-4 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="text-xs font-extrabold text-rose-500 uppercase tracking-widest">Danger Zone & RESET</div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-white">Reset Course Curriculum</h4>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Want to start clean at **Level 1** with 0 XP completed units, or update your specialized subject stream? You can re-run the interactive onboarding wizard anytime.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <button
                      onClick={() => {
                        setOnboardingEmail(user.email);
                        setIsLoggedIn(false);
                        setShowOnboarding(true);
                      }}
                      className="w-full text-center py-2.5 bg-slate-950 hover:bg-slate-900 border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:text-rose-300 rounded-xl text-xs font-black transition-all cursor-pointer"
                    >
                      Re-run Onboarding Setup Wizard
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to instantly hard reset all progress to zero (Level 1, 0 XP)?")) {
                          setUser(prev => ({
                            ...prev,
                            level: 1,
                            xpPoints: 0,
                            studyStreak: 1,
                            tasksDone: 0,
                            tasksTotal: 3
                          }));
                          setSubjects([
                            { id: "sub1", name: "Data Structures", completedLessons: 0, totalLessons: 24, percentage: 0 },
                            { id: "sub2", name: "Operating Systems", completedLessons: 0, totalLessons: 20, percentage: 0 },
                            { id: "sub3", name: "DBMS", completedLessons: 0, totalLessons: 20, percentage: 0 },
                            { id: "sub4", name: "Computer Networks", completedLessons: 0, totalLessons: 15, percentage: 0 },
                            { id: "sub5", name: "Algorithms", completedLessons: 0, totalLessons: 20, percentage: 0 }
                          ]);
                          setMilestones([
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
                          ]);
                          setTasks([
                            { id: "tsk-starter-1", title: "Complete your first lesson to earn study XP", type: "Quiz", status: "Pending", xpReward: 100, dueDate: "Today" },
                            { id: "tsk-starter-2", title: "Introduce yourself in the Collaborate Forums", type: "Notes", status: "Pending", xpReward: 100, dueDate: "Today" },
                            { id: "tsk-starter-3", title: "Ask the AI Tutor to explain complex topics", type: "Problem Set", status: "Pending", xpReward: 100, dueDate: "Today" }
                          ]);
                          alert("Curriculum reset successful! You are now at Level 1, 0 XP, 0 completed units.");
                        }
                      }}
                      className="w-full text-center py-2 bg-slate-950/40 hover:bg-slate-950 text-slate-500 hover:text-slate-400 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                    >
                      Instant Hard Reset to Level 1
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Outer credit lines */}
        <footer className="text-center text-[10px] text-slate-500 pt-12">
          Udaan X Platform • Designed with premium micro-interactions for collegiate success.
        </footer>
      </main>

    </div>
  );
}
