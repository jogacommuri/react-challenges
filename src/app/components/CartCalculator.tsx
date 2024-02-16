import { stat } from 'fs';
import React, { useEffect, useReducer } from 'react'

//reducers in seperate folder- cartReducer.js
const cartReducer = (state, action) =>{
    switch(action.type){
        case "ADD_PRODUCTS":
            return {...state, products: action.payload}
        default:
            break;
    }
}
export default function CartCalculator() {
    const [state, dispatch] = useReducer(cartReducer, {
        products:[],
        cart: [],
    });
    console.log(state)

    const fetchData = async () =>{
        try{
            const res = await fetch(`https://dummyjson.com/products`);
           
            if(!res.ok){
                throw new Error("Response not OK")
            }
            const data =  await res.json()
            // console.log(data.products)

            dispatch({
                type: "ADD_PRODUCTS",
                payload: data.products
            });

        }catch(err){
            console.log(err)
        }
        
    }
    useEffect(() => {
        fetchData()
    },[])
  return (
    <div>cartCalculator</div>
  )
}
