import React, { useEffect, useRef } from 'react'

const areEqual = (prevDeps, nextDeps) =>{
    if(prevDeps === null) return false;

    if(prevDeps.length !== nextDeps.length ) return false;

    for(let i=0;i<prevDeps.length; i++){
        if(prevDeps[i] != nextDeps[i]){
            return false
        }
    }

    return true;
}
const useCustomMemo = (cb, deps) => {
    //variable or state  -> cached value
    const memoisedRef = useRef(null);
    //changes in dep
    if(!memoisedRef.current || !areEqual(memoisedRef.current.deps, deps)){
        memoisedRef.current = {
            value: cb(),
            deps
        }
    }
    //cleanup logic
    useEffect(() =>{
        return () =>{
            memoisedRef.current = null
        }
    },[])
    //return the memoised value 
    return memoisedRef.current.value;
}

export default useCustomMemo