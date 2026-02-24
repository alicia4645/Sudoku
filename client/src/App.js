import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import  Grid  from './components/grid'

function App() {
  const emptyGrid = Array(9).fill(0).map(() => Array(9).fill(0)) 
  const [initialGrid, setInitialGrid] = useState(emptyGrid)
  const [grid, setGrid] = useState(emptyGrid)
  const [solution, setSolution] = useState(emptyGrid)

  const [message, setMessage] = useState("")
  const [complete, setComplete] = useState(false)

  const  loadGrid = async () => {
    axios.get('https://sudoku-api.vercel.app/api/dosuku')
    .then(response => {
      const { value, solution } = response.data.newboard.grids[0]
      
      setInitialGrid(value)
     
      const newGrid = value.map(row => [...row])
      setGrid(newGrid)
      
      setSolution(solution)
    })
    .catch(err => console.log('an error has occured'));
  }
 
  useEffect( () => {
    loadGrid()
  },[])

  const isComplete = () => {
    if(grid.flat(1).every((val , i) => val === solution.flat(1)[i])){
      setComplete(true)
      setMessage("Well Done! You have completed this grid.")
    }
  }
  
  const onChange = ( row, column, value, isFixed ) => {
    if(isFixed) return 

    value = Number(value)
    
    const newGrid = [...grid]
    newGrid[row][column] = value
    setGrid(newGrid)
    
    isComplete()
  }

  const resetGrid = () => {
    setMessage("")
    setGrid(initialGrid)
  }

  const solveGrid = () => {
    setGrid(solution)
    setComplete(true)
  }

  const newGame = () => {
    setMessage("")
    loadGrid()
  }
  
  return (
    <div className="app">
      <div id='game'> 
        <h1>Sudoku</h1>
        <h3 id='message'>{message}</h3>
        <Grid
          grid={grid}
          onChange={onChange}
          initialGrid={initialGrid}
          complete={complete}
        />
        <div id='buttons'>
          <button onClick={resetGrid}>Reset</button>
          <button onClick={solveGrid}>Solve</button>
          <button onClick={newGame}>New Game</button>
        </div>
      </div>

    </div>
  );
}

export default App;
