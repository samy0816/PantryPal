import { useEffect, useState } from "react";

const foodFacts = [
  {
    fact: "Adding salt early in cooking helps tenderize meat.",
    // Change to your actual route
  },
  {
    fact: "Tomatoes have more umami flavor when cooked.",
 
  },
  {
    fact: "The Maillard reaction creates browned flavors in cooking.",

  },
  {
    fact: "Lemon juice can prevent fruits like apples from browning.",

  },
  {
    fact: "Soaking onions in water reduces their pungency.",
   
  },
];

export function FoodFactsPopup() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % foodFacts.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const currentFact = foodFacts[index];

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      maxWidth: "280px",
      backgroundColor: "rgba(255, 239, 21, 0.95)",
      color: "#333",
      padding: "14px 18px",
      borderRadius: "12px 0px 12px 12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      fontSize: "18px",
      fontFamily: "Segoe UI, sans-serif",
      zIndex: 9999,
      userSelect: "none",
      transition: "opacity 0.5s ease",
      pointerEvents: "none",
    }}>
      <div style={{ fontWeight: "bold", marginBottom: "6px" }}>💡Did you know?</div>
      <div style={{ marginBottom: "6px" }}>{currentFact.fact}</div>
      <div>
        <a 
          href={currentFact.linkHref} 
          style={{ color: "#0077cc", textDecoration: "underline", pointerEvents: "auto" }}
        >
          {currentFact.linkText}
        </a>
      </div>
    </div>
  );
}