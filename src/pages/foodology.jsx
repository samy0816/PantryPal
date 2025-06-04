import axios from "axios";
import { useState } from "react";
import Checkbox from '@mui/material/Checkbox';
export default function Foodology() {
  const [count, setCount] = useState("");
  const [answer, setAnswer] = useState("");
  const [protein, setProtein] = useState(false);

  async function generateAndStructureAnswer() {
    try {
      const prompt = protein
        ? `You are a professional recipe developer.

Using only the following ingredients: ${count}, suggest a detailed **high-protein recipe**.

Respond in the following **strict format** with no extra commentary also if words count on one line goes above 9 print all on new line below:


**Recipe Name:** [Clear and catchy name]

**Ingredients:**
- List ingredients clearly with quantities
- Use only the provided ingredients; do not add others
- Show units (e.g., cups, grams, tbsp) where appropriate

**Instructions:**
1. Step-by-step instructions, numbered
2. Keep each step short and actionable
3. Use cooking terms where relevant (e.g., sauté, simmer, fold)
4. Mention any special tools (e.g., oven, blender)

**Estimated Time:** [Prep time + cook time in minutes]

**Protein Focus:** Briefly explain why this recipe is high in protein


Do not include any commentary or extra content outside this format. Return only the structured recipe.`
  : `You are a professional recipe developer.

Using only the following ingredients: ${count}, suggest a detailed recipe.

Respond in the following **strict format** with no extra commentary:


**Recipe Name:** [Clear and catchy name]

**Ingredients:**
- List ingredients clearly with quantities
- Use only the provided ingredients; do not add others
- Show units (e.g., cups, grams, tbsp) where appropriate

**Instructions:**
1. Step-by-step instructions, numbered
2. Keep each step short and actionable
3. Use cooking terms where relevant (e.g., sauté, simmer, fold)
4. Mention any special tools (e.g., oven, blender)

**Estimated Time:** [Prep time + cook time in minutes]
**Nearest german store:** [Nearest supermarket in germany where they can get ingredients from rewe,aldi, anything if ingredient name is panner/besan/bhindi suggest indian store]

---

Do not include any commentary or extra content outside this format. Return only the structured recipe.`;

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB5bxowb8LQ2mDDd2Y88DFjOT754TM1p0k`,
        method: "POST",
        data: {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        },
      });

      const rawAnswer = response.data.candidates[0].content.parts[0].text;
      const cleanedAnswer = rawAnswer.replace(/\*\*/g, '');
      setAnswer(cleanedAnswer.trim());
    } catch (err) {
      console.error("Error generating or formatting recipe:", err);
      setAnswer("An error occurred. Please try again.");
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>PantryPal</h1>
      <textarea
        placeholder="Enter ingredients..."
        value={count}
        onChange={(e) => setCount(e.target.value)}
        rows={5}
        cols={50}
        style={{
          width: "100%",
          maxWidth: "600px",
          marginBottom: "1rem",
          padding: "0.5rem",
          fontSize: "16px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      />
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <button
          onClick={generateAndStructureAnswer}
          style={{ padding: "0.5rem 1rem", marginRight: "10px" }}
        > Generate Recipe
        </button>
        <p>High Protein
          
        </p>
  <Checkbox
  checked={protein}
  onChange={(e) => setProtein(e.target.checked)}
  inputProps={{ 'aria-label': 'controlled' }}
/>

      </div>

      <div
        style={{
         backgroundImage: "url(../board.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    borderRadius: "12px",

    minHeight: "300px",
    backgroundColor: "transparent",
    boxSizing: "border-box",
    overflowWrap: "break-word"  // ✅ prevents overflow
        }}
      >
        <pre
          style={{
          textAlign: "left",
      width: "100%",
      fontSize: "16.5px",
      lineHeight: "1.6",
      margin:"60px",
      color: "#333",
      fontFamily: "'Kalam', cursive", // Optional: cozy font
      whiteSpace: "pre-wrap", // ✅ wraps pre-formatted content
      wordBreak: "break-word",
      color: "white"
          }}
        >
          {answer}
        </pre>
      </div>
    </div>
  );
}
