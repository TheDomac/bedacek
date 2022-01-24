import { useState, useEffect } from "react";
import { LOCAL_STORAGE_KEYS } from "./consts/localStorage";
import { WORDS } from "./consts/words";

import Cell from "./Cell"
import Button from "./Button"
import Backspace from "./Backspace";

const getUpdatedRow = (row, value) => {
  if (row.every(value => value !== null)) {
    return row;
  }


  const emptyPlaceIndex = row.findIndex(value => value === null);
  return [
    ...row.slice(0, emptyPlaceIndex),
    value,
    ...row.slice(emptyPlaceIndex + 1)
  ]
}

const getBackspacedRow = (row) => {
  if (row.every(value => value === null)) {
    return row
  };

  const clearedRow = row.filter(r => r);
  const rowWithoutLast = clearedRow.slice(0, clearedRow.length - 1);

  return [rowWithoutLast[0] || null, rowWithoutLast[1] || null, rowWithoutLast[2] || null, rowWithoutLast[3] || null, rowWithoutLast[4] || null]
}

const initialRows = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, null, null, null, null]
]

const getRandomWord = () => {
  const pastWords = localStorage.getItem(LOCAL_STORAGE_KEYS.pastWords);
  const pastWordsParsed = pastWords ? JSON.parse(pastWords) : [];
  const filteredWords = WORDS.filter(word => !pastWordsParsed.includes(word));
  const availableWords = filteredWords.length > 0 ? filteredWords : WORDS;

  if (filteredWords.length === 0) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.pastWords, JSON.stringify([]))
  }

  return availableWords[Math.floor(Math.random() * availableWords.length)]
}

const initialWord = getRandomWord()


const App = () => {
  const [word, setWord] = useState(initialWord)
  const [rows, setRows] = useState(initialRows)
  const [activeRow, setActiveRow] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false)

  useEffect( () => {
    const pastWords = localStorage.getItem(LOCAL_STORAGE_KEYS.pastWords);
    const pastWordsParsed = pastWords ? JSON.parse(pastWords) : [];
  
    const newPastWords = [...pastWordsParsed, word];
    localStorage.setItem(LOCAL_STORAGE_KEYS.pastWords, JSON.stringify(newPastWords))
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
