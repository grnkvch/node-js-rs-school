const RUS_ALPHABET = {
  upper: [1040, 1071],
  lower: [1072, 1103],
  lenght: 32
};

const LAT_ALPHABET = {
  upper: [65, 90],
  lower: [97, 122],
  lenght: 26
};

const ENCODE = 'encode';
const DECODE = 'decode';

const EXIT_COMMAND = ':exit';

module.exports = {
  RUS_ALPHABET,
  LAT_ALPHABET,
  ENCODE,
  DECODE,
  EXIT_COMMAND
};
