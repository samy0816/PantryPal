import { useState } from "react";

export default function StudentFoodBudgetCard() {
    const [monthlyBudget, setMonthlyBudget] = useState("");

    const percentages = {
        Groceries: 0.6,
        "Dining Out": 0.25,
        Snacks: 0.15
    };

    const allocations = Object.entries(percentages).map(([category, percent]) => ({
        category,
        amount: monthlyBudget ? (monthlyBudget * percent).toFixed(2) : "0.00",
        percent: (percent * 100).toFixed(0)
    }));

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "40px",
                padding: "20px",
            }}
        >
            {/* Responsive container */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    color:"white"
                }}
            >
                {/* Left (Text) + Right (Calculator) Container */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "40px",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            textAlign: "left",
                        }}
                    >
                        <p><strong>What Is Food Budgeting?</strong></p>
                        <img src="../public/food1.gif" height="400" width="500"alt="" />
                        <p>
                            Food budgeting is the process of planning how much money you will spend on food over a specific period—usually a week or a month. It helps you control your expenses, avoid food waste, and make healthier choices. Especially for students or people living on their own for the first time, learning how to budget food costs is an essential life skill.
                        </p>
                        <ul>
                            <li>You might overspend on takeout or snacks.</li>
                            <li>You might run out of money before the month ends.</li>
                            <li>You may eat unhealthily because you're forced to buy cheap, quick options.</li>
                        </ul>
                        <p>
                            Budgeting gives you <strong>freedom within limits</strong>—you know how much you can spend, so you don’t need to worry every time you buy something.
                        </p>

                        <p><strong>The 60-25-15 Rule Explained</strong></p>
                        <p>
                            To make food budgeting simple and practical, we use a <strong>60-25-15 split</strong>. Here's what each part means and why it's useful:
                        </p>

                        <p><strong>60% – Groceries (Essentials)</strong></p>
                        <p>
                            This is the largest part of your food budget—and for good reason.
                        </p>
                        <p>
                            Groceries include: staple items (rice, pasta, bread), fresh produce (fruits, vegetables), dairy, eggs, or alternatives, and basic cooking ingredients like oil and spices.
                        </p>
                        <p>
                            Investing more in groceries encourages <strong>home cooking</strong>, which is almost always cheaper and healthier than dining out. It also allows you to prepare multiple meals with the same ingredients, making your money go further.
                        </p>

                        <p><strong>25% – Dining Out</strong></p>
                        <p>
                            Dining out is fun and convenient, but it can be expensive. This category covers eating at restaurants or cafes, takeout and delivery orders, and canteen or cafeteria meals.
                        </p>
                        <p>
                            Keeping this part of your budget smaller encourages moderation. You can still enjoy the occasional meal out without letting it drain your wallet. The 25% limit helps you <strong>treat yourself without guilt</strong>, while staying on track with your budget.
                        </p>

                        <p><strong>15% – Snacks and Extras</strong></p>
                        <p>
                            This part is often overlooked but important. Snacks include coffee or tea from cafes, packaged snacks like chips or biscuits, and impulse treats like chocolate or soft drinks.
                        </p>
                        <ul>
                            <li>Avoid overspending on non-essential items</li>
                            <li>Become more mindful of your habits</li>
                            <li>Still get to enjoy occasional comfort food or cravings</li>
                        </ul>

                        <p><strong>Why This Split Works</strong></p>
                        <ul>
                            <li><strong>Simple and balanced:</strong> Not too strict, but still structured.</li>
                            <li><strong>Realistic for students and young adults</strong> with busy lifestyles.</li>
                            <li><strong>Promotes healthy habits</strong> like home cooking and meal planning.</li>
                            <li><strong>Flexible:</strong> You can adjust it slightly based on your needs (e.g., if you cook a lot, shift more into groceries).</li>
                        </ul>
                        <p><strong>Wanna try split for your budget?? do enter your food budget and get the allocation!</strong></p>
                      
                    </div>

                    <div
                        style={{
                            flex: 1,
                            padding: 20,
                            maxWidth: "100%",
                            height:800,
                            width:500,
                            border: "2px solid white",
                            boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
                            borderRadius: 16,
                            background: "rgba(255, 255, 255, 0.21)",
                            fontFamily: "Arial, sans-serif",
                            
                        }}
                    >
                        <h2 style={{ textAlign: "center", marginBottom: 20, color:"black"}}>🎓 Student Food Budget Planner</h2>

                        <input
                            type="number"
                            value={monthlyBudget}
                            onChange={(e) => setMonthlyBudget(parseFloat(e.target.value) || "")}
                            placeholder="Enter monthly budget in €"
                            style={{
                                width: "100%",
                                padding: "12px 15px",
                                fontSize: 16,
                                borderRadius: 8,
                                border: "1px solid #ccc",
                                marginBottom: 30,
                                boxSizing: "border-box"
                            }}
                        />

                        {monthlyBudget && (
                            <>
                                <h3 style={{ marginBottom: 15, textAlign: "center" }}>💡 Suggested Allocation</h3>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 20,
                                        justifyContent: "center",
                                        flexWrap: "wrap"
                                    }}
                                >
                                    {allocations.map(({ category, amount, percent }) => (
                                        <div
                                            key={category}
                                            style={{
                                                background: "white",
                                                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                                borderRadius: 12,
                                                padding: 20,
                                                flex: "1 1 150px",
                                                maxWidth: 180,
                                                textAlign: "center",
                                                transition: "transform 0.2s",
                                                cursor: "default"
                                            }}
                                        >
                                            <h4 style={{ margin: "0 0 10px", color: "#333" }}>{category}</h4>
                                            <p style={{ fontSize: 24, margin: "0 0 5px", fontWeight: "bold", color: "#2c3e50" }}>
                                                €{amount}
                                            </p>
                                            <small style={{ color: "#7f8c8d" }}>{percent}% of budget</small>
                                        </div>
                                    ))}
                                </div>

                                <h3 style={{ textAlign: "center", marginTop: 40 }}>
                                    Total: €
                                    {allocations
                                        .reduce((sum, a) => sum + parseFloat(a.amount), 0)
                                        .toFixed(2)}
                                </h3>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Responsive styling */}
            <style>
                {`
                    @media (min-width: 900px) {
                        div[style*="flex-direction: column"][style*="gap: 40px"] {
                            flex-direction: row !important;
                            align-items: flex-start;
                        }
                    }
                `}
            </style>
        </div>
    );
}
