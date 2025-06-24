import { Link } from "react-router-dom"
import Chefstart from "./chefstart"

import Card from "../components/card";
import { useEffect } from "react";
export default function Navigation(){

     useEffect(() => {
        document.body.style.backgroundImage = "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('Images/organic-food-background-hand-drawn-concept-free-vector.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
    
        return () => {
          // Clean up when leaving the page
          document.body.style.backgroundImage = "";
        };
      }, []);
    const style={
        display: "flex",
        gap:"30px",
        fontFamily: "Life Savers",
        fontSize: "40px",
        fontWeight: "bold",

    }
    return(
        <div style={style}>
           
            <Link  to='/chefstart' > <Card name="Chefstart" backgroundImage="Images/uzIlV32.gif" /></Link>
            <br />
            <Link  to='/bmeter'><Card name="BudgetMeter" backgroundImage="Images/image2.gif"/></Link>
            <br />
            <Link  to='/foodology'><Card name="CookBuddy" backgroundImage="Images/image4.gif"/></Link>

             <br />

        </div>
    )
}
