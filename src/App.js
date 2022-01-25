import { useState } from "react";

import Cell from "./Cell"
import Button from "./Button"
import Backspace from "./Backspace";

import getRandomWord from "./services/getRandomWord";
import getUpdatedRow from "./services/getUpdatedRow";
import getBackspacedRow from "./services/getBackspacedRow";

const initialRows = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null]
]

const initialWord = getRandomWord()

const App = () => {
  const [word, setWord] = useState(initialWord)
  const [rows, setRows] = useState(initialRows)
  const [activeRow, setActiveRow] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false)

  const handleEnterClick = () => {
    if (rows[activeRow] && rows[activeRow].every(value => value !== null)) {
      
      if (rows[activeRow].every((value, i) => value === word[i])) {
        setIsGameOver(true)
        setIsVictory(true);
      }

      if (activeRow === rows.length - 1) {
        setIsGameOver(true);
      } 

      setActiveRow(activeRow + 1)
    }

  }

  const handleBackspaceClick = () => {
    if (isGameOver) { return; }

    const newRows = rows.map((row, i) => i === activeRow ?  getBackspacedRow(row) : row)
    setRows(newRows)

  }

  const handleLetterClick = (letter) => {
    const newRows = rows.map((row, i) => i === activeRow ?  getUpdatedRow(row, letter) : row)
    setRows(newRows)
  }

  const handlePlayAgainClick = () => {
    setActiveRow(0);
    setRows(initialRows)
    const randomWord = getRandomWord();
    setWord(randomWord)
    setIsGameOver(false)
    setIsVictory(false);
  }

  const pastRows = rows.filter((row, i) => i < activeRow);

  return (
    <>
  <div className="container">
      {
      rows.map((row, rowIdx) => <div className="row" key={rowIdx}> {row.map((value, i) =>
      <Cell
        key={i}
        value={value}
        word={word}
        place={i}
        activeRow={activeRow}
        cellRow={rowIdx}
      />)}
      </div>
      )}
    </div>
    <div className="bottomFixed">
      {
        isGameOver ? (
          <div>{!isVictory && (
            <div style={{ textTransform: "uppercase" }}>{word.join("")}</div>
          )}
          <button onClick={handlePlayAgainClick}>Igraj ponovo</button></div>
        ) : (
          <>
          <div className="row">
      {["e", "r", "t", "z", "u", "i", "o", "p", "š", "đ", "dž"].map(letter => <Button key={letter} pastRows={pastRows} word={word} letter={letter} handleLetterClick={handleLetterClick} />)}
      </div>
      <div className="row">
      {["a","s", "d", "f", "g", "h", "j", "k", "l", "č", "ć", "ž"].map(letter => <Button key={letter} pastRows={pastRows} word={word} letter={letter} handleLetterClick={handleLetterClick} />)}
      </div>
      <div className="row">
        <Button title="enter" onClick={handleEnterClick} />
      {["c","v", "b", "n", "m", "lj", "nj"].map(letter => <Button key={letter} letter={letter} pastRows={pastRows} word={word} handleLetterClick={handleLetterClick} />)}
        <Button title={<Backspace />} onClick={handleBackspaceClick} />
      </div>
          </>
        )
      }
      
    </div>
    </>
  );
}
 
export default App;
