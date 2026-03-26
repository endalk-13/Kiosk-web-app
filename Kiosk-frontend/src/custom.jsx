import React from "react";


function Custom() {
  return (
    <div>
        <h1>Burger Builder</h1>
        <p>Customize your burger here!</p>
        <div>
            <h3>Would you like to add any toppings?</h3>
            <button onClick={() => alert("Added cheese!")}>Add Cheese</button>
            <button onClick={() => alert("Added bacon!")}>Add Bacon</button>
            <button onClick={() => alert("Added lettuce!")}>Add Lettuce</button>
        </div>
        <div>
            <h3>Choose your bun:</h3>
            <button onClick={() => alert("Added sesame bun!")}>Sesame Bun</button>
            <button onClick={() => alert("Added brioche bun!")}>Brioche Bun</button>
        </div>
        <div>
            <h3>Choose your patty:</h3>
            <button onClick={() => alert("Added beef patty!")}>Beef Patty</button>
            <button onClick={() => alert("Added chicken patty!")}>Chicken Patty</button>
        </div>
        <div>
        </div>
    </div>  

    );
}

export default Custom;