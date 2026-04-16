import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/ai-chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.json({ reply: "Please type a message." });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional fashion assistant helping users with collections, styles, and contact information.",
        },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7,
      max_tokens: 200,
    }); ``

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "Hello! I’m your fashion assistant. Ask me anything about our collection or styles.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ AI backend running on http://localhost:${PORT}`);
});
