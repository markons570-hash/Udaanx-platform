import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize GoogleGenAI SDK server-side
const geminiApiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined. AI Assistant capabilities will be simulated.");
}

app.use(express.json());

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiInitialized: !!ai });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, mode } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Determine system instruction based on selected mode
    let systemInstruction = "You are a friendly college learning bot named Udaan X mascot robot. Be encouraging, clear, and structure responses with sections.";
    
    if (mode === "tutor") {
      systemInstruction = `You are Udaan X AI Tutor, an exceptional college professor. 
Explain deep concepts clearly and thoroughly. 
Always divide your answer into:
1. Concept Definition (simple analogies)
2. In-Depth Explanation
3. Practical College Use Case
4. Quick Brain-teaser question to verify learning.`;
    } else if (mode === "code") {
      systemInstruction = `You are the Udaan X Code Wizard. 
Explain the algorithm or code requested. 
Format your response securely:
- Present a numbered logic breakdown.
- Follow up with a highly optimized code block in the requested language.
- Provide time and space complexity analysis.
- End with 2 debug scenarios or corner cases.`;
    } else if (mode === "summary") {
      systemInstruction = `You are the Udaan X Cheat-Sheet Compiler. 
Create highly summarized high-yield college exam review sheets.
Use bold key terms, clean tables or lists, bullet points, and highlight exact "High-Yield Exam Tips" to make it highly memorable.`;
    } else if (mode === "quiz") {
      systemInstruction = `You are the Udaan X Quiz Master. 
Based on the text or topic provided, generate 3 practice multiple-choice questions (MCQs) with answers and detailed explanations of why correct answers are correct and incorrect ones are incorrect.`;
    }

    // If API key is available, call the real Gemini API
    if (ai) {
      // Re-map history if any is passed
      const contentsList: any[] = [];
      
      if (history && Array.isArray(history)) {
        history.forEach((h: any) => {
          contentsList.push({
            role: h.role === "assistant" ? "model" : "user",
            parts: [{ text: h.content || "" }]
          });
        });
      }
      
      // Append the latest user query
      contentsList.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsList,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const generatedText = response.text || "I was unable to formulate a response. Please try again.";
      return res.json({ response: generatedText });
    } else {
      // Offline fallback simulations if api key is missing to maintain perfect mock usability
      setTimeout(() => {
        let responseText = `[Simulated AI Assistant - Setup GEMINI_API_KEY in secrets to enable real AI responses]\n\n`;
        
        if (mode === "quiz") {
          responseText += `### 📝 Practice Quiz: ${message}\n\n1. **What is the primary characteristic of the algorithm/system?**\n   - A) Constant run time\n   - B) Efficient divide-and-conquer strategy\n   - C) Sequential search exhaustion\n   - D) Local clustering grouping\n\n   *Answer: B*. Explaining reasoning: Divide-and-conquer structures scale logarithmically O(log N).\n\n2. **Which boundary check is most essential here?**\n   - A) Overflow conditions\n   - B) Null pointer assertions\n   - C) Empty inputs and single element bounds\n\n   *Answer: C*. Empty inputs cause index-out-of-bounds errors.`;
        } else if (mode === "code") {
          responseText += `### 💻 Code Explanation: ${message}\n\nHere is the step-by-step logic:\n1. Initialize left and right pointers.\n2. Calculate the middle index safely: \`mid = Math.floor((left + right) / 2)\`.\n3. Compare middle value with the target.\n\n\`\`\`typescript\nfunction solve(input: any): any {\n  // Optimized implementation\n  console.log("Processing elements...");\n  return input;\n}\n\`\`\`\n\n**Complexity Analysis:**\n- **Time Complexity:** O(log N) operations\n- **Space Complexity:** O(1) auxiliary space`;
        } else if (mode === "summary") {
          responseText += `### 📄 Cheat-Sheet: ${message}\n\n- **Core Definition:** High-level architectural overview.\n- **High-Yield Exam Tip:** Professors frequently check if you know the difference between logical layouts and physical database representation.\n- **Crucial Formula:** $E = MC^2$ or similar computational complexity logs.`;
        } else {
          responseText += `### 🎓 Tutor Explanation: ${message}\n\nThat's a fantastic question to ask! Let's break down **${message}**:\n\n1. **Core Concept:** Think of it like organizing a massive library. Instead of checking every drawer, we use indices.\n2. **Academic Context:** In standard college coursework, understanding this concept is vital for high marks in technical modules.\n3. **Quick Reflection:** Ask yourself how this scales if our database grows to 10 billion items!`;
        }

        res.json({ response: responseText });
      }, 1000);
    }
  } catch (error: any) {
    console.error("AI Assistant Route Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong in the AI pipeline." });
  }
});

// Configure Vite middleware or Static files serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring Vite Development Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving pre-built production static files...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Udaan X backend running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
