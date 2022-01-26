const Cell = ({ word, value, place, activeRowNumber, cellRowNumber, pastRows }) => {
  const indexesOfLetterInWord = [0,1,2,3,4].filter(i => word[i] === value);
  const guessedIndexes = indexesOfLetterInWord.filter(i => pastRows.find(row => row[i] === value))
  const allLettersGuessed = guessedIndexes.length === indexesOfLetterInWord.length

  let background = "#575759";
  if (word.includes(value) && word[place] === value && cellRowNumber < activeRowNumber) {
    background = "#538d4e";
  } else if (word.includes(value) && cellRowNumber < activeRowNumber && !allLettersGuessed) {
    background = "#b59f3b";
  } else if (cellRowNumber < activeRowNumber) {
    background = "#3a3a3c";
  }

  return (
    <div className="cell" style={{ background }}>
      <span>{value || ""}</span>
    </div>
  );
};

export default Cell;
