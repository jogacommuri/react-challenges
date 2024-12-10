import React, { useEffect, useState } from 'react'


const GridPuzzle = ({n}) => {

  const [grid, setGrid] = useState([]);

  useEffect(()=>{
    const initGrid = Array(n).fill(null).map(()=> Array(n).fill(false))
    setGrid(initGrid)
  },[])
  const handleClick = (row, col) =>{
      console.log(row);
      console.log(col);
      console.log(grid)

      const updateGrid = grid.map((r, rowIndex) => (
        r.map((c, colIndex) =>{
          if((rowIndex === row && colIndex === col)||
            (rowIndex === row-1 && colIndex === col)|| //top
            (rowIndex === row+1 && colIndex === col)|| //bottom
            (rowIndex === row && colIndex === col+1)|| //right
            (rowIndex === row && colIndex === col-1)
          ){
            return !c;
          }
          return c;
        })

        ));
        console.log(updateGrid)
        setGrid(updateGrid)
  }
  return (
    <div className='flex flex-col align-center justify-center g'>
      <div className='flex flex-col'>
        <h3>React Grid Puzzle</h3>
        <p>Create a basic react app with the following behavior:</p>
        <p>display a grid of squares (the number of rows and columns can be specified in the URL)
        clicking on a square toggles the color of that square and all the squares sharing an edge with that square</p>
      </div>
      <div className='grid w-[220px] grid-cols-3 justify-center content-center gap-1 mt-5 border border-gray-300' 
        style={{gridTemplateColumns: `repeat(${n}, 1fr)`}}>
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) =>(
              <div key={`${rowIndex} - ${colIndex}`}
                className={`w-10 h-10  cursor-pointer transition-colors ease-in-out self-center align-middle ${cell? 'bg-orange-300':'bg-cyan-200'}`}
                onClick={()=>handleClick(rowIndex, colIndex)}
              >
                
              </div>
            ))
          ))}
          
      </div>
    </div>
  )
}

export default GridPuzzle

/**
 * Create a basic react app with the following behavior:



 */