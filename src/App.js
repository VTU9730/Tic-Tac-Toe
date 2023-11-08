import { useRef, useState } from "react";
import "./styles.css";
import win from './sounds/win.wav'
import click from './sounds/click.wav'

let state = [];
export default function App() {
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState(null);
  
  let box1 = useRef();
  let box2 = useRef();
  let box3 = useRef();
  let box4 = useRef();
  let box5 = useRef();
  let box6 = useRef();
  let box7 = useRef();
  let box8 = useRef();
  let box9 = useRef();
  let boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
  function handleReset() {
    boxes.map((box) => {
      box.current.innerText = "";
      box.current.style.backgroundColor = "white";
    });
    state = [];
    setWinner(null);
    const winElement = document.getElementById('winElement');
    winElement.pause();
  }
  function handleClick(e) {
    if (!winner && !e.target.innerText) {
      if (count % 2 == 0) {
        e.target.innerText = "X";
        e.target.style.backgroundColor = "yellow";
      } else {
        e.target.innerText = "O";
        e.target.style.backgroundColor = "blue";
      }
      let newState = e.target.innerText;
      state[e.target.value] = newState;
      console.log(state);
      setCount(count + 1);
      winCondition(state);
      const clcikElement = document.getElementById('clickElement');
      clcikElement.play();
    }
  }
  function winCondition(state) {
    if (state[0] == state[1] && state[1] == state[2]) {
      setWinner(state[0]);
    } else if (state[3] == state[4] && state[4] == state[5]) {
      setWinner(state[3]);
    } else if (state[6] == state[7] && state[7] == state[8]) {
      setWinner(state[6]);
    } else if (state[0] == state[4] && state[4] == state[8]) {
      setWinner(state[0]);
    } else if (state[2] == state[4] && state[4] == state[6]) {
      setWinner(state[2]);
    } else if (state[0] == state[3] && state[3] == state[6]) {
      setWinner(state[0]);
    } else if (state[1] == state[4] && state[4] == state[7]) {
      setWinner(state[1]);
    } else if (state[2] == state[5] && state[5] == state[8]) {
      setWinner(state[2]);
    }
  }
  if(winner){
    const winElement = document.getElementById('winElement');
    winElement.play();
  }
  return (
    <div id="main">
      <h1>Tic-Tac-Toe Game!</h1>
      <div id="first-row">
        <button onClick={(e) => handleClick(e)} value="0" ref={box1}></button>
        <button onClick={(e) => handleClick(e)} value="1" ref={box2}></button>
        <button onClick={(e) => handleClick(e)} value="2" ref={box3}></button>
      </div>
      <div id="second-row">
        <button onClick={(e) => handleClick(e)} value="3" ref={box4}></button>
        <button onClick={(e) => handleClick(e)} value="4" ref={box5}></button>
        <button onClick={(e) => handleClick(e)} value="5" ref={box6}></button>
      </div>
      <div id="third-row">
        <button onClick={(e) => handleClick(e)} value="6" ref={box7}></button>
        <button onClick={(e) => handleClick(e)} value="7" ref={box8}></button>
        <button onClick={(e) => handleClick(e)} value="8" ref={box9}></button>
      </div>
      <audio id="winElement"  preload="auto" autobuffer>
        <source src={win} type="audio/wav" />
      </audio>
      <audio id="clickElement"  preload="auto" autobuffer>
        <source src={click} type="audio/wav" />
      </audio>
      {winner && (
        <button id="reset" onClick={() => handleReset()}>
          Reset
        </button>
      )}
      {winner && <p style={{ color: "green" }}> Congratulations {winner}</p>}
    </div>
  );
}

