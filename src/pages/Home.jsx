import React, { useEffect } from "react";
import { Link } from "react-router";

export default function Home() {
  useEffect(() => {
    document.body.style.backgroundImage = "url('/organic-food-background-hand-drawn-concept-free-vector.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundRepeat = "";
      document.body.style.backgroundPosition = "";
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "Life Savers",
        color: "black",
        fontSize: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px",
      }}
    >
      <h1>PantryPal</h1>
      <h2>"Your Handy kitchen buddy"</h2>
      <Link
        to="/navigation"
        style={{
          fontSize: "30px",
          borderRadius: "20px",
          backgroundColor: "#000",
          color: "white",
          padding: "10px 30px",
          textDecoration: "none",
          marginTop: "20px",
          display: "inline-block",
        }}
      >
        Start
      </Link>
    </div>
  );
}
