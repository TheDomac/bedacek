import { WORDS } from "../consts/words";

const getRandomWord = () => {
    return WORDS[Math.floor(Math.random() * WORDS.length)]
  }

  export default getRandomWord;