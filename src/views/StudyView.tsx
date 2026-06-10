/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { BookOpen, Video, FileText, CheckCircle, Clock, Search, ChevronRight, GraduationCap } from "lucide-react";
import { CourseModule } from "../types";

interface StudyViewProps {
  courses: CourseModule[];
  onOpenAssistant: (initialPrompt?: string, mode?: string) => void;
}

export default function StudyView({ courses, onOpenAssistant }: StudyViewProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | "Computer Science" | "Mathematics" | "Soft Skills" | "Other">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filters: ("All" | "Computer Science" | "Mathematics" | "Soft Skills" | "Other")[] = [
    "All", "Computer Science", "Mathematics", "Soft Skills", "Other"
  ];

  // Filtering cards
  const filteredCourses = courses.filter((course) => {
    const matchesFilter = activeFilter === "All" || course.category === activeFilter;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div id="study-hub" className="space-y-6 text-left pb-12">
      
      {/* Search and header block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-panel p-6 rounded-2xl animate-fadeIn">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white tracking-tight">Study Library & Resources</h2>
          <p className="text-xs text-slate-400 leading-normal">Access notes, summaries, and curate files. Continue lessons to earn milestone rewards.</p>
        </div>

        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, resources..."
            className="w-full bg-slate-950/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none border border-white/5 focus:border-cyan-500 transition-all"
          />
        </div>
      </div>

      {/* Categories slider tab system */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/5 pb-4 select-none">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === filter
                ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/10"
                : "bg-slate-900 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid listing course card metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.length === 0 ? (
          <div className="col-span-2 text-center py-16 text-slate-500 italic text-sm">
            No course modules found matching the criteria.
          </div>
        ) : (
          filteredCourses.map((course) => {
            return (
              <div
                key={course.id}
                className="rounded-2xl glass-panel p-5 space-y-4 hover:border-cyan-500/20 transition-all flex flex-col justify-between animate-fadeIn"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 uppercase tracking-widest">
                      {course.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold flex items-center space-x-1.5 font-mono">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{course.duration}</span>
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-black text-white hover:text-cyan-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed truncate-2-lines">
                      {course.description}
                    </p>
                  </div>

                  {/* Resource highlight indicator */}
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-white/5 flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                      {course.resourceType === "video" ? (
                        <Video className="w-4 h-4 text-purple-400" />
                      ) : (
                        <FileText className="w-4 h-4 text-pink-400" />
                      )}
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{course.resourceType} asset unlocked</div>
                      <div className="text-[11px] font-medium text-slate-300 leading-normal">{course.resourceTitle}</div>
                    </div>
                  </div>
                </div>

                {/* Progress feedback bar & trigger */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex-1 max-w-[60%] space-y-1">
                    <div className="flex justify-between text-[9px] font-bold text-slate-500">
                      <span>PROGRESS</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenAssistant(`Explain the topics under '${course.title}' as my AI partner`, "tutor")}
                    className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition-all cursor-pointer flex items-center space-x-1 shadow-md shadow-cyan-500/10"
                  >
                    <span>▷ Continue</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
