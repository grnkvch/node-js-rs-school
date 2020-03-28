const fs = require('fs');
const { Transform } = require('stream');
const { encodeChar } = require('./encodeChar');
const { EXIT_COMMAND } = require('./constants');

async function createStreams(input, output, shift) {
  let rstream;
  if (input) {
    rstream = fs.createReadStream(input, { encoding: 'utf8' });
  } else {
    console.log(
      `\x1b[36mStart typing text will be encoded string by string
type \x1b[31m${EXIT_COMMAND}\x1b[36m to exit\x1b[0m`
    );
    if (output) {
      console.log(`\x1b[36mResults are saving into ${output}\x1b[0m`);
    }
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', () => {
      let chunk;
      // eslint-disable-next-line no-cond-assign
      while ((chunk = process.stdin.read()) !== null) {
        if (chunk === `${EXIT_COMMAND}\n`) return;
      }
    });
    rstream = process.stdin;
  }

  let wstream;
  if (output) {
    wstream = fs.createWriteStream(output, { flags: 'a', encoding: 'utf8' });
    await new Promise(resolve => wstream.write('\n', resolve()));
  } else {
    const transform = new Transform({
      writableObjectMode: true,
      transform(chunk, encoding, callback) {
        callback(null, `\x1b[36m${chunk}\x1b[0m\n`);
      }
    });
    transform.pipe(process.stdout);
    wstream = transform;
  }

  const transform = new Transform({
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      if (chunk === `${EXIT_COMMAND}\n`) {
        console.log('\x1b[32mComplited\n\x1b[0m');
        return callback();
      }
      const res = [...chunk].map(char => encodeChar(char, shift)).join('');
      callback(null, res);
    }
  });

  return { rstream, wstream, transform };
}

module.exports = { createStreams };
