const glob = require('glob');
const path = require('path');
const fs = require('fs');

// As we don't want to expose the local build folder
// the script filters 'public' fields of the built contracts
const contractsFiles = glob.sync(path.resolve(__dirname, './build/contracts/*.json'));

const contracts = {};

contractsFiles.forEach((f) => {
  const fileName = path.basename(f);
  const key = fileName.split('.')[0];
  const {
    abi, bytecode, sourceMap, source, compiler, schemaVersion,
  } = require(f);
  contracts[key] = {
    abi, bytecode, sourceMap, source, compiler, schemaVersion,
  };
});


fs.writeFileSync('./.exported.js', `module.exports = ${JSON.stringify(contracts)};`, 'utf-8');
