/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, ArrowRight, Laptop, MessageSquare, BookOpen, TrendingUp, Calendar, Compass, GraduationCap, Award, Layers, Users, Zap, Smartphone, Star } from "lucide-react";
import Mascot from "../components/Mascot";

interface LandingViewProps {
  onNavigate: (tab: string) => void;
  onLoginClick: () => void;
}

export default function LandingView({ onNavigate, onLoginClick }: LandingViewProps) {
  // Testимоnial review data
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Sophomore, Computer Science",
      uni: "Georgia Tech",
      stars: 5,
      quote: "Udaan X literally saved my Data Structures exam! The AI Code tutor explained AVL trees in minutes, something my lectures missed.",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
    },
    {
      name: "Maria Torres",
      role: "Junior, Electrical Engineering",
      uni: "UT Austin",
      stars: 5,
      quote: "The personalized exam roadmaps keep me on track every day. The study streak badges make me feel like I am playing a game!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
    },
    {
      name: "David Kim",
      role: "First Year, Pre-Med",
      uni: "Boston University",
      stars: 5,
      quote: "Creating high-yield review sheets with the Cheat-Sheet command saves me hours of manual highlighting. Absolute game changer.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Active Cohorts" },
    { value: "500+", label: "Master Study Assets" },
    { value: "75%", label: "Stronger Performance" },
    { value: "50+", label: "Collegiate Chapters" }
  ];

  const features = [
    {
      icon: Sparkles,
      title: "AI Assistant",
      desc: "Get instant answers, explanations, and personalized help anytime with your AI learning buddy.",
      color: "from-cyan-500/20 to-teal-500/10"
    },
    {
      icon: BookOpen,
      title: "Smart Study",
      desc: "Access notes, summaries, and curated resources tailored to your college syllabus and exams.",
      color: "from-purple-500/20 to-indigo-500/10"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      desc: "Track your grades, monitor performance vectors, and pinpoint exact topics to boost.",
      color: "from-emerald-500/20 to-teal-500/10"
    },
    {
      icon: Compass,
      title: "Personalized Roadmap",
      desc: "Get an interactive milestone plan mapped around your professional and academic aspirations.",
      color: "from-blue-500/20 to-sky-500/10"
    },
    {
      icon: Award,
      title: "Practice & Quizzes",
      desc: "Challenge your concepts with deep multi-topic AI tests and performance reports.",
      color: "from-rose-500/20 to-orange-500/10"
    },
    {
      icon: Users,
      title: "Community Learning",
      desc: "Sync up inside virtual study tables, post boards, and collaborate on shared solutions.",
      color: "from-amber-500/20 to-yellow-500/10"
    },
    {
      icon: Zap,
      title: "Study Streaks & Rewards",
      desc: "Earn XP points, conquer leaderboards, and capture exclusive digital badge trophies.",
      color: "from-fuchsia-500/20 to-pink-500/10"
    },
    {
      icon: Smartphone,
      title: "Multi-Device Access",
      desc: "Review on your desktop in the dorm and check flashcards on your phone in the dining hall.",
      color: "from-cyan-500/20 to-sky-500/10"
    }
  ];

  return (
    <div id="landing-page" className="relative overflow-hidden bg-[#030712] min-h-screen text-slate-100 font-sans">
      {/* Absolute futuristic grid lines for high-quality depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      {/* Header bar */}
      <header id="main-header" className="sticky top-0 z-50 backdrop-blur-md bg-[#030712]/75 border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center transition-all">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate("home")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-teal-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
            <Sparkles className="w-5 h-5 text-black stroke-[2.5]" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            Udaan <span className="text-cyan-400 font-extrabold text-2xl">X</span>
          </span>
        </div>

        {/* Desktop navigation tabs */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-cyan-400 pb-1 border-b-2 border-cyan-400 transition-all">Home</a>
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-cyan-400 transition-colors">Roadmap</a>
          <a href="#features" className="hover:text-cyan-400 transition-colors">Pricing</a>
          <a href="#community" className="hover:text-cyan-400 transition-colors">Community</a>
        </nav>

        {/* Authentication controls */}
        <div className="flex items-center space-x-4">
          <button id="header-login-btn" onClick={onLoginClick} className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
            Login
          </button>
          <button id="header-signup-btn" onClick={onLoginClick} className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm shadow-md shadow-cyan-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:px-12 flex flex-col lg:flex-row items-center gap-12 z-10">
        <div className="flex-1 space-y-8 text-left">
          {/* Micro tag badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-bold text-cyan-300 tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            <span>⚡ NEXT GEN AI CLASSROOM 🏁</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
            Your AI-Powered <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              Learning Partner
            </span> <br />
            for College Success
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-xl leading-relaxed">
            Study smarter, stay productive, build skills, connect with peers, and create a clear roadmap for your future with Udaan X.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onLoginClick}
              className="px-8 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-base shadow-lg shadow-cyan-400/25 transition-all flex items-center space-x-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>Get Started for Free</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              onClick={() => {
                onLoginClick();
              }}
              className="px-8 py-4 rounded-xl border border-cyan-500/40 hover:bg-cyan-950/20 text-cyan-300 font-bold text-base transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Try AI Assistant</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center space-x-4 pt-6 border-t border-white/5 max-w-md">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
              <img className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Student" />
              <img className="w-10 h-10 rounded-full border-2 border-slate-950 object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Student" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Loved by 10,000+ students</div>
              <div className="flex items-center text-amber-400 space-x-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Floating Orbit Widget Graphic */}
        <div className="flex-1 relative flex items-center justify-center min-h-[350px] lg:min-h-[450px]">
          {/* Orbital rings */}
          <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px] rounded-full border border-dashed border-cyan-500/20 animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full border border-cyan-500/10" />

          {/* Core Mascot */}
          <Mascot expression="waving" size={260} className="z-10" />

          {/* Floating graphic element 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -40 }}
            animate={{ opacity: 1, x: -110, y: -70 }}
            transition={{ delay: 0.3 }}
            className="absolute z-20 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/30 p-3.5 flex items-center space-x-3 shadow-xl shadow-cyan-950/40"
          >
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 flex items-center justify-center border border-cyan-500/40">
              <MessageSquare className="w-4.5 h-4.5 text-cyan-400" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold text-cyan-400 tracking-wider">AI TUTOR</div>
              <div className="text-xs font-semibold text-white">Doubt Solved!</div>
            </div>
          </motion.div>

          {/* Floating graphic element 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 40 }}
            animate={{ opacity: 1, x: 90, y: 80 }}
            transition={{ delay: 0.5 }}
            className="absolute z-20 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-indigo-500/30 p-3.5 flex items-center space-x-3 shadow-xl"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 flex items-center justify-center border border-indigo-500/40">
              <TrendingUp className="w-4.5 h-4.5 text-indigo-400" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-bold text-indigo-400 tracking-wider">TRACKING</div>
              <div className="text-xs font-semibold text-white">Streak: 12 Days</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Board */}
      <section className="border-t border-b border-white/5 bg-slate-950/40 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features bento grid */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 md:px-12">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/20 text-xs font-semibold text-cyan-400 tracking-wider uppercase">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white">Everything You Need to Succeed</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Udaan X brings together advanced artificial intelligence and proven study methods to accelerate your learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -6, borderColor: "rgba(6,182,212,0.4)" }}
                className="group relative rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-white/5 p-6 hover:shadow-2xl hover:shadow-cyan-950/10 transition-all text-left flex flex-col justify-between"
              >
                {/* Glowing subtle colored circle backdrop inside */}
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-cyan-500/5 to-transparent rounded-t-2xl pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-950 to-slate-900 flex items-center justify-center border border-cyan-500/20 shadow-inner group-hover:border-cyan-400/40 transition-colors">
                    <Icon className="w-5.5 h-5.5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{feat.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onLoginClick}
            className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-sm shadow-md shadow-cyan-400/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Success Stories Testimonials */}
      <section id="testimonials" className="border-t border-white/5 bg-slate-950/20 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/20 text-xs font-semibold text-indigo-400 tracking-wider uppercase">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white">Loved by Students Everywhere</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Read how fellow college mates are setting new benchmarks using Udaan X as their co-pilot.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <div key={i} className="rounded-2xl bg-slate-900/40 border border-white/5 p-6 space-y-5 shadow-lg flex flex-col justify-between text-left">
                <div className="space-y-3">
                  <div className="flex items-center space-x-0.5 text-amber-500">
                    {[...Array(test.stars)].map((_, s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic leading-relaxed">
                    "{test.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 pt-4 border-t border-white/5">
                  <img className="w-11 h-11 rounded-full object-cover border border-cyan-400/30" src={test.avatar} alt={test.name} />
                  <div>
                    <h4 className="text-sm font-bold text-white">{test.name}</h4>
                    <p className="text-[11px] text-slate-400">{test.role}</p>
                    <p className="text-[10px] text-cyan-400">{test.uni}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer copyright */}
      <footer className="border-t border-white/5 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <div>&copy; 2026 Udaan X Learning Technologies. All rights reserved. Built for College Academic Excellence.</div>
      </footer>
    </div>
  );
}
