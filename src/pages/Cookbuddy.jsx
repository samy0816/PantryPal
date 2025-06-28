import axios from "axios";
import { useState } from "react";
import "../styles/cook.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { FoodFactsPopup } from "./Sbf.jsx";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export default function CookBuddy() {
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedRecipe, setParsedRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const [craving, setCraving] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [energyLevel, setEnergyLevel] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [mood, setMood] = useState('');

  
  const cravingOptions = [
    { label: 'Sweet', value: 'sweet' },
    { label: 'Savory', value: 'savory' },
    { label: 'Spicy', value: 'spicy' },
    { label: 'Salty', value: 'salty' },
  ];

  const cuisineTypeOptions = [
    { label: 'Italian', value: 'italian' },
    { label: 'Indian', value: 'indian' },
    { label: 'Mexican', value: 'mexican' },
    { label: 'Japanese', value: 'japanese' },
  ];

  const energyLevelOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  const dietaryRestrictionsOptions = [
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Gluten-Free', value: 'gluten_free' },
    { label: 'None', value: 'none' },
  ];

  const moodOptions = [
    { label: 'Happy', value: 'happy' },
    { label: 'Stressed', value: 'stressed' },
    { label: 'Tired', value: 'tired' },
    { label: 'Bored', value: 'bored' },
  ];
  const cookingMessages = {
    indian: "🍛 आपका भोजन तैयार हो रहा है!",
    italian: "🍝 Il tuo cibo sta cuocendo!",
    mexican: "🌮 Tu comida se está cocinando!",
    japanese: "🍱 あなたの料理が調理中です！",
    default: "🍲 Your food is cooking",
  };

  function parseRecipeText(rawText) {
    const sections = rawText.split(/(?:🍽|🧂|👩‍🍳|⏱|🛒|🧠|🎓)/).map(s => s.trim()).filter(Boolean);
    return {
      name: sections[0],
      ingredients: sections[1],
      instructions: sections[2]?.split(/\n\d+\.\s/).filter(Boolean),
      time: sections[3],
      store: sections[4],
      science: sections[5],
      video: sections[6],
    };
  }

  async function generateAndStructureAnswer() {
    if (!count.trim()) return;
  
  const audio = new Audio("./Images/Cooking.mp3");
  audio.play().catch((e) => console.log("Playback error:", e));
            
    setLoading(true);
    setParsedRecipe(null);
    setCurrentStep(0);

    const prompt = `You are a professional recipe developer and culinary educator.
Using only the following ingredients: ${count}, suggest a detailed, doable recipe.
Craving: ${craving || "No preference"}
Cuisine Type: ${cuisineType || "Any"}
Energy Level: ${energyLevel || "Any"}
Dietary Restrictions: ${dietaryRestrictions || "None"}
Mood: ${mood || "Neutral"}
Respond in the following strict format with no extra commentary:

🍽 Recipe Name: ...
🧂 Ingredients:(example format answer strictly in list format)
1.tomato
2. Onion
👩‍🍳 Instructions: ...
⏱ Estimated Time: ...
🛒 Nearest German Store: ...
🧠 Science Behind the Food: ...
🎓 Skill Refresher :... 
`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        }
      );

      const raw = response.data.candidates[0].content.parts[0].text;
      const cleaned = raw.replace(/\*\*/g, "").trim();
      const parsed = parseRecipeText(cleaned);
      setParsedRecipe(parsed);

      
    } catch (err) {
      console.error(err);
    } finally {
       audio.pause();
    audio.currentTime = 0;
      setLoading(false);
    }
  }

  const dropdownStyle = {
    '& .MuiInputLabel-root': { color: 'black', fontWeight: "700" },
    '& .MuiOutlinedInput-root': {
      color: 'black',
      '& fieldset': { borderColor: 'black' },
      '&:hover fieldset': { borderColor: 'black' },
      '&.Mui-focused fieldset': { borderColor: 'black' },
    },
    '& .MuiSvgIcon-root': { color: 'black' },
  };

  return (
    <div>
      <video autoPlay loop muted playsInline style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        objectFit: "cover", zIndex: -1
      }}>
        <source src="Images/Backgroundbg.mp4" type="video/mp4" />
      </video>

      <h1 style={{ color: "white", fontFamily: "Life Savers" }}>CookBuddy</h1><br />

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Input Panel */}
        <div style={{
          width: "900px", height: "800px", background: "rgba(255,255,255,0.75)", borderRadius: "16px",
          backdropFilter: "blur(1.9px)", padding: "2rem"
        }}>
          <label style={{ fontSize: "20px", fontWeight: "bold", fontFamily: "Life Savers" }}>What do you want to eat today?</label>
          <textarea
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="🧂 Enter ingredients...(e.g Bread, tomato, spinach, cheese..)"
            rows={5}
            style={{
              width: "100%", marginBottom: "1rem", borderRadius: "8px", padding: "1rem",
              border: "2px solid white", backgroundColor: "white", color: "black"
            }}
          />

          <button onClick={generateAndStructureAnswer} disabled={loading} className="sbtn">
            {loading ? "Generating..." : "Generate Recipe"}
            
            
          </button>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: "1rem" }}>
            {[{
              label: '🍽️ Craving', value: craving, setter: setCraving, options: cravingOptions
            }, {
              label: '🌍 Cuisine Type', value: cuisineType, setter: setCuisineType, options: cuisineTypeOptions
            }, {
              label: '⚡ Energy Level', value: energyLevel, setter: setEnergyLevel, options: energyLevelOptions
            }, {
              label: '🥦 Dietary Restrictions', value: dietaryRestrictions, setter: setDietaryRestrictions, options: dietaryRestrictionsOptions
            }, {
              label: '😊 Mood', value: mood, setter: setMood, options: moodOptions
            }].map((dropdown, idx) => (
              <FormControl fullWidth sx={dropdownStyle} key={idx}>
                <InputLabel>{dropdown.label}</InputLabel>
                <Select
                  value={dropdown.value}
                  label={dropdown.label}
                  onChange={(e) => dropdown.setter(e.target.value)}
                >
                  {dropdown.options.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
        </div>

        {/* Output Panel */}
     <div style={{
  width: "900px", height: "800px", padding: "2rem",
  borderRadius: "16px", backgroundColor: "rgba(37, 23, 21, 0.95)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  color: "white", fontFamily: "Lora",
  overflowY: "auto", boxShadow: "0 0 20px rgba(0,0,0,0.2)"
}}>
  {loading ? (
    <div id="cooking">
      <p style={{
        fontFamily: "Dancing Script", fontSize: "26px",
        color: "#fff", textAlign: "center", marginBottom: "1rem"
      }}>
        {cookingMessages[cuisineType.toLowerCase()] || cookingMessages.default}
      </p>
      <div className="bubble"></div><div className="bubble">
      </div>
      <div id="area"><div id="sides"><div id="pan"></div><div id="handle"></div></div><div id="pancake"><div id="pastry"></div></div></div>
    </div>
  ) : parsedRecipe ? (
    <div style={{ padding: "1rem", lineHeight: "1.8" }}>
      <h2 style={{
        color: "#FFCB77", fontSize: "26px",
        fontWeight: "bold", fontFamily: "Life Savers", marginBottom: "1rem"
      }}>{parsedRecipe.name}</h2>
<div style={{
  backgroundColor: "#382120", padding: "1rem", borderRadius: "12px",
  marginBottom: "1rem", border: "1px solid #fff2", boxShadow: "inset 0 0 10px #0004"
}}>
  <p><strong>🧂 Ingredients:</strong></p>
  <p style={{ fontSize: "15px", color: "#f5f5f5" }}>{parsedRecipe.ingredients}</p>
</div>

{/* ⏱ Extra Details (now shown before steps) */}
<div style={{
  backgroundColor: "#2f1d1d", padding: "1rem", borderRadius: "12px",
  marginBottom: "1rem", border: "1px solid #fff2", boxShadow: "inset 0 0 6px #0003"
}}>
  <p><strong>⏱ Estimated Time:</strong> {parsedRecipe.time}</p>
  <br />
  <p><strong>🛒 Nearest Store Tip:</strong> {parsedRecipe.store}</p>
<br />
    <p><strong>🎓 Skill Refresher:</strong> {parsedRecipe.video}</p>
</div>

{/* Steps */}
{currentStep < parsedRecipe.instructions.length ? (
  <>
    <div style={{
      backgroundColor: "#412727", padding: "1.2rem", borderRadius: "12px",
      marginBottom: "1rem", border: "1px solid #fff2"
    }}>
      <p style={{ fontSize: "17px" }}><strong>👩‍🍳 Step {currentStep + 1} of {parsedRecipe.instructions.length}:</strong></p>
      <p style={{ fontSize: "15px", color: "#fff" }}>{parsedRecipe.instructions[currentStep]}</p>
    </div>

    <Button
      onClick={() => setCurrentStep(currentStep + 1)}
      className="tbtn"
      variant="contained"
      style={{
        backgroundColor: "#FF7043", color: "white",
        fontWeight: "bold", borderRadius: "30px", padding: "8px 24px",
        marginTop: "0.5rem", transition: "0.2s ease", opacity: "1"
      }}
    >
      ✅ Done, Next Step
    </Button>
  </>
) : (
  <div style={{
    backgroundColor: "#362424", padding: "1.2rem", borderRadius: "12px",
    border: "1px solid #fff2", boxShadow: "inset 0 0 8px #0005"
  }}>
    
    <p>🎉 You've completed all the steps!</p>

      <p><strong>🧠 Science Behind the Food:</strong> {parsedRecipe.science}</p>
  <br />


    <Button
      variant="outlined"
      className="tbtn"
      style={{
        marginTop: "1rem", color: "#fff", borderColor: "#fff",
        borderRadius: "30px", padding: "8px 24px",opacity:"1"
      }}
      onClick={() => {
        setParsedRecipe(null);
        setCount("");
        setCurrentStep(0);
      }}
    >
      🔄 Start Over
    </Button>
  </div>
)}

    </div>
  ) : (
    <div style={{ textAlign: "center" }}>
      <img src="Images/Cooking.gif" style={{ height: "280px", width: "380px", borderRadius: "12px", marginLeft:"80px"}} />
      <p style={{
        fontSize: "18px", marginTop: "1rem", fontFamily: "Poppins",
        color: "#f5f5f5", opacity: 0.9
      }}>
        Our chefs are waiting to recommend something delicious to you...! 🍳👨‍🍳
      </p>
    </div>
  )}
</div>

      </div>
      <FoodFactsPopup />
    </div>
  );
}
