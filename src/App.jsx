import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const boardRef = useRef();
  const [chance, setchance] = useState('x');
  const [board, setboard] = useState(Array(9).fill(null));
  const [winner, setwinner] = useState(null);
  const [status, setstatus] = useState("Tic-Tac-Toe");
  const [clickDisabled, setclickDisabled] = useState(false);
  const [winLine, setwinLine] = useState(null)


  useEffect(() => {
    let newArray = JSON.parse(localStorage.getItem("board"));
    setboard(newArray);
    setclickDisabled(false);
    setchance(JSON.parse(localStorage.getItem("chance")));

  }, [])

  useEffect(() => {

    updateLocalHost();

  }, [chance])


  useEffect(() => {

    checkWinner();

    updateLocalHost();

  }, [board])

  useEffect(() => {
    if (winner != null) {
      setstatus(`Winner is: ${winner.toUpperCase()}`);
    }
  }, [winner])



  function updateLocalHost() {
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("chance", JSON.stringify(chance));
  }

  const handleClick = (index) => {
    if (clickDisabled) return;
    if (board[index] != null) return;
    setchance(chance == 'x' ? 'o' : 'x');
    let newArray = [...board];
    newArray[index] = chance;
    setboard(newArray);
  }

  const handleNewGame = () => {
    let newArray = new Array(9).fill(null);
    setboard(newArray);
    setwinner(null);
    setstatus("Tic-Tac-Toe")
    setclickDisabled(false);
    setchance(JSON.parse(localStorage.getItem("chance")))
    setwinLine(null)
  }

  const checkWinner = () => {

    const lines = [
      [0, 3, 6], // vertical
      [1, 4, 7],
      [2, 5, 8],
      [0, 1, 2], // horizontal
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8], // diagonal
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {

      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setwinLine(lines[i]);
        setclickDisabled(true);
        setwinner(chance == 'x' ? 'o' : 'x');
      }

    }

  }

  const getLineStyle = (index) => {
    if (winLine == null) return;
    let idx = winLine.findIndex((e) => e == index);
    if (idx == -1) return;
    if (winLine[1] == winLine[0] + 1) {   // horizontal

      return {
        position: "absolute",
        height: "5px",
        backgroundColor: "#990f02",
        top: `45%`,
        width: "120%"
      }
    } else if (winLine[1] == winLine[0] + 3) {  // vertical

      return {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        height: "120%",
        backgroundColor: "#990f02",
        left: `50%`,
        width: "5px"
      }
    } else if (winLine[1] == winLine[0] + 4) {  // left diagonal

      return {
        position: "absolute",
        height: "5px",
        backgroundColor: "#990f02",
        top: `47%`,
        width: "150%",
        transform: 'rotate(42deg)'
      }

    } else if (winLine[1] == winLine[0] + 2) {  // right diagonal

      return {
        position: "absolute",
        height: "5px",
        backgroundColor: "#990f02",
        top: `47%`,
        width: "150%",
        transform: 'rotate(-42deg)'
      }

    }
  }



  return (
    <>
      <div className="root flex flex-col min-w-screen min-h-screen p-5 justify-center bg-gray-600 gap-5 items-center">
        <div className="heading flex justify-center text-4xl text-white font-bold underline">{status}</div>
        <div

          ref={boardRef}
          className="game grid rounded-lg grid-cols-3 grid-rows-3 bg-black flex-wrap p-2 place-items-center">
          <div
            onClick={() => handleClick(0)}
            className={`box relative flex justify-center items-center text-6xl sm:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(0)}></div>}<div className='flex h-full'>{board[0]}</div></div>
          <div
            onClick={() => handleClick(1)}
            className={`box relative flex justify-center items-center text-6xl md:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(1)}></div>}<div className='flex h-full'>{board[1]}</div></div>
          <div
            onClick={() => handleClick(2)}
            className={`box relative flex justify-center items-center text-6xl md:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(2)}></div>}<div className='flex h-full'>{board[2]}</div></div>
          <div
            onClick={() => handleClick(3)}
            className={`box relative flex justify-center items-center text-6xl md:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(3)}></div>}<div className='flex h-full'>{board[3]}</div></div>
          <div
            onClick={() => handleClick(4)}
            className={`box relative flex justify-center items-center text-6xl md:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(4)}></div>}<div className='flex h-full'>{board[4]}</div></div>
          <div
            onClick={() => handleClick(5)}
            className={`box relative flex justify-center items-center text-6xl md:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(5)}></div>}<div className='flex h-full'>{board[5]}</div></div>
          <div
            onClick={() => handleClick(6)}
            className={`box relative flex justify-center items-center text-6xl md:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(6)}></div>}<div className='flex h-full'>{board[6]}</div></div>
          <div
            onClick={() => handleClick(7)}
            className={`box relative flex justify-center items-center text-6xl md:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(7)}></div>}<div className='flex h-full'>{board[7]}</div></div>
          <div
            onClick={() => handleClick(8)}
            className={`box relative flex justify-center items-center text-6xl md:text-8xl font-medium cursor-pointer rounded-lg w-9/10 h-9/10 bg-white`}>{winLine && <div style={getLineStyle(8)}></div>}<div className='flex h-full'>{board[8]}</div></div>

        </div>
        <button
          onClick={handleNewGame}
          className='text-white font-medium cursor-pointer text-xl bg-blue-700 p-2 rounded-xl 
  border-1 border-transparent hover:border-white 
  transition-all duration-300 ease-in-out'>New Game</button>
      </div>
    </>
  )
}

export default App
