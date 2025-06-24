import { Link } from "react-router";
import "../styles/bstyle.css";
import { useEffect } from "react";

export default function Bmeter() {


    useEffect(() => {
      document.body.style.backgroundImage =
         "linear-gradient(90deg,rgba(0, 29, 43, 1) 33%, rgba(2, 2, 18, 1) 50%, rgba(0, 33, 48, 1) 100%)";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
  

  
      return () => {
        document.body.style.backgroundImage = "";

      };
    }, []);
  
  return (
   <div>
  <h1>What Is Food Budgeting?</h1>
  <div className="timeline">

    <div className="container1 leftcontainer">
      <h3>🧾</h3>
      <div className="textbox">
        <h2>What Is Food Budgeting?</h2>
        <p>
          Food budgeting is the practice of planning and managing how much money you spend on food over a set period—like a week or month. It helps you make smart decisions, save money, avoid waste, and eat better. This is especially helpful for students living on a tight budget or managing their own finances for the first time.
        </p>
        <span className="leftcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 rightcontainer">
      <h3>⚠️</h3>
      <div className="textbox">
        <h2>Why It Matters</h2>
        <p>
          Without a food budget, you might:
          <ul>
            <li>Overspend on fast food or delivery</li>
            <li>Run out of money before the month ends</li>
            <li>Rely on cheap, unhealthy meals</li>
          </ul>
          Budgeting helps you balance nutrition, convenience, and cost—so you can eat well without financial stress.
        </p>
        <span className="rightcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 leftcontainer">
      <h3>📚</h3>
      <div className="textbox">
        <h2>Start with a Realistic Budget</h2>
        <p>
          Begin by looking at your total monthly income and fixed expenses. Decide how much you can reasonably allocate to food. A good food budget should reflect your needs, lifestyle, and cooking habits. It doesn't have to be perfect—just practical.
        </p>
        <span className="leftcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 rightcontainer">
      <h3>🛒</h3>
      <div className="textbox">
        <h2>Shop Smart</h2>
        <p>
          Use a grocery list to avoid impulse buys. Buy in bulk when possible, choose store brands, and look for sales or discounts. Stick to staple ingredients that can be used in multiple meals—like rice, beans, pasta, frozen veggies, and canned goods.
        </p>
        <span className="rightcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 leftcontainer">
      <h3>🥗</h3>
      <div className="textbox">
        <h2>Cook More, Spend Less</h2>
        <p>
          Cooking at home is almost always cheaper (and healthier) than eating out. Learn a few basic recipes and prep meals in advance. Batch cooking and leftovers are great for busy schedules and tight budgets.
        </p>
        <span className="leftcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 rightcontainer">
      <h3>📆</h3>
      <div className="textbox">
        <h2>Plan Your Meals</h2>
        <p>
          Meal planning saves time and reduces food waste. Think ahead about what you’ll eat during the week, and shop accordingly. It helps you stick to your budget and avoid last-minute takeout decisions.
        </p>
        <span className="rightcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 leftcontainer">
      <h3>☕</h3>
      <div className="textbox">
        <h2>Leave Room for Treats</h2>
        <p>
          Being strict doesn’t mean you can’t enjoy snacks, coffee, or the occasional takeout. Budget for it! Planning small indulgences helps you stay balanced and prevents binge spending later.
        </p>
        <span className="leftcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 rightcontainer">
      <h3>📈</h3>
      <div className="textbox">
        <h2>Track & Adjust</h2>
        <p>
          Keep track of what you spend on food each week. Use apps, notes, or spreadsheets—whatever works for you. Review your habits monthly and adjust your budget if needed. Flexibility is key to long-term success.
        </p>
        <span className="rightcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 leftcontainer">
      <h3>✅</h3>
      <div className="textbox">
        <h2>Smart Budgeting, Smart Living</h2>
        <p>
          Food budgeting isn’t just about saving money—it’s about gaining control over your lifestyle. You’ll develop better habits, eat more intentionally, and build financial confidence that carries into other areas of life.
        </p>
        <span className="leftcontainer-arrow"></span>
      </div>
    </div>

    <div className="container1 rightcontainer">
      <h3>🧮</h3>
      <div className="textbox">
        <h2>Want to Try It Out?</h2>
        <Link to='/bmeter2'>Click here to use our food budget calculator and build your personalized spending plan!</Link>
        <span className="rightcontainer-arrow"></span>
      </div>
    </div>

  </div>
</div>

  );
}
