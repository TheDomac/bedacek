const Button = ({
  letter,
  onClick,
  title,
  handleLetterClick,
  pastRows,
  word,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      handleLetterClick(letter);
    }
  };

  let className = "button";

  const letterIsUsed = pastRows?.find((row) =>
    row.find((value) => value === letter)
  );

  const letterIsUsedInWord = letterIsUsed && word.includes(letter);

  let letterIsUsedInWordInCorrectPlace = false;
  if (letterIsUsedInWord) {
    pastRows.forEach((row) => {
      row.forEach((value, i) => {
        if (value === letter && word[i] === letter) {
          letterIsUsedInWordInCorrectPlace = true;
        }
      });
    });
  }

  if (letterIsUsedInWordInCorrectPlace) {
    className += " guessed";
  } else if (letterIsUsedInWord) {
    className += " usedInWord";
  } else if (letterIsUsed) {
    className += " used";
  }

  let style = {
    ...(title ? { width: "auto", padding: "0 10px" } : {}),
  };

  return (
    <div className={className} style={style} onClick={handleClick}>
      <div>{title || letter}</div>
    </div>
  );
};

export default Button;
