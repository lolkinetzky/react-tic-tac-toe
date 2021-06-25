import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setPlayer] = useState('');
  const switchPlayer = () => {
    currentPlayer === PLAYER_1 ? setPlayer(PLAYER_2) : setPlayer(PLAYER_1);
  }
  
  const onClickCallback = (clickedSquare) => {
    const newSquares = [];
    if (winner !== '') {
      return;
    } else {
      squares.forEach((row) => {
        const newRow = [];
        row.forEach((square) => {
          if (square.value === '') {
            if (square.id === clickedSquare) {
              switchPlayer();
              square.value = currentPlayer;
            }
          }
          newRow.push(square);
        });
        newSquares.push(newRow);
      });
      winnerIs(); 
      setSquares(newSquares);
    }
  };

  const winnerIs = () => {
    for (let row of squares) {
      if (row[0].value === row[1].value && row[0].value) {
        return row[0].value;
      }
    }
      if (squares[0][0].value === squares[1][1].value && squares[1][1].value === squares[0][2].value) {
        return squares[1][1].value
      }

      for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
          return null
        }
      }
      return 'Tie!'
    }

  const resetGame = () => {
    setSquares(generateSquares());
    winnerIs(null);
    setPlayer(PLAYER_1);
  }

  const winner = winnerIs();

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... {winner} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/>
      </main>
    </div>
  );
}

export default App;
