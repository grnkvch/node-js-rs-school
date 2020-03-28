const { pipeline } = require('stream');

const { program } = require('commander');

const { ENCODE } = require('./constants');
const { createStreams } = require('./createStreams');
const { validateArguments } = require('./validateArguments');

program
  .option('-s, --shift <shift>', 'a shift')
  .option('-i, --input <input>', 'an input file')
  .option('-o, --output <output>', 'an output file')
  .option('-a, --action <action>', 'an action encode/decode')
  .parse(process.argv);

async function my_caesar_cli() {
  try {
    await validateArguments(program);
  } catch (error) {
    console.error(error.message);
    // eslint-disable-next-line no-process-exit
    process.exit(error.code);
  }
  const { input, output } = program;
  const shift = program.action === ENCODE ? +program.shift : -program.shift;

  const { rstream, wstream, transform } = await createStreams(
    input,
    output,
    shift
  );

  pipeline(rstream, transform, wstream, err => {
    console.error(
      err ? '\x1b[31mSomething went wrong\x1b[0m' : '\x1b[32mComplited\x1b[0m'
    );
    output && wstream.write('\n');
  });
}

my_caesar_cli();
