const words = [
  "papar",
  "šećer",
  "vlast",
  "labud",
  "golub",
  "knjiga",
  "motor",
  "rotor",
  "jahta",
  "tegla",
  "torba",
  "smeće",
  "smrad",
  "punjač",
  "ljubav",
  "ljutnja",
  "ormar",
  "metar",
  "ekran",
  "žabac",
  "jelen",
  "mačka",
  "hrčak",
  "krema",
  "klima",
  "zubar",
  "rudar",
  "kafić",
  "sjena",
  "sjeta",
  "govor",
  "ponor",
  "lokva",
  "breza",
  "hrast",
  "javor",
  "kupus",
  "češer",
  "reper",
  "vitlo",
  "šipka",
  "kifla",
  "porez",
  "nafta",
  "fenjer",
  "maska",
  "glava",
  "nokat",
  "šnita",
  "mrkva",
  "bukva",
  "berba",
  "poker",
  "islam",
  "anđeo",
  "fućka",
  "ploča",
  "sarma",
  "prase",
  "majka",
  "greda",
  "jesen",
  "tepih",
  "točka",
  "sport",
  "umnjak",
  "njuška",
];

const fixTwoCharacterLetters = (array, firstLetter, secondLetter) => {
  const index = array.findIndex(
    (letter, i) => letter === firstLetter && array[i + 1] === secondLetter
  );

  if (index === -1) {
    return array;
  }

  return [
    ...array.slice(0, index),
    `${firstLetter}${secondLetter}`,
    ...array.slice(index + 2),
  ];
};

export const WORDS = words.reduce((prev, word) => {
  const asArray = word.split("");
  if (word.length === 5) {
    return prev.concat([asArray]);
  }

  const fixedForNj = fixTwoCharacterLetters(asArray, "n", "j");
  const fixedForLj = fixTwoCharacterLetters(fixedForNj, "l", "j");
  const fixedForDz = fixTwoCharacterLetters(fixedForLj, "d", "ž");

  return prev.concat([fixedForDz]);
}, []);
