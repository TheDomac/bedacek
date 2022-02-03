import { useState } from "react";

import Cell from "./Cell";
import Button from "./Button";
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
  [null, null, null, null, null],
];

const initialWord = getRandomWord();

const localNumberOfVictories = localStorage.getItem("numberOfVictories");
const parsedNumberOfVictories = localNumberOfVictories ? Number(localNumberOfVictories) : 0;

const App = () => {
  const [word, setWord] = useState(initialWord);
  const [rows, setRows] = useState(initialRows);
  const [activeRowNumber, setActiveRowNumber] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isVictory, setIsVictory] = useState(false);
  const [numberOfVictories, setNumberOfVictories] = useState(parsedNumberOfVictories)

  const handleEnterClick = () => {
    const allLettersFilled = rows[activeRowNumber] && rows[activeRowNumber].every((value) => value !== null)
    if (!allLettersFilled) {
      return;
    }

    if (rows[activeRowNumber].every((value, i) => value === word[i])) {
      setIsGameOver(true);
      setIsVictory(true);
    
      const newNumberOfVictories = numberOfVictories + 1;
      setNumberOfVictories(newNumberOfVictories);
      localStorage.setItem("numberOfVictories", newNumberOfVictories)
    }

    if (activeRowNumber === rows.length - 1) {
      setIsGameOver(true);
    }

    setActiveRowNumber(activeRowNumber + 1);
  };

  const handleBackspaceClick = () => {
    if (isGameOver) {
      return;
    }

    const newRows = rows.map((row, i) =>
      i === activeRowNumber ? getBackspacedRow(row) : row
    );
    setRows(newRows);
  };

  const handleLetterClick = (letter) => {
    const newRows = rows.map((row, i) =>
      i === activeRowNumber ? getUpdatedRow(row, letter) : row
    );
    setRows(newRows);
  };

  const handlePlayAgainClick = () => {
    setActiveRowNumber(0);
    setRows(initialRows);
    const randomWord = getRandomWord();
    setWord(randomWord);
    setIsGameOver(false);
    setIsVictory(false);
  };

  const pastRows = rows.filter((row, i) => i < activeRowNumber);

  return (
    <>
      <div className="container">
        {rows.map((row, rowIdx) => (
          <div className="row" key={rowIdx}>
            {row.map((value, i) => (
              <Cell
                key={i}
                value={value}
                word={word}
                place={i}
                activeRowNumber={activeRowNumber}
                cellRowNumber={rowIdx}
                pastRows={rows.filter((row, i) => i <= rowIdx)}
                />
            ))}
          </div>
        ))}
      </div>
      <div className="bottomFixed">
        {isGameOver ? (
          <div>
            {!isVictory && (
              <div style={{ textTransform: "uppercase" }}>{word.join("")}</div>
            )}
            <button onClick={handlePlayAgainClick}>Igraj ponovo</button>
            <div>Broj pobjeda: {numberOfVictories}</div>
          </div>
        ) : (
          <>
            <div className="row">
              {["e", "r", "t", "z", "u", "i", "o", "p", "š", "đ", "dž"].map(
                (letter) => (
                  <Button
                    key={letter}
                    pastRows={pastRows}
                    word={word}
                    letter={letter}
                    handleLetterClick={handleLetterClick}
                  />
                )
              )}
            </div>
            <div className="row">
              {["a", "s", "d", "f", "g", "h", "j", "k", "l", "č", "ć", "ž"].map(
                (letter) => (
                  <Button
                    key={letter}
                    pastRows={pastRows}
                    word={word}
                    letter={letter}
                    handleLetterClick={handleLetterClick}
                  />
                )
              )}
            </div>
            <div className="row">
              <Button title="enter" onClick={handleEnterClick} />
              {["c", "v", "b", "n", "m", "lj", "nj"].map((letter) => (
                <Button
                  key={letter}
                  letter={letter}
                  pastRows={pastRows}
                  word={word}
                  handleLetterClick={handleLetterClick}
                />
              ))}
              <Button title={<Backspace />} onClick={handleBackspaceClick} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
