import axios from "axios";
import { useState, useEffect, useRef } from "react";
import "../styles/cook.css";

// MUI Components
import TextField from "@mui/material/TextField";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default function BudgetQuest() {
  // Form Inputs
  const [items, setItems] = useState("");
  const [budget, setBudget] = useState("");
  const [avgBudget, setAvgBudget] = useState("");
  const [tripNo, setTripNo] = useState("");
  const [userChoices, setUserChoices] = useState([]);
const [sessionEnded, setSessionEnded] = useState(false);
const [usedItems, setUsedItems] = useState([]);

  // Conversation & state
  const [conversation, setConversation] = useState([]); // Array of {from: "AI"|"USER", text: string, choices?: []}
  const [loading, setLoading] = useState(false);
  const [awaitingChoice, setAwaitingChoice] = useState(false); // Waiting user to pick scenario option

  // To prevent multiple calls when choosing options
  const choiceLockRef = useRef(false);

  function extractItemFromText(text, itemList) {
  const lowerText = text.toLowerCase();
  for (let item of itemList) {
    if (lowerText.includes(item.trim().toLowerCase())) {
      return item.trim();
    }
  }
  return null;
}

  // Start new game/conversation
  const startBudgetQuest = async () => {
    if (!items.trim() || !budget.trim() || !avgBudget.trim() || !tripNo.trim()) {
      alert("Please fill in all fields before starting BudgetQuest!");
      return;
    }

    // Reset conversation state
    setConversation([
      {
        from: "AI",
        text: `Welcome to BudgetQuest! Let's plan your grocery trip #${tripNo} with a monthly budget of €${budget}.  
You have previously spent approximately €${avgBudget} per trip.  
Here's your shopping list: ${items}.  
I will present you with budgeting scenarios. Choose wisely!`,
      },
    ]);

    // Trigger first scenario
    await presentScenario({
      items,
      budget,
      avgBudget,
      tripNo,
      previousSpending: Number(avgBudget) * (Number(tripNo) - 1),
    });
  };

  // Function to ask AI for a budgeting scenario with choices
 async function presentScenario({ items, budget, avgBudget, tripNo, previousSpending }) {
  setLoading(true);
  setAwaitingChoice(false);
  choiceLockRef.current = false;

  const itemList = items.split(',').map(i => i.trim()).filter(Boolean);
  
  // Optional: Reset if all items have been used
  if (usedItems.length === itemList.length) {
    setUsedItems([]);
  }

  const usedItemsStr = usedItems.length > 0 
    ? `Previously used items: ${usedItems.join(', ')}. Do NOT use these again.` 
    : "";

  const prompt = `
You are a budgeting coach helping a user manage their monthly food budget of €${budget}.  
The user is on grocery shopping trip #${tripNo}, having spent approximately €${previousSpending} so far.  
Their shopping list includes: ${items}.

${usedItemsStr}

🧠 Your task:
- Create ONE realistic budgeting scenario that is relevant to this trip.
- For EACH new scenario, use a DIFFERENT item from the shopping list (not one of the previously used items).
- If the trip number is 1, be generous but mindful.
- If trip number is 2, begin nudging toward tradeoffs.
- If trip number > 2, include advanced saving strategies or substitutions.
- Include 3 numbered CHOICES, each with a short description and its € budget impact.

⚠️ Constraints:
- Format the response as valid JSON:
{
  "scenario": "Scenario text here",
  "choices": [
    { "desc": "Option 1 text", "impactEuro": -3 },
    { "desc": "Option 2 text", "impactEuro": 0 },
    { "desc": "Option 3 text", "impactEuro": -5 }
  ]
}
Only return JSON. No markdown or extra commentary.
`;

  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      method: "POST",
      data: {
        contents: [{ parts: [{ text: prompt }] }],
      },
    });

    const rawText = response.data.candidates[0].content.parts[0].text.trim();
    let cleanText = rawText.replace(/```json\s*/, '').replace(/```$/, '').trim();
    const scenarioData = JSON.parse(cleanText);

    // ✅ Try to extract which item was used in the scenario choices
    const focusItem = extractItemFromText(scenarioData.choices[0].desc, itemList);
    if (focusItem && !usedItems.includes(focusItem)) {
      setUsedItems((prev) => [...prev, focusItem]);
    }

    setConversation((prev) => [
      ...prev,
      { from: "AI", text: scenarioData.scenario, choices: scenarioData.choices },
    ]);
    setAwaitingChoice(true);
  } catch (err) {
    console.error("Error generating scenario:", err);
    setConversation((prev) => [
      ...prev,
      {
        from: "AI",
        text: "Sorry, I couldn't generate a scenario right now. Please try again.",
      },
    ]);
    setAwaitingChoice(false);
  } finally {
    setLoading(false);
  }
}



  // When user selects a choice in the scenario
  async function handleChoice(choiceIndex) {
   if (choiceLockRef.current) return; // prevent double-click
  choiceLockRef.current = true;
  setAwaitingChoice(false);

  const lastAIMessage = conversation[conversation.length - 1];
  if (!lastAIMessage || !lastAIMessage.choices) return;

  const choice = lastAIMessage.choices[choiceIndex];

  // Save user's decision
  setUserChoices((prev) => [...prev, choice]);

  // ✅ Add choice to conversation so it's visible
  setConversation((prev) => [
    ...prev,
    { from: "USER", text: `I choose: ${choice.desc}` },
  ]);


    // Calculate new budget remaining after choice
    const currentTripNo = Number(tripNo);
    const currentBudget = Number(budget);
    const currentAvgBudget = Number(avgBudget);
    const spentSoFar = currentAvgBudget * (currentTripNo - 1);
    const remainingBudgetBeforeChoice = currentBudget - spentSoFar;
    const newRemainingBudget = remainingBudgetBeforeChoice + choice.impactEuro;

    // AI feedback prompt on the choice made + updated budget info + encouragement + tip
    const feedbackPrompt = `
You are a budgeting coach. The user chose: "${choice.desc}" which changes their remaining budget by €${choice.impactEuro}.  
The remaining budget before was €${remainingBudgetBeforeChoice.toFixed(2)}.  
Now, it's approximately €${newRemainingBudget.toFixed(2)}.  
Give a short positive/constructive feedback about this choice, one actionable budgeting tip, and ask if they want another scenario to continue planning the trip.  
Respond as a friendly coach in 2-3 sentences max.
`;

    setLoading(true);
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        method: "POST",
        data: {
          contents: [{ parts: [{ text: feedbackPrompt }] }],
        },
      });

      const feedbackText = response.data.candidates[0].content.parts[0].text.trim();

      setConversation((prev) => [
        ...prev,
        { from: "AI", text: feedbackText },
      ]);
    } catch (err) {
      console.error("Error generating feedback:", err);
      setConversation((prev) => [
        ...prev,
        {
          from: "AI",
          text: "Oops! Something went wrong generating feedback. You can try another scenario.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // User wants another scenario (continue game)
  async function continueScenario() {
    // Extract current budget info from conversation + inputs
    const currentTripNo = Number(tripNo);
    const currentBudget = Number(budget);
    const currentAvgBudget = Number(avgBudget);
    const spentSoFar = currentAvgBudget * (currentTripNo - 1);

    await presentScenario({
      items,
      budget,
      avgBudget,
      tripNo,
      previousSpending: spentSoFar,
    });
  }async function endSessionWithSummary() {
  const previousSpending = Number(avgBudget) * (Number(tripNo) - 1);

  const endprompt = `Say Thanks for using BudgetQuest! You've made thoughtful budgeting choices. Come back anytime to plan another trip! 
  and also give one small budgeting tip or useful asssitance tip like keep tone like buddy based on below information: 
  The user is on grocery shopping trip ${tripNo},  
  having spent approximately €${previousSpending} so far. Their shopping list includes: ${items}
  Message should be short. Avoid very long responses and in keep strictly in below format :
  Tip for the trip : ...
  dont add any commentry in response keep it clean `;

  setLoading(true);
  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      method: "POST",
      data: {
        contents: [{ parts: [{ text: endprompt }] }],
      },
    });

    const feedbackText = response.data.candidates[0].content.parts[0].text.trim();
    setAwaitingChoice(false);
    setSessionEnded(true);
    setConversation((prev) => [...prev, { from: "AI", text: feedbackText }]);
  } catch (err) {
    console.error("Error generating feedback:", err);
    setConversation((prev) => [
      ...prev,
      {
        from: "AI",
        text: "Oops! Something went wrong generating feedback. You can try another scenario.",
      },
    ]);
  } finally {
    setLoading(false);
  }
}


 // Mark session as ended
//   setConversation((prev) => [
//     ...prev,
//     {
//       from: "AI",
//       text: "Thanks for using BudgetQuest! You've made thoughtful budgeting choices. Come back anytime to plan another trip!",
//     },
//   ]);
// }
  return (
    <div style={{ padding: 20, maxWidth: 950, margin: "auto" }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="Images/Shopping1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <h1 style={{ color: "white", fontFamily: "Life Savers", marginBottom: 10 }}>
        BudgetQuest — Interactive Smart Shopping Planner
      </h1>

      {/* Input Panel */}
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 16,
          padding: 20,
          marginBottom: 20,
          border: "1px solid rgba(0,0,0,0.2)",
        }}
      >
        <label
          style={{ fontWeight: "bold", fontSize: 18, marginBottom: 5, display: "block", color:"black"}}
        >
          🛒 What do you plan to buy?
        </label>
        <textarea
          placeholder="E.g. rice, lentils, milk, detergent..."
          value={items}
          onChange={(e) => setItems(e.target.value)}
          rows={3}
          style={{ width: "100%", fontSize: 16, padding: 8, borderRadius: 6, backgroundColor:"white",color:"black" }}
        />

        <TextField
          label="💶 Total Monthly Budget (€)"
          variant="outlined"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          sx={{ marginTop: 2, width: "100%" }}
        />
        <TextField
          label="💶 Average Budget per Trip (€)"
          variant="outlined"
          value={avgBudget}
          onChange={(e) => setAvgBudget(e.target.value)}
          sx={{ marginTop: 2, width: "100%" }}
        />
        <TextField
          label="🛍️ Shopping Trip Number"
          variant="outlined"
          value={tripNo}
          onChange={(e) => setTripNo(e.target.value)}
          sx={{ marginTop: 2, width: "100%" }}
        />

        <button
          onClick={startBudgetQuest}
          disabled={loading}
          className="tbtn"
          style={{
            marginTop: 15,
            padding: "12px 24px",
            fontSize: 16,
            fontWeight: "bold",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            backgroundColor: loading ? "#999" : "#007bff",
            color: "white",
            width: "100%",
            opacity:"1",
            marginLeft:"5px"
          }}
        >
          {loading ? "Loading..." : "Start BudgetQuest"}
        </button>
      </div>

      {/* Conversation Panel */}
      <div
        style={{
          minHeight: 400,
          maxHeight: 600,
          overflowY: "auto",
          backgroundColor: "rgba(255,255,255,0.9)",
          borderRadius: 16,
          padding: 20,
          border: "1px solid rgba(0,0,0,0.2)",
          fontFamily: "'Cairo Play', sans-serif",
          fontSize: 16,
          lineHeight: 1.4,
          color: "#222",
          opacity:"1"
        }}
      >
        {conversation.length === 0 && (
          <p style={{ color: "#777" }}>
            Your budget conversation will appear here. Start by entering your details above.
          </p>
        )}

        {conversation.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 20,
              textAlign: msg.from === "AI" ? "left" : "right",
              opacity:"1"
            }}
          >
            <div 
              style={{
                display: "inline-block",
                backgroundColor: msg.from === "AI" ? "#eee" : "#007bff",
                color: msg.from === "AI" ? "#333" : "white",
                padding: "10px 15px",
                borderRadius: 16,
                maxWidth: "80%",
                whiteSpace: "pre-wrap",
                fontWeight: "500",
                opacity:"1"
              }}
            >
              {msg.text}
            </div>

            {/* Show choices if AI message has choices and we are awaiting user choice */}
            {msg.from === "AI" && msg.choices && awaitingChoice && (
              <div  style={{ marginTop: 10, maxWidth: "80%" }} >
                {msg.choices.map((choice, idx) => (
                  <button className="tbtn"
                    key={idx}
                    onClick={() => handleChoice(idx)}
                    disabled={loading}
                    style={{
                      marginRight: 10,
                      marginTop: 5,
                      padding: "8px 14px",
                      borderRadius: 12,
                      border: "none",
                      backgroundColor: "#007bff",
                      color: "white",
                      cursor: "pointer",
                      fontSize: 14,
                      opacity:"1"
                    }}
                  >
                    {choice.desc}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* After feedback, show button to continue if no longer awaiting choice */}
     {!awaitingChoice && conversation.length > 0 && !loading && !sessionEnded && (
  <button
    className="tbtn"
    onClick={continueScenario}
    style={{
      marginTop: 10,
      padding: "10px 20px",
      fontSize: 16,
      borderRadius: 10,
      border: "none",
      backgroundColor: "#28a745",
      color: "white",
      cursor: "pointer",
      display: "block",
      marginLeft: "auto",
      opacity: "1"
    }}
  >
    Next Scenario
  </button>
)}

{conversation.length > 0 && !loading && !sessionEnded && (
  <button
    className="tbtn"
    onClick={endSessionWithSummary}
    style={{
      marginTop: 10,
      padding: "10px 20px",
      fontSize: 16,
      borderRadius: 10,
      border: "none",
      backgroundColor: "#dc3545",
      color: "white",
      cursor: "pointer",
      display: "block",
      marginLeft: "auto",
      opacity: "1"
    }}
  >
    End Session
  </button>
)}
      </div>
    </div>
  );
}
