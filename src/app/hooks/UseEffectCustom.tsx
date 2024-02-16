import { useRef } from "react"

const UseEffectCustom = (cbEffect, dependency) => {
   
    const isFirstRender = useRef(true);
    const prevDependency = useRef([])
    // first render
    if( isFirstRender.current){
        isFirstRender.current = false;
        const cleanup = cbEffect();
        return () =>{
            if(cleanup && typeof cleanup === "function"){
                cleanup();
            }
        }
    }
    //dependency changes and no dependency array

    const depChanges = dependency 
    ? (JSON.stringify(dependency) !== JSON.stringify(prevDependency.current)) 
    : true;

    if(depChanges){
        const cleanup = cbEffect();
        if(cleanup && typeof cleanup === "function" && dependency){
            cleanup();
        }
    }
    //cleanup

    prevDependency.current = dependency || [];
}

export default UseEffectCustom