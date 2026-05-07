const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const { generateJavaClass } = require('./generateJavaClass');

async function run() {
  const rl = readline.createInterface({ input, output });

  try {
    const className = (await rl.question('Enter class name: ')).trim();
    const attributeCount = Number.parseInt(
      await rl.question('How many attributes? '),
      10,
    );
    if (Number.isNaN(attributeCount) || attributeCount < 0) {
      throw new Error('Attribute count must be a non-negative integer.');
    }

    const attributes = [];

    for (let attributeIndex = 0; attributeIndex < attributeCount; attributeIndex += 1) {
      const name = (await rl.question(`Attribute ${attributeIndex + 1} name: `)).trim();
      const type = (await rl.question(`Attribute ${attributeIndex + 1} type: `)).trim();
      attributes.push({ name, type });
    }

    const javaCode = generateJavaClass(className, attributes);
    const outputPath = path.resolve(process.cwd(), `${className}.java`);

    fs.writeFileSync(outputPath, javaCode, 'utf8');
    output.write(`Java file created: ${outputPath}\n`);
  } catch (error) {
    output.write(`${error.message}\n`);
    process.exitCode = 1;
  } finally {
    rl.close();
  }
}

run();
