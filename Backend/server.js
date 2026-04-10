import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// ✅ Debug: Check API key
console.log("OPENROUTER API KEY:", process.env.OPENROUTER_API_KEY);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 AI Summarizer Route
app.post("/api/notes/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "user",
            content: `Summarize this text in 5-6 lines:\n${text}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://ai-backend-shpw.onrender.com",
          "X-Title": "AI Notes Summarizer",
        },
      }
    );

    const summary =
      response.data.choices?.[0]?.message?.content ||
      "No summary generated";

    res.json({ summary });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to generate summary",
      details: error.response?.data || error.message,
    });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
