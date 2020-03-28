const { ENCODE, DECODE } = require('./constants');
const fs = require('fs').promises;

async function validateArguments({ shift, input, output, action }) {
  if (!shift || !action) {
    const error = new Error(
      '\x1b[31m --shift <shift>,  --action <action> are required \x1b[0m'
    );
    error.code = 9;
    throw error;
  }

  if (action !== ENCODE && action !== DECODE) {
    const error = new Error('\x1b[31mInvalid --action <action> value \x1b[0m');
    error.code = 9;
    throw error;
  }

  if (input) {
    try {
      // eslint-disable-next-line no-bitwise
      await fs.access(input);
    } catch (e) {
      const error = new Error(`\x1b[31mCheck input file ${input} \x1b[0m`);
      error.code = 9;
      throw error;
    }
  }

  if (output) {
    try {
      // eslint-disable-next-line no-bitwise
      await fs.access(output);
    } catch (e) {
      const error = new Error(`\x1b[31mCheck output file ${output} \x1b[0m`);
      error.code = 9;
      throw error;
    }
  }
}

module.exports = { validateArguments };
