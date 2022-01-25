
const Button = ({ letter, onClick, title, handleLetterClick, pastRows, word }) => {
    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            handleLetterClick(letter)
        }
    }

    let background = "#575759"

    const letterIsUsed = pastRows?.find(row => row.find(value => value === letter))

    const letterIsUsedInWord = letterIsUsed && word.includes(letter);

    

    let letterIsUsedInWordInCorrectPlace = false;
    if (letterIsUsedInWord) {
        pastRows.forEach(row => {
            row.forEach((value, i) =>  {
                if (value === letter && word[i] === letter) {
                    letterIsUsedInWordInCorrectPlace = true;
                }
            })
        })
    }


    if (letterIsUsedInWordInCorrectPlace) {
        background = "#538d4e"
    } else if (letterIsUsedInWord) {
        background = "#b59f3b"
    } else if (letterIsUsed) {
        background = "#3a3a3c"
    }

    let style = {
        background,
        ...(title ? { width: "auto", padding: "0 10px"} : {})
    };

  return (
  <div className="button" style={style} onClick={handleClick}>
    <div>{title || letter}</div>
    </div>
  );
}
 
export default Button;
