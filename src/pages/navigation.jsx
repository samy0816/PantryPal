import { Link } from "react-router-dom"
import Chefstart from "./chefstart"
import Bmeter from "./bmeter"
import Foodology from "./foodology"

import Card from "../components/card";
import { useEffect } from "react";
export default function Navigation(){

     useEffect(() => {
        document.body.style.backgroundImage = "linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url('/organic-food-background-hand-drawn-concept-free-vector.jpg')";
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
        gap:"10px",
        fontFamily: "Life Savers",
        fontSize: "40px",
        fontWeight: "700",

    }
    return(
        <div style={style}>
           
            <Link  to='/chefstart' > <Card name="Chefstart" backgroundImage="/uzIlV32.gif" /></Link>
            <br />
            <Link  to='/bmeter'><Card name="BudgetMeter" backgroundImage="/image2.gif"/></Link>
            <br />
            <Link  to='/foodology'><Card name="Foodology" backgroundImage="/image4.gif"/></Link>

             <br />
            <Link  to='/foodology'><Card name="Quiz" backgroundImage="/image3.gif"/></Link>
        </div>
    )
}