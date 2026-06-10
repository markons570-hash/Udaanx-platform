/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Sparkles, Mail, Lock, Eye, EyeOff, GraduationCap, Chrome, ArrowLeft, Terminal } from "lucide-react";
import Mascot from "../components/Mascot";

interface LoginViewProps {
  onLoginSuccess: (email: string) => void;
  onBack: () => void;
}

export default function LoginView({ onLoginSuccess, onBack }: LoginViewProps) {
  // Input tracking
  const [email, setEmail] = useState("student@university.edu");
  const [password, setPassword] = useState("password123");
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
      setError("Password must contain at least 5 character tokens.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulate database lookup delay
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(email);
    }, 850);
  };

  return (
    <div id="login-container" className="relative bg-[#030712] min-h-screen text-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-12 font-sans overflow-hidden">
      {/* Mesh gradients for atmospheric cosmic feedback */}
      <div className="absolute top-1/4 left-1/4 w-[350px] height-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] height-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Back arrow buttons */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/60 p-2.5 rounded-xl border border-white/5 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return home</span>
      </button>

      {/* Main split double-column box card container */}
      <div className="w-full max-w-5xl rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/5 overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[550px]">
        
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
            <Mascot expression="happy" size={200} className="mx-auto" />
            
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-black text-white">
                Welcome Back!
              </h2>
              <p className="text-cyan-400 font-extrabold text-xl md:text-2xl tracking-tight">
                Great to see you again
              </p>
              <p className="text-slate-400 text-xs max-w-xs mx-auto pt-1 leading-relaxed">
                Login to continue your learning journey and achieve your academic goals with Udaan X.
              </p>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 relative z-10 w-full text-center">
            🔐 Highly encrypted server-side JWT session protocol.
          </div>
        </div>

        {/* Right Side: Log-in entry forms container */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center bg-slate-900/20">
          <div className="space-y-6 max-w-sm mx-auto w-full text-left">
            
            {/* Header text */}
            <div className="space-y-1.5">
              <h1 id="login-title" className="text-2xl font-black text-white tracking-tight">
                Login to Udaan X
              </h1>
              <p className="text-slate-400 text-xs font-medium">
                Enter your credentials to access your account
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs font-semibold text-rose-400 bg-rose-500/10 rounded-xl border border-rose-500/20 animate-shake">
                ⚠️ {error}
              </div>
            )}

            {/* Input fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 rounded-xl border border-white/10 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white font-medium"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block">
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
                    className="w-full pl-10 pr-10 py-3 bg-slate-950/80 rounded-xl border border-white/10 text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white font-mono"
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

              {/* Remember trigger checkboxes */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 text-slate-400 hover:text-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md bg-slate-950 outline-none border border-white/10 text-cyan-400 focus:ring-offset-0 focus:ring-cyan-400 accent-cyan-500 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-cyan-400 hover:text-cyan-300 font-bold hover:underline transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Submission CTA control button */}
              <button
                id="login-action-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-3 bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold rounded-xl text-center shadow-lg shadow-cyan-400/20 transition-all disabled:opacity-50 cursor-pointer text-sm transform active:scale-95"
              >
                {isSubmitting ? "Verifying Authenticity..." : "Login"}
              </button>
            </form>

            {/* Structured Divider line */}
            <div className="relative py-2 flex items-center">
              <div className="flex-grow border-t border-white/5"></div>
              <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">or</span>
              <div className="flex-grow border-t border-white/5"></div>
            </div>

            {/* Social federated buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => onLoginSuccess("google.scholar@university.edu")}
                className="py-2.5 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 hover:border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs"
                title="Login with Google"
              >
                <Chrome className="w-4.5 h-4.5 text-cyan-400" />
              </button>
              <button
                onClick={() => onLoginSuccess("academic.microsoft@university.edu")}
                className="py-2.5 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 hover:border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs font-semibold text-slate-400"
                title="Login with Microsoft"
              >
                <span>MS</span>
              </button>
              <button
                onClick={() => onLoginSuccess("apple.academic@university.edu")}
                className="py-2.5 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 hover:border-white/10 flex items-center justify-center transition-all cursor-pointer text-xs"
                title="Login with Apple"
              >
                <div className="text-[12px] font-bold">Apple</div>
              </button>
            </div>

            {/* Bottom Signup disclaimer text link */}
            <div className="text-center text-xs text-slate-400 pt-2 font-medium">
              Don't have an account?{" "}
              <button
                onClick={() => onLoginSuccess("google.scholar@university.edu")}
                className="text-cyan-400 hover:text-cyan-300 font-bold cursor-pointer hover:underline"
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
