const Cell = ({ word, value, place, activeRow, cellRow }) => {
  let background = "#575759";
  if (word.includes(value) && word[place] === value && cellRow < activeRow) {
    background = "#538d4e";
  } else if (word.includes(value) && cellRow < activeRow) {
    background = "#b59f3b";
  } else if (cellRow < activeRow) {
    background = "#3a3a3c";
  }

  return (
    <div className="cell" style={{ background }}>
      <span>{value || ""}</span>
    </div>
  );
};

export default Cell;
