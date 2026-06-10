/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { MessageSquare, ThumbsUp, Plus, Search, Layers, User, MoreVertical, PlusCircle } from "lucide-react";
import { DiscussionThread } from "../types";

interface CommunityViewProps {
  threads: DiscussionThread[];
  onAddPost: (title: string, content: string, category: string) => void;
  onUpvotePost: (id: string) => void;
}

export default function CommunityView({ threads, onAddPost, onUpvotePost }: CommunityViewProps) {
  const [activeChannel, setActiveChannel] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Custom Create post controls state
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("Algorithms");

  const channels = ["All", "Algorithms", "Computer Science", "Database", "General Discussion", "Campus Hacks"];

  const handleCreatePostSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;
    
    onAddPost(postTitle, postContent, postCategory);
    
    // Clear state
    setPostTitle("");
    setPostContent("");
    setIsCreatingPost(false);
  };

  // Filter threads index
  const filteredThreads = threads.filter((th) => {
    const matchesChannel = activeChannel === "All" || th.category === activeChannel;
    const matchesSearch = th.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          th.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  return (
    <div id="community-hub" className="space-y-6 text-left pb-12">
      
      {/* Search & layout top deck header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-6 rounded-2xl animate-fadeIn">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white tracking-tight">University Community Forums</h2>
          <p className="text-xs text-slate-400">Share knowledge, verify solutions, and chat inside active study tables with peer cohorts.</p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forum discussions..."
              className="w-full bg-slate-950/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none border border-white/5 focus:border-cyan-500 transition-all"
            />
          </div>

          <button
            onClick={() => setIsCreatingPost(!isCreatingPost)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-colors flex items-center space-x-1.5 shadow-md shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Post</span>
          </button>
        </div>
      </div>

      {/* Creation form trigger modal/drawer */}
      {isCreatingPost && (
        <form onSubmit={handleCreatePostSubmit} className="p-5 rounded-2xl bg-slate-900/50 border border-cyan-400/30 space-y-4 text-left animate-[fadeIn_0.2s_ease-out]">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-xs font-black text-white flex items-center space-x-1.5 text-cyan-400">
              <PlusCircle className="w-4.5 h-4.5" />
              <span>DRAFT A NEW DISCUSSION THREAD</span>
            </span>
            <button
              type="button"
              onClick={() => setIsCreatingPost(false)}
              className="text-xs font-bold text-slate-500 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">POST TITLE</label>
              <input
                type="text"
                required
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Briefly state your academic question (e.g. Kadane's complexity question)"
                className="w-full bg-slate-950/80 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none border border-white/5 focus:border-cyan-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">CATEGORY CHANNEL</label>
              <select
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value)}
                className="w-full bg-slate-950/80 rounded-xl p-3 text-xs text-white border border-white/5 focus:outline-none focus:border-cyan-400 font-semibold"
              >
                {channels.filter(c => c !== "All").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">POST WORK / EXPLANATION</label>
            <textarea
              required
              rows={3}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Provide context, share what you've compiled so far, or paste compiler logs..."
              className="w-full bg-slate-950/80 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none border border-white/5 focus:border-cyan-400 font-sans"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs transition-colors cursor-pointer"
          >
            🚀 Publish Discussion
          </button>
        </form>
      )}

      {/* Main Double column collaborative blocks layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Forums post listing container */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">
            {activeChannel} Discussions list ({filteredThreads.length})
          </h3>

          <div className="space-y-4 text-left">
            {filteredThreads.length === 0 ? (
              <div className="p-12 text-center text-slate-500 italic text-xs bg-slate-900/10 rounded-2xl border border-white/5">
                No active discussions in this channel yet. Click "+ Create Post" to start one!
              </div>
            ) : (
              filteredThreads.map((th) => (
                <div
                  key={th.id}
                  className="rounded-2xl glass-panel p-5 space-y-4 hover:border-white/10 transition-colors animate-fadeIn"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center space-x-3">
                      <img className="w-9 h-9 rounded-full object-cover border border-cyan-400/20" src={th.authorAvatar} alt={th.authorName} />
                      <div>
                        <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <span>{th.authorName}</span>
                          <span className="text-[10px] font-medium text-cyan-400 font-mono">({th.authorRole})</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{th.relativeTime} ago in <span className="text-slate-400 font-bold">#{th.category}</span></div>
                      </div>
                    </div>

                    <button className="text-slate-500 hover:text-white cursor-pointer">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Main Header title */}
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-black text-white tracking-tight">{th.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">{th.content}</p>
                  </div>

                  {/* Feedbacks reaction controls */}
                  <div className="flex items-center space-x-4 pt-3 border-t border-white/5">
                    <button
                      onClick={() => onUpvotePost(th.id)}
                      className="p-1 px-3.5 bg-slate-950/60 hover:bg-slate-950 hover:text-cyan-400 transition-colors border border-white/5 rounded-lg flex items-center space-x-2 text-xs font-bold text-slate-400 cursor-pointer"
                      title="Support this thread"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{th.upvotes}</span>
                    </button>

                    <div className="p-1 px-3.5 bg-slate-950/60 border border-white/5 rounded-lg flex items-center space-x-2 text-xs font-semibold text-slate-400">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                      <span>{th.replies} responses</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Channel navigation shortcuts list */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-5 space-y-4 text-left shadow-xl animate-fadeIn">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>My Communities</span>
            </h3>

            <div className="space-y-2 select-none">
              {channels.map((channel) => (
                <button
                  key={channel}
                  onClick={() => setActiveChannel(channel)}
                  className={`w-full p-2.5 rounded-xl text-xs transition-colors flex items-center justify-between font-bold cursor-pointer ${
                    activeChannel === channel
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "bg-slate-950/30 hover:bg-slate-950 text-slate-400 hover:text-white"
                  }`}
                >
                  <span># {channel}</span>
                  {activeChannel === channel && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
