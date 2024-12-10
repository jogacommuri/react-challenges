import React, { useEffect, useState } from 'react'
const emojis = [
  '🐵',
  '🐶',
  '🦊',
  '🐱',
  '🦁',
  '🐯',
  '🐴',
  '🦄',
  '🦓',
  '🦌',
  '🐮',
  '🐷',
  '🐭',
  '🐹',
  '🐻',
  '🐨',
  '🐼',
  '🐽',
  '🐸',
  '🐰',
  '🐙',
];
const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);

  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);

  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const [clicks, setClicks] = useState(0);

  const handleGridSizeChange = (e) =>{
    console.log("Changing grid size")
    const size = parseInt(e.target.value);
    if( size >=2  && size <=10) setGridSize(size)
  }

  const checkMatch = (checkId) =>{
    const [firstId] = flipped;
    if(cards[firstId].number === cards[checkId].number){
      setSolved([...solved, firstId, checkId])
      setFlipped([]);
      setDisabled(false)
    }else{
      setTimeout(() => {
        setFlipped([]);
        setDisabled(false)
      },1000)
    }
  }
  const handleCardClick = (id) =>{
    console.log("handle card click =>", id)
    setClicks(clicks + 1)
    if(disabled || won) return;
    if(flipped.length === 0){
      setFlipped([id]);
      
      return
    }
    if(flipped.length === 1){
      setDisabled(true);
      if(id !== flipped[0]){
        setFlipped([...flipped, id]);
        //check match logic
        checkMatch(id)
      }else{
        setFlipped([]);
        setDisabled(false);
      }
    }
  }

  const isFlipped = (id) => flipped.includes(id) || solved.includes(id);
  const isSolved =  (id) => solved.includes(id);

  const initializeGame = () =>{
    const totalCards = gridSize * gridSize;

    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map(n=> n+1)

    const shuffledCards = [...numbers, ...numbers].sort(() => Math.random() - 0.5).slice(0, totalCards).map((number, index)=> ({id:index, number}))
    //console.log(shuffledCards)
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setWon(false);
    setClicks(0)
  }


  useEffect(() =>{
    initializeGame()
  },[gridSize])

  useEffect(() =>{
    if(solved.length === cards.length && cards.length > 0){
      setWon(true)
    }
  },[solved, flipped])

  return (
    <div className='flex flex-col w-full justify-center items-center min-h-screen bg-gray-100 p-4'>
      <h3 className='text-3xl font-semibold font-sans underline mb-6'>Memory Game </h3>
      {/* <div className='flex'> {emojis} </div> */}
      {/* Input */}
      <div className='mb-4'>
        <label htmlFor='gridSize' className='mr-2 align-baseline'>Grid Size: (max 10)</label>
        <input className='border-2 border-gray-300 rounded p-2' type='number' id='gridSize' min='2' max='10' value={gridSize} onChange={handleGridSizeChange} />
      </div>
      {/* game board */}
      <div className={`grid gap-2 mb-4`} 
        style={{
          gridTemplateColumns:`repeat(${gridSize}, minmax(0,1fr))`,
          width:`min(100%,${gridSize * 5.5}rem )`
        }}>
        {cards.map((card) => {
          return (
            <div key={card.id}
              className={`aspect-square flex items-center justify-center text-xl font-semibold rounded-lg border cursor-pointer 
                          transition-all duration-300 
                          ${isFlipped(card.id) ? 
                            isSolved(card.id) ?
                            'bg-green-500 text-white':
                            'bg-blue-500 text-white' : 
                            'bg-gray-300 text-gray-600 '} `}
              onClick={() => handleCardClick(card.id)}
            >
              {isFlipped(card.id) ? card.number : "?"}
            </div>
          )
        })}
      </div>
      {/* Result */}
      {won && (
        <div className='mt-4 text-3xl font-thin text-red-400 animate-bounce'> 
          You won! in {clicks} moves.
        </div>)}
      {/* Reset / play again */}
        <button 
          onClick={initializeGame}
          className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors'>
          {won ? "Play Again" : "Reset"}
        </button>
    </div>
  )
}

export default MemoryGame