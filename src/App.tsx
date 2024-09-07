import React, { useState } from "react";
import Block from "./components/Block";
import './App.css';

function App() {
  const [state, setState] = useState(Array(9).fill(null)); // Game board state
  const [currTurn, setCurrTurn] = useState("X"); // Tracks current player
  const [winner, setWinner] = useState<string | null>(null); // Tracks winner

  // Function to check for a winner
  const checkWinner = () => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a]; // Return the winner ("X" or "O")
      }
    }
    return null; // No winner yet
  };

  const handleBlockClick = (index: number) => {
    if (state[index] || winner) return; // Ignore clicks on filled blocks or if there's a winner

    const stateCopy = [...state]; // Create a copy of the current state
    stateCopy[index] = currTurn; // Set the current block to the current player's turn
    setState(stateCopy); // Update state

    const result = checkWinner(); // Check for a winner

    if (result) {
      setWinner(result); // If we have a winner, set it
      alert(`${result} won the game!`);
      return;
    }

    setCurrTurn(currTurn === 'X' ? 'O' : 'X'); // Toggle the turn
  };

  return (
    <div className="main-board-container">
      <div className="row">
        <Block onClick={() => handleBlockClick(0)} value={state[0]} />
        <Block onClick={() => handleBlockClick(1)} value={state[1]} />
        <Block onClick={() => handleBlockClick(2)} value={state[2]} />
      </div>
      <div className="row">
        <Block onClick={() => handleBlockClick(3)} value={state[3]} />
        <Block onClick={() => handleBlockClick(4)} value={state[4]} />
        <Block onClick={() => handleBlockClick(5)} value={state[5]} />
      </div>
      <div className="row">
        <Block onClick={() => handleBlockClick(6)} value={state[6]} />
        <Block onClick={() => handleBlockClick(7)} value={state[7]} />
        <Block onClick={() => handleBlockClick(8)} value={state[8]} />
      </div>
      {winner && <h2>{winner} is the winner!</h2>}
    </div>
  );
}

export default App;
