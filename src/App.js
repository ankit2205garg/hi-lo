import React, { useState } from 'react';
import './App.css';
import Dice from './Dice';
import {HiLoConst, defaultVal} from './globalConstant';
import { secureRandomNumber, zeroPad } from './utils';


const App = () => {
  const [currentNumber, setCurrentNumber] = useState(new Array(defaultVal.noOfDiceBlocks).fill(null));
  const [currentBalanceRe,setCurrentBalance] = useState(defaultVal.currentBalance);
  const [betAmount, setBetAmount] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

 
  const handleGuess = ( type) => {
    if(betAmount && !error){
      setRolling(true);
       setTimeout(() => {
        const number = secureRandomNumber(defaultVal.minNumberRange,defaultVal.maxNumberRange);
        const out1 = zeroPad(number);
  
        setCurrentNumber(out1);
        setCurrentBalance((+currentBalanceRe-+betAmount).toFixed(8));
        setRolling(false);
        calculatePayout(out1,type);
      }, 1500); 
  
    } else if(!error){
      setError('Please Enter bet amount');
    }
    
   
  };

  const calculatePayout = (number, betType) => {
    const payoutMultiplier = defaultVal.payoutMultiplier;
    if ((betType === HiLoConst.HI && number >= defaultVal.hiRangeStartPoint) || (betType === HiLoConst.LO && number < defaultVal.loRangeEndPoint)) {
      setMessage({message:`You bet ${betType} so you win ${(payoutMultiplier*betAmount).toFixed(8)} BTC`,isProfit:true});
      setCurrentBalance((+currentBalanceRe+payoutMultiplier*betAmount).toFixed(8));
    } else {
      setMessage({message:`You bet ${betType} so you lose ${betAmount} BTC`,isProfit:false});
     
    }
  };

  const onNumberInput = (e)=>{
     setBetAmount(e.target.value);
     if(e.target.value<=currentBalanceRe){
      setError(false);
     } else{
      setError('Balance is low');
     }
    
  }

  return (
    <div className="App">
      <h1>Hi-Lo Dice Game</h1>
      <p>Current Balance {currentBalanceRe} BTC</p>
      {currentNumber &&<div style={{display:'flex',flexDirection:'row', flexWrap:'wrap', marginBottom:'10px', justifyContent:'center'}}>
        {(Array.isArray(currentNumber)?currentNumber : currentNumber.split('')).map((item)=>{
             return (
              <Dice number={item} rolling={rolling} />
             )
        })}
      
      </div>}
     
      <div className='btn-container'>
      <button onClick={() => handleGuess('Hi')} disabled={rolling} className='btn-c btn-hi'>Bet Hi</button>
      <button onClick={() => handleGuess('Lo')} disabled={rolling} className='btn-c btn-lo'>Bet Lo</button>
      </div>
      
      <label>Enter bet amount</label><input type='text' value={betAmount} onChange={onNumberInput}/>
      {error? <p style={{color:'red'}}>{error}</p>:null}
      {message && <p className={`msg`} style={message?.isProfit?{backgroundColor:'green'}:{backgroundColor:'red'}}>{message?.message}</p>}
    </div>
  );
};

export default App;
