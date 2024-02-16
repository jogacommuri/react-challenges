import React, { useEffect, useMemo, useState } from 'react'
import UseEffectCustom from '../hooks/UseEffectCustom';
import useCustomMemo from '../hooks/useCustomMemo';

export default function Counter() {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(100);

    UseEffectCustom(() => {
        console.log("Effect trigerred : ", count);

        return () =>{
            console.log("cleanup performed")
        }
    },[count]);

    console.log("Re rendering")
    const increment = () =>{
        setCount(count + 1);
    }

    const decrement = () =>{
        setCount(count - 1);
    }

    const squaredValue =() =>{
        console.log("Expensive calculation ")
        return count * count;
    }

    //const memoisedSquareValue = useMemo(squaredValue, [count]);
    const memoisedSquareValue = useCustomMemo(squaredValue, [count]);
    
  return (
    <div className='flex flex-col items-center'>
        <h3>Custom Counter : {count} </h3> 
        {/* <h3> Squared Counter : {squaredValue()}</h3> */}
        <h3> Squared Counter : {memoisedSquareValue}</h3>
        
        <button onClick={increment}> Increment </button>
        <button onClick={decrement}> Decrement </button>

        <h3>Custom Counter 2: {count1} </h3> 
        
        <button onClick={() => setCount1(count1 + 1)}> Increment </button>
        <button onClick={() => setCount1(count1 - 1)}> Decrement </button>
    </div>
  )
}
