import { useState } from "react";

export default function Card({ name, backgroundImage }) {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
        height: "300px",
        width: "300px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "10px",
        color: "white",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        transform: isHovered ? "scale(1.03)" : "scale(1)"
    };

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        transition: "opacity 0.3s ease"
    };

    const overlayStyle = {
        backgroundColor: isHovered ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.3)",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 2,
        transition: "background-color 0.3s ease"
    };

    const contentStyle = {
        position: "relative",
        zIndex: 3,
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={backgroundStyle}></div>
            <div style={overlayStyle}></div>
            <div style={contentStyle}>
                <p>{name}</p>
            </div>
        </div>
    );
}
