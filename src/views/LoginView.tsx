/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Sparkles, Mail, Lock, Eye, EyeOff, GraduationCap, Chrome, ArrowLeft, Terminal, UserPlus, LogIn, HelpCircle } from "lucide-react";
import Mascot from "../components/Mascot";

interface LoginViewProps {
  onLoginSuccess: (email: string) => void;
  onSignUpNewUser: (email: string) => void;
  onBack: () => void;
}

export default function LoginView({ onLoginSuccess, onSignUpNewUser, onBack }: LoginViewProps) {
  // Mode selection: "signup" or "login"
  // Default to "signup" so a first-time user sees the clean sign-up setup first
  const [activeMode, setActiveMode] = useState<"signup" | "login">("signup");

  // Inputs are EMPTY by default for a clean first-time experience
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please key in your email address.");
      return;
    }
    if (password.length < 5) {
      setError("Password must contain at least 5 characters.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (activeMode === "signup") {
        // Direct first time sign-ups to the custom onboarding quiz
        onSignUpNewUser(email);
      } else {
        onLoginSuccess(email);
      }
    }, 850);
  };

  // Safe handler to fill standard testing credentials instantly helper
  const handleAutofillDemo = (mode: "beginner" | "student") => {
    setError("");
    if (mode === "student") {
      setActiveMode("login");
      setEmail("student@university.edu");
      setPassword("password123");
    } else {
      // Create a fresh sign up for beginners
      setActiveMode("signup");
      setEmail(`scholar.${Math.floor(100 + Math.random() * 900)}@college.edu`);
      setPassword("scholar123");
    }
  };

  return (
    <div id="login-container" className="relative bg-[#030712] min-h-screen text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-12 font-sans overflow-hidden">
      {/* Mesh gradients for atmospheric cosmic feedback */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Back arrow buttons */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/60 p-2.5 rounded-xl border border-white/5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return home</span>
      </button>

      {/* Main split double-column box card container */}
      <div className="w-full max-w-5xl rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[580px]">
        
        {/* Left Side: Cosmic display illustrations */}
        <div className="flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-10 flex flex-col justify-between items-center relative border-r border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.1),transparent_60%)]" />
          
          {/* Top Logo */}
          <div className="w-full flex items-center space-x-3 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center border border-cyan-400/30">
              <Sparkles className="w-4.5 h-4.5 text-black" />
            </div>
            <span className="font-bold tracking-tight text-lg text-white">
              Udaan <span className="text-cyan-400">X</span>
            </span>
          </div>

          {/* Core branding greeting & animated mascot */}
          <div className="my-auto py-8 text-center space-y-6 relative z-10 select-none">
            <Mascot expression={activeMode === "signup" ? "waving" : "happy"} size={180} className="mx-auto" />
            
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-white leading-none">
                {activeMode === "signup" ? "A New Horizon!" : "Welcome Back!"}
              </h2>
              <p className="text-cyan-400 font-extrabold text-lg md:text-xl tracking-tight">
                {activeMode === "signup" ? "Create your personalized path" : "Great to see you again"}
              </p>
              <p className="text-slate-400 text-[11px] max-w-sm mx-auto pt-1 leading-relaxed">
                {activeMode === "signup" 
                  ? "Sign up to configure your initial classes, test out of core subjects, and collaborate on study materials tailored with premium AI modules."
                  : "Sign in with your credentials to resume your academic streak, review customized lecture materials, and check community replies."
                }
              </p>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 relative z-10 w-full text-center font-mono">
            🛡️ Secure authentication session. No private keys stored publicly.
          </div>
        </div>

        {/* Right Side: Tab based registration/login entry forms */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center bg-slate-900/25">
          <div className="space-y-6 max-w-sm mx-auto w-full text-left">
            
            {/* Sliding Toggle tabs for premium look (Duolingo style) */}
            <div className="grid grid-cols-2 bg-slate-950 p-1.5 rounded-xl border border-white/5">
              <button
                type="button"
                onClick={() => {
                  setActiveMode("signup");
                  setError("");
                }}
                className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMode === "signup"
                    ? "bg-cyan-500 text-black shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up (New)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveMode("login");
                  setError("");
                }}
                className={`flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeMode === "login"
                    ? "bg-cyan-500 text-black shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            </div>

            {/* Header text */}
            <div className="space-y-1">
              <h1 id="login-title" className="text-xl font-black text-white tracking-tight">
                {activeMode === "signup" ? "Get Started with Udaan X" : "Login to your account"}
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                {activeMode === "signup" 
                  ? "Embark on an AI-curated interactive college companion" 
                  : "Pick up exactly where you left off"
                }
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs font-semibold text-rose-400 bg-rose-500/10 rounded-xl border border-rose-500/20">
                ⚠️ {error}
              </div>
            )}

            {/* Input fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    id="login-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@university.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 rounded-xl border border-white/10 text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    id="login-password-input"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 rounded-xl border border-white/10 text-xs placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
              </div>

              {/* Helper Links / Remember Me row */}
              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center space-x-1.5 text-slate-400 hover:text-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded bg-slate-950 border border-white/10 text-cyan-400 focus:ring-offset-0 focus:ring-cyan-400 accent-cyan-500 cursor-pointer"
                  />
                  <span>Stay logged in</span>
                </label>
                {activeMode === "login" && (
                  <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-colors">
                    Forgot Password?
                  </a>
                )}
              </div>

              {/* Submission CTA control button */}
              <button
                id="login-action-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold rounded-xl text-center shadow-lg shadow-cyan-400/20 transition-all disabled:opacity-50 cursor-pointer text-xs transform active:scale-95"
              >
                {isSubmitting 
                  ? "Configuring environment session..." 
                  : activeMode === "signup" 
                    ? "Verify Account & Begin Onboarding"
                    : "Secure Sign In"
                }
              </button>
            </form>

            {/* Seamless 1-Click Fast Demo Fillers Section for easy testing / evaluation (duolingo/coursera style) */}
            <div className="border border-white/5 rounded-xl bg-slate-950/60 p-3 space-y-2 mt-2">
              <div className="flex items-center space-x-1.5 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest leading-none">
                <HelpCircle className="w-3 h-3 text-cyan-400" />
                <span>Evaluate with Demo Fillers</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                Want to skip typing? Auto-fill pre-balanced user accounts to check features instantly:
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 font-sans">
                <button
                  type="button"
                  onClick={() => handleAutofillDemo("student")}
                  className="py-1.5 px-2 bg-slate-900 hover:bg-slate-850 text-[10px] font-bold text-cyan-400 border border-cyan-500/10 hover:border-cyan-500/30 rounded-lg transition-all cursor-pointer text-center"
                >
                  🏫 Pre-filled Demo Lvl 4
                </button>
                <button
                  type="button"
                  onClick={() => handleAutofillDemo("beginner")}
                  className="py-1.5 px-2 bg-slate-900 hover:bg-slate-850 text-[10px] font-bold text-indigo-400 border border-indigo-500/10 hover:border-indigo-500/30 rounded-lg transition-all cursor-pointer text-center"
                >
                  🐣 Fresh Onboard Lvl 1
                </button>
              </div>
            </div>

            {/* Bottom Signup footer switch fallback */}
            <div className="text-center text-xs text-slate-400 font-medium">
              {activeMode === "signup" ? (
                <>
                  Already registered?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveMode("login")}
                    className="text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer hover:underline"
                  >
                    Log In
                  </button>
                </>
              ) : (
                <>
                  First time visiting?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveMode("signup")}
                    className="text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer hover:underline"
                  >
                    Create Account
                  </button>
                </>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
