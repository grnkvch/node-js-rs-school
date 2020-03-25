/* eslint-disable no-process-exit */
const { Transform, pipeline } = require('stream');
const fs = require('fs');

const { program } = require('commander');

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

async function createStreams(input = '', output = '') {
  const rstream = await new Promise(resolve =>
    fs.access(input, err => {
      if (err) {
        console.log(
          '\x1b[36mStart typing text will be encoded string by string\ntype \x1b[31m:exit\x1b[36m to exit\x1b[0m'
        );
        process.stdin.setEncoding('utf8');
        process.stdin.on('readable', () => {
          let chunk;
          // eslint-disable-next-line no-cond-assign
          while ((chunk = process.stdin.read()) !== null) {
            if (chunk === ':exit\n') return;
          }
        });
        resolve(process.stdin);
      } else resolve(fs.createReadStream(input));
    })
  );

  const wstream = await new Promise(resolve =>
    fs.access(output, err => {
      if (err) {
        const transform = new Transform({
          writableObjectMode: true,
          transform(chunk, encoding, callback) {
            if (chunk.toString() === ':exit\n') return;
            callback(null, `\x1b[36m${chunk.toString()}\x1b[0m\n`);
          }
        });
        transform.pipe(process.stdout);

        resolve(transform);
      } else resolve(fs.createWriteStream(output));
    })
  );

  return { rstream, wstream };
}

program
  .option('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode')
  .parse(process.argv);

if (!program.shift || !program.action) {
  console.error(
    '\x1b[31m --shift <shift>,  --action <action> are required \x1b[0m'
  );
  process.exit(9);
}

if (program.action !== ENCODE && program.action !== DECODE) {
  console.error('\x1b[31m Invalid --action <action> value \x1b[0m');
  process.exit(9);
}

const { input, output } = program;
createStreams(input, output).then(({ rstream, wstream }) => {
  const shift = program.action === ENCODE ? +program.shift : -program.shift;

  const transform = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      const res = [...chunk.toString()]
        .map(char => encodeChar(char, shift))
        .join('');
      callback(null, res);
    }
  });

  pipeline(rstream, transform, wstream, err =>
    console.log(
      err ? '\x1b[31mSomething went wrong\x1b[0m' : '\x1b[32mComplited\x1b[0m'
    )
  );
});
