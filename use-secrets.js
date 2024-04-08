const fs = require('fs');
const path = require('path');

// Get command-line arguments
const args = process.argv.slice(2); // skipping 'node' and script path
if (args.length < 4) {
  console.log('Usage: node script.js <inputFile> <outputFile> <varName1> <varName2> ...');
  process.exit(1);
}

const inputFilePath = path.join(__dirname, args[0]);
const outputFilePath = path.join(__dirname, args[1]);
const varNames = args.slice(2); // All the remaining arguments are assumed to be variable names

// Read the contents of the input file
fs.readFile(inputFilePath, 'utf8', function (err, data) {
  if (err) {
    return console.error('Error reading file:', err);
  }

  // Replace variable placeholders with the corresponding environment variable values
  let result = data;
  varNames.forEach(varName => {
    const envVarValue = process.env[varName];
    if (envVarValue === undefined) {
      console.warn(`Warning: Environment variable "${varName}" is not set.`);
    } else {
      const varPlaceholder = new RegExp(`\\$${varName}`, 'g');
      result = result.replace(varPlaceholder, envVarValue);
    }
  });

  // Write the new content to the output file
  fs.writeFile(outputFilePath, result, 'utf8', function (err) {
    if (err) return console.error('Error writing file:', err);
    console.log(`File has been saved with substituted variables to "${outputFilePath}".`);
  });
});