const { RUS_ALPHABET, LAT_ALPHABET } = require('./constants');

function encodeChar(char, offset) {
  const charCode = char.charCodeAt(0);
  const processChar = (aplhabetStartCharCode, aplhabetLenght) => {
    return String.fromCharCode(
      ((charCode - aplhabetStartCharCode + (offset + aplhabetLenght)) %
        aplhabetLenght) +
        aplhabetStartCharCode
    );
  };
  switch (true) {
    case LAT_ALPHABET.lower[0] <= charCode && charCode <= LAT_ALPHABET.lower[1]:
      return processChar(LAT_ALPHABET.lower[0], LAT_ALPHABET.lenght);

    case LAT_ALPHABET.upper[0] <= charCode && charCode <= LAT_ALPHABET.upper[1]:
      return processChar(LAT_ALPHABET.upper[0], LAT_ALPHABET.lenght);

    case RUS_ALPHABET.lower[0] <= charCode && charCode <= RUS_ALPHABET.lower[1]:
      return processChar(RUS_ALPHABET.lower[0], RUS_ALPHABET.lenght);

    case RUS_ALPHABET.upper[0] <= charCode && charCode <= RUS_ALPHABET.upper[1]:
      return processChar(RUS_ALPHABET.upper[0], RUS_ALPHABET.lenght);

    default:
      return char;
  }
}

module.exports = { encodeChar };
