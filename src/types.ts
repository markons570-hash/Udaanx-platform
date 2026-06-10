/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  email: string;
  name: string;
  avatarUrl: string;
  xpPoints: number;
  xpRequired: number;
  level: number;
  studyStreak: number;
  tasksDone: number;
  tasksTotal: number;
}

export interface SubjectProgress {
  id: string;
  name: string;
  completedLessons: number;
  totalLessons: number;
  percentage: number;
}

export interface CourseModule {
  id: string;
  title: string;
  category: "Computer Science" | "Mathematics" | "Soft Skills" | "Other";
  progress: number;
  duration: string;
  description: string;
  resourceType: "video" | "pdf" | "article";
  resourceTitle: string;
}

export interface Task {
  id: string;
  title: string;
  type: "Quiz" | "Problem Set" | "Notes" | "Exam";
  status: "Pending" | "In Progress" | "Completed";
  xpReward: number;
  dueDate: string;
}

export interface Milestone {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  status: "Completed" | "In Progress" | "Locked";
  skillsLearned: string[];
}

export interface DiscussionThread {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  upvotes: number;
  replies: number;
  category: string;
  relativeTime: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
