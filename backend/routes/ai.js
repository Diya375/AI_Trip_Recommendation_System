const express = require("express");
const Groq = require("groq-sdk");
const verifyToken = require("../middleware/authmiddleware");

const router = express.Router();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are YatraVerse AI, a friendly and knowledgeable Nepal travel guide. 
You help travelers plan trips in Nepal — covering destinations, trekking routes, budgets, 
food, accommodation, culture, and itineraries. Keep responses concise, helpful, and warm.
Use occasional Nepali words like Namaste, Dhanyabad naturally. Format responses clearly.`;

// General chat
router.post("/chat", verifyToken, async (req, res) => {
  const { message } = req.body;
  if (!message?.trim())
    return res.status(400).json({ error: "Message is required" });

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 1024,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("CHAT ERROR:", err.message);
    res.status(500).json({ error: "AI request failed", details: err.message });
  }
});

// Group trip plan
router.post("/trip-plan", verifyToken, async (req, res) => {
  const { tripName, members, preferences } = req.body;

  if (!preferences?.length) {
    return res.status(400).json({ error: "No preferences provided" });
  }

  const prefSummary = preferences
    .map(
      (p) => `
Member: ${p.name}
- Budget: ${p.budget ? `Rs. ${Number(p.budget).toLocaleString()}` : "Not specified"}
- Trip Type: ${Array.isArray(p.trip_types) && p.trip_types.length ? p.trip_types.join(", ") : "Not specified"}
- Food: ${p.food_preference || "Not specified"}
- Accommodation: ${p.accommodation || "Not specified"}
- Notes: ${p.notes || "None"}
  `,
    )
    .join("\n---\n");

  const budgets = preferences
    .filter((p) => p.budget && Number(p.budget) > 0)
    .map((p) => Number(p.budget));
  const lowestBudget = budgets.length ? Math.min(...budgets) : null;

  const prompt = `You are planning a group trip to Nepal called "${tripName}" for ${members.length} people.

Here are each member's preferences:
${prefSummary}

${
  lowestBudget
    ? `The lowest budget among members is Rs. ${lowestBudget.toLocaleString()} — use this as the limit.`
    : "No budget was specified — suggest a reasonable budget."
}

Based on ALL members' preferences, create a detailed, balanced group trip plan that works for everyone.
Find common ground and suggest compromises where needed.

Please provide:
1. 🎯 Recommended Destination(s)
2. 📅 Suggested Itinerary (day by day)
3. 🏨 Accommodation Recommendation
4. 🍽️ Food Plan (considering all dietary preferences)
5. 💰 Estimated Budget Breakdown
6. 🎒 Activities that suit everyone
7. ⚠️ Things to keep in mind for this group

Be specific, practical, and exciting!`;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are YatraVerse AI, an expert Nepal travel planner. Create detailed, 
practical group trip plans. Be specific about places, costs in Nepali Rupees, and realistic timing. 
Format with clear sections and emojis.`,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 2048,
    });
    res.json({ plan: response.choices[0].message.content });
  } catch (err) {
    console.error("TRIP PLAN ERROR:", err.message);
    res
      .status(500)
      .json({ error: "Failed to generate trip plan", details: err.message });
  }
});

module.exports = router;
