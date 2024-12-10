import React, { useCallback, useEffect, useState } from 'react'
import { TbTicTac } from "react-icons/tb";
const n =5;
const m = 4;

function Cell({index,diabled, mark, turn, onClick}){
    return(
        <button 
            className='bg-white border border-gray-300 text-black text-lg bold align-middle aspect-square'
            disabled = {diabled}
            onClick={onClick}
        >
            <span>{mark}</span>
        </button>
    )
}
const TicTacToe = ({n=5,m=4}) => {
    const [board, setBoard] = useState(Array(n * n).fill(null));
    const [xIsPlaying, setIsXPlaying] = useState(true);

    const [winner , setWinner] = useState(null);
    const onReset = useCallback(()=>{
        setBoard(Array(n*n).fill(null));
        setIsXPlaying(true);
        setWinner(null)
    },[n])
    useEffect(() =>{
        onReset();
    },[n,m,onReset])

    if(m > n){
        throw Error('Invalid props. `m` must be greater than or equal to `n`.')
    }

    function getStatusMessage(){
        if(winner != null){
            return `Player ${winner} wins.`
        }
        if(!board.includes(null)){
            return `It's a draw!!!`
        }
        return `Player ${xIsPlaying ? 'X' : 'O'} turn.`
    }
   return (
    <div className='flex flex-col space-y-4 items-center space-x-2'> 
        <h5 className='flex items-center space-x-1'>
             <span> <TbTicTac/></span> 
             <span>TicTacToe </span> 
        </h5>
        <div className=' text-md bold'>{getStatusMessage()}</div>
        <div className='grid min-w-full grid-cols-3' style={{gridTemplateColumns: `repeat(${n}, 1fr)`}}>
            {Array(n * n)
            .fill(null)
            .map((__, index) => index)
            .map((cellIndex) =>{
                const turn = xIsPlaying ? 'X' : 'O';
                return(
                    <Cell 
                        index={cellIndex}
                        diabled={board[cellIndex] != null || winner != null}
                        mark={board[cellIndex]}
                        turn={turn}
                        onClick={() =>{
                            console.log("clicking on ")
                            const newBoard = board.slice();
                            newBoard[cellIndex] = turn;
                            setBoard(newBoard);
                            setIsXPlaying(!xIsPlaying);
                            setWinner(
                                determineWinner(
                                    newBoard,
                                    cellIndex,
                                    n,
                                    m
                                )
                            )
                        }}
                    />
                )
            })
            }
            
        </div>
        <button 
            className='border border-gray-400 rounded-md p-2'
            onClick={() =>{
                if(winner == null){
                    const confirm = window.confirm('Are you sure you want to reset the game?');
                    if(!confirm){
                        return
                    }
                }
                setBoard(Array(9).fill(null));
                setIsXPlaying(true)
            }}
        >
            Reset 
        </button>
    </div>
  )
}

const determineWinner = (board, index, n, m) =>{
    console.log("Board", board);
    const row = Math.floor(index/n);
    const col =  index % n;
    //row
    const rowLine = [];
    for(let i =0;i < n;i++){
        rowLine.push(row * n + i)
    }
    console.log(rowLine)
    //col
    const colLine = [];
    for(let i =0; i<n; i++){
        colLine.push(i * n + col)
    }
    console.log(colLine);

    const leftToRightDiagonalLine = getLeftToRightDiagonal(index, n);
    const rightToLeftDiagonalLine = getRightToLeftDiagonal(index, n);
    console.log(leftToRightDiagonalLine);
    console.log(rightToLeftDiagonalLine);


    const Lines = [
        rowLine,
        colLine,
        leftToRightDiagonalLine,
        rightToLeftDiagonalLine
    ]

    for( const line of Lines){
        let currentWinner = null;
        let currentCountInARow = 0;
        for(const i of line){
            if(board[i] == null){
                currentWinner = null;
                currentCountInARow = 0;
                continue;
            }
            if(board[i] == currentWinner){
                currentCountInARow++;
            }else{
                currentWinner = board[i];
                currentCountInARow = 1;
            }
            if(currentCountInARow >= m){
                return currentWinner;
            }

        }
    }
    return null;
}

function getLeftToRightDiagonal(i, n){
    const row = Math.floor(i / n);
    const col = i % n;

    const stepsToStart = Math.min(col, row);
    const startRow = row -  stepsToStart;
    const startCol = col - stepsToStart;
    const line = [];
    for(let i = 0; i < n ; i++){
        const currentRow = startRow + i;
        const currentCol = startCol + i;
        if(currentRow >= n || currentCol >= n){
            break;
        }
        line.push(currentRow * n + currentCol)
    }
    return line;
 }

 function getRightToLeftDiagonal(i, n){
    const row = Math.floor(i / n);
    const col = i % n;

    const stepsToStart = Math.min(n - col - 1, row);
    const startRow = row - stepsToStart;
    const startCol = col + stepsToStart;
    const line = [];

    for(let i=0; i<n; i++){
        const currentRow = startRow + i;
        const currentCol =  startCol - i;
        if(currentRow >= n || currentCol < 0){
            break;
        }
        line.push(currentRow * n + currentCol)
    }

    return line;
 }

export default TicTacToe