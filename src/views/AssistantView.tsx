/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, Send, Copy, ThumbsUp, ThumbsDown, BookOpen, Calculator, HelpCircle, FileText, ChevronRight, CornerDownLeft, RotateCcw, Check, MessageSquare
} from "lucide-react";
import Mascot from "../components/Mascot";
import { ChatMessage, UserProfile } from "../types";

interface AssistantViewProps {
  user: UserProfile;
  initialPrompt?: string;
  initialMode?: string;
  onClearInitialState?: () => void;
}

export default function AssistantView({ user, initialPrompt, initialMode, onClearInitialState }: AssistantViewProps) {
  // Navigation internal mode
  const [mode, setMode] = useState<"general" | "tutor" | "code" | "summary" | "quiz">(
    (initialMode as any) || "tutor"
  );
  
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      content: `Hi ${user.name}! I'm your AI learning assistant. I can help you deconstruct complex college subjects, debug algorithms, summarize textbook chapters, and simulate exam quizzes in seconds.\n\nSelect one of the **AI Tools** on the right or type your question below!`,
      timestamp: new Date()
    }
  ]);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [upvotedMessages, setUpvotedMessages] = useState<Record<string, boolean>>({});
  const [downvotedMessages, setDownvotedMessages] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Suggested prompts mapped to categories
  const suggestedPrompts = [
    { text: "Solve a DSA problem on Arrays", mode: "code" },
    { text: "Explain OSI layers with simple analogy", mode: "tutor" },
    { text: "Create a study plan for DBMS finals", mode: "summary" },
    { text: "Generate a quiz on CPU Scheduling", mode: "quiz" }
  ];

  // Recent History Log
  const [recentQueries, setRecentQueries] = useState<string[]>([
    "Explain Binary Search Algorithm",
    "Tailwind layout guidelines",
    "Relational integrity formulas"
  ]);

  // Handle external prompts sent from dashboard cards
  useEffect(() => {
    if (initialPrompt) {
      setQuery(initialPrompt);
      if (initialMode) {
        setMode(initialMode as any);
      }
      if (onClearInitialState) {
        onClearInitialState();
      }
    }
  }, [initialPrompt, initialMode]);

  // Autoscroll to bottom when message arrives
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isGenerating]);

  // Submission endpoint triggers
  const handleSendMessage = async (customMessage?: string) => {
    const textToSend = customMessage || query;
    if (!textToSend.trim()) return;

    const userMsgId = Date.now().toString();
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customMessage) setQuery("");
    
    // Add to history list if unique
    if (!recentQueries.includes(textToSend)) {
      setRecentQueries(prev => [textToSend, ...prev.slice(0, 4)]);
    }

    setIsGenerating(true);

    try {
      // Map existing message format for endpoint
      const formattedHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: formattedHistory,
          mode: mode
        })
      });

      if (!res.ok) {
        throw new Error("Backend response error code " + res.status);
      }

      const data = await res.json();
      
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "No response received.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      
      // Push error boundary message to user
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `⚠️ Failed to fetch AI stream. Please configure your \`GEMINI_API_KEY\` inside the Secrets panels or try restarting.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Upvote Downvote states
  const toggleUpvote = (id: string) => {
    setUpvotedMessages(prev => ({ ...prev, [id]: !prev[id] }));
    setDownvotedMessages(prev => ({ ...prev, [id]: false }));
  };

  const toggleDownvote = (id: string) => {
    setDownvotedMessages(prev => ({ ...prev, [id]: !prev[id] }));
    setUpvotedMessages(prev => ({ ...prev, [id]: false }));
  };

  // Clipboard copy script
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Beautiful custom visual parse formatter for high tech aesthetic blocks on screen
  const renderMessageContent = (text: string, msgId: string) => {
    const segments = text.split("```");
    
    return (
      <div className="space-y-4">
        {segments.map((segment, i) => {
          // If odd, it's a code block
          if (i % 2 !== 0) {
            // Extract language if present
            const lines = segment.split("\n");
            let lang = "typescript";
            let code = segment;
            if (lines[0] && lines[0].length < 15 && !lines[0].includes(" ") && !lines[0].includes("=") && !lines[0].includes("{")) {
              lang = lines[0];
              code = lines.slice(1).join("\n");
            }

            const codeId = `${msgId}-code-${i}`;

            return (
              <div key={i} className="rounded-xl border border-white/5 bg-slate-950 font-mono text-xs overflow-hidden shadow-inner text-left max-w-full">
                {/* code header */}
                <div className="bg-slate-900 px-4 py-2 flex justify-between items-center border-b border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-sans">{lang} block code</span>
                  <button
                    onClick={() => handleCopyText(codeId, code)}
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center space-x-1 font-sans text-[10px] font-bold cursor-pointer"
                  >
                    {copiedId === codeId ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                {/* code lines */}
                <pre className="p-4 overflow-x-auto text-slate-200 leading-relaxed font-mono select-text whitespace-pre">
                  {code}
                </pre>
              </div>
            );
          }

          // Even elements are standard text block - we can split by double newlines or bold markers
          const textLines = segment.split("\n");
          return (
            <div key={i} className="space-y-2 select-text">
              {textLines.map((line, li) => {
                // If it starts with # for headers
                if (line.startsWith("### ")) {
                  return <h4 key={li} className="text-cyan-300 font-extrabold text-sm pt-2 tracking-tight">{line.replace("### ", "")}</h4>;
                }
                if (line.startsWith("###")) {
                  return <h4 key={li} className="text-cyan-300 font-extrabold text-sm pt-2 tracking-tight">{line.replace("###", "")}</h4>;
                }
                if (line.startsWith("## ")) {
                  return <h3 key={li} className="text-cyan-400 font-black text-base pt-3 tracking-tight">{line.replace("## ", "")}</h3>;
                }
                if (line.startsWith("# ")) {
                  return <h2 key={li} className="text-white font-extrabold text-lg pt-4 tracking-tight">{line.replace("# ", "")}</h2>;
                }

                // Styled bullet lists
                if (line.startsWith("- ") || line.startsWith("* ")) {
                  return (
                    <li key={li} className="list-none pl-5 relative before:content-['⚡'] before:absolute before:left-0 before:text-[10px] before:text-cyan-400 text-xs text-slate-300 leading-relaxed py-0.5">
                      {line.slice(2)}
                    </li>
                  );
                }

                // High yield tips keywords
                if (line.toLowerCase().includes("high-yield") || line.toLowerCase().includes("exam tip")) {
                  return (
                    <div key={li} className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-xs font-medium leading-relaxed my-2">
                       {line}
                    </div>
                  );
                }

                return (
                  <p key={li} className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {line}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div id="companion-interface" className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[500px]">
      
      {/* LEFT COLUMN: Main chat threads window */}
      <div className="flex-1 bg-slate-900/30 rounded-2xl border border-white/5 flex flex-col justify-between overflow-hidden shadow-2xl relative">
        
        {/* Thread header */}
        <div className="bg-slate-950/60 p-4 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center border border-cyan-500/30">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div>
              <div className="text-xs font-black text-white leading-none capitalize">Udaan X AI Co-Pilot</div>
              <div className="text-[10px] text-cyan-400 font-bold mt-1 uppercase flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Mode: {mode} Tutor</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setMessages([
                {
                  id: "init",
                  role: "assistant",
                  content: `Hi ${user.name}! Let's start clean. Ask me anything about your CS or math syllabus, or trigger tasks!`,
                  timestamp: new Date()
                }
              ]);
            }}
            className="p-1 px-2 border border-white/5 bg-slate-900 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset History</span>
          </button>
        </div>

        {/* Messaging conversation stream */}
        <div 
          ref={chatScrollRef}
          className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-white/5"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-4 ${msg.role === "user" ? "justify-end text-right" : "justify-start text-left"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex-shrink-0 border border-cyan-500/30 p-1 bg-slate-950/70">
                  <Mascot expression={isGenerating ? "thinking" : "happy"} size={26} />
                </div>
              )}

              <div className={`max-w-[85%] space-y-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                
                {/* Meta block */}
                <div className="text-[10px] font-bold text-slate-500 font-mono">
                  {msg.role === "user" ? "You" : "Udaan X Assistant"} • {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>

                {/* Content Bubble container */}
                <div className={`rounded-2xl p-4 shadow-md ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-black font-semibold text-xs md:text-sm text-left select-text"
                    : "bg-slate-950/50 border border-white/5 text-slate-200"
                }`}>
                  {msg.role === "user" 
                    ? msg.content 
                    : renderMessageContent(msg.content, msg.id)
                  }
                </div>

                {/* Feedbacks indicators for Assistant replies */}
                {msg.role === "assistant" && msg.id !== "init" && (
                  <div className="flex items-center space-x-3 pl-1">
                    <button
                      onClick={() => toggleUpvote(msg.id)}
                      className={`p-1 hover:text-cyan-400 transition-colors cursor-pointer ${upvotedMessages[msg.id] ? "text-cyan-400 scale-110 font-bold" : "text-slate-500"}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleDownvote(msg.id)}
                      className={`p-1 hover:text-rose-400 transition-colors cursor-pointer ${downvotedMessages[msg.id] ? "text-rose-400 scale-110 font-bold" : "text-slate-500"}`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopyText(msg.id, msg.content)}
                      className="text-[10px] font-bold text-slate-500 hover:text-slate-300 flex items-center space-x-1.5 transition-colors pl-2 cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Answer Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Thinking blinking indicator */}
          {isGenerating && (
            <div className="flex gap-4 justify-start">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/30 p-1 flex items-center justify-center animate-pulse">
                <Mascot expression="thinking" size={26} />
              </div>
              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-slate-500">Udaan X Assistant is compiling...</div>
                <div className="p-3.5 bg-slate-950/40 rounded-2xl border border-white/5 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Persistent bottom query submission container */}
        <div className="p-4 bg-slate-950/60 border-t border-white/5 space-y-3">
          
          {/* Quick action helper pill deck */}
          <div className="flex flex-wrap gap-2 text-left">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setMode(prompt.mode as any);
                  handleSendMessage(prompt.text);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 border border-white/5 transition-colors cursor-pointer"
              >
                🏁 {prompt.text}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-slate-900 rounded-xl p-2 border border-white/5 focus-within:border-cyan-400 transition-colors"
          >
            <input
              type="text"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Ask anything to our AI Compiler (Currently configured in ${mode} tutor mode)...`}
              className="flex-grow bg-transparent text-sm text-white placeholder-slate-500 px-3 focus:outline-none py-1.5"
            />
            <button
              type="submit"
              disabled={isGenerating || !query.trim()}
              className="p-2 py-2 px-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-all disabled:opacity-40 cursor-pointer flex items-center space-x-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask</span>
            </button>
          </form>
        </div>

      </div>

      {/* RIGHT COLUMN: AI Tools & shortcuts panel */}
      <div className="w-full lg:w-80 space-y-6 flex flex-col justify-start">
        
        {/* 1. Tools Selection directory */}
        <div className="bg-slate-900/30 rounded-2xl border border-white/5 p-4 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest text-left">AI Tools Selector</h3>
          
          <div className="grid grid-cols-1 gap-2 text-left">
            <button
              onClick={() => setMode("tutor")}
              className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                mode === "tutor"
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                  : "bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <BookOpen className="w-4 h-4" />
                <div>
                  <div className="font-bold">Explain Topic</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Analogy, depth, reflection</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMode("code")}
              className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                mode === "code"
                  ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
                  : "bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Calculator className="w-4 h-4" />
                <div>
                  <div className="font-bold">Solve Doubts (Code)</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Logic steps, optimized scripts</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMode("summary")}
              className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                mode === "summary"
                  ? "bg-pink-500/10 border-pink-500/30 text-pink-400"
                  : "bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <FileText className="w-4 h-4" />
                <div>
                  <div className="font-bold">Summarize Cheat-Sheet</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">Tables, charts, high-yield tips</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMode("quiz")}
              className={`p-3 rounded-xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                mode === "quiz"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : "bg-slate-950/40 border-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <HelpCircle className="w-4 h-4" />
                <div>
                  <div className="font-bold">Generate Quiz</div>
                  <div className="text-[9px] text-slate-500 mt-0.5">MCQ generation with reasons</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Historic recent query checklist */}
        <div className="bg-slate-900/30 rounded-2xl border border-white/5 p-4 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest text-left">Recent History</h3>
          
          <div className="space-y-2 text-left">
            {recentQueries.map((hist, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(hist)}
                className="w-full p-2.5 rounded-xl bg-slate-950/40 border border-slate-900 hover:border-white/5 text-slate-300 hover:text-cyan-400 text-xs transition-colors flex items-center space-x-2 font-medium cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                <span className="truncate flex-1">{hist}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
