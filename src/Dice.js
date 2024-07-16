import React, { useState, useEffect } from 'react';
import './Dice.css';



const Dice = ({ rolling,number }) => {
  const [diceNumber, setDiceNumber] = useState(null);

  useEffect(() => {
        if(number){
            setDiceNumber(number);
        }
       
    
  }, [number]);

 

  return (
    <div className={`dice ${rolling ? 'rolling' : ''}`}>
      <div className="dice-face">{diceNumber !== null ? diceNumber : '*'}</div>
    </div>
  );
};

export default Dice;