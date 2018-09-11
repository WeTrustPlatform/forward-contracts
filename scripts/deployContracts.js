const Factory = artifacts.require('PassiveForwarderFactory');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const readline = require('readline');

const askConfirmation = async () => new Promise((resolve, reject) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('Do you want to proceed? [y/N]: ', (answer) => {
    if (answer === 'Y' || answer === 'y') {
      resolve();
    } else {
      reject();
      process.exit(1);
    }
  });
});

// This script helps deploy the Forwader contracts in bulk
// For each recipients, the number of contracts to be deployed are specified in data.example
// If there is already a Factory, specify in the env so that it does not create a new one
//
// export COINBASE="0x..."
// export DATA_FILE="data.example"
// (optional) export FACTORY_ADDRESS="0x..."
//
//
// unlock coinbase account in the local geth client
// geth --rinkeby --syncmode light --rpc --unlock "0x..."
// let it synced
// cd scripts
// truffle compile // run this once to build contracts
// truffle exec deployContracts.js --network rinkeby
//
const main = async () => {
  const coinbase = process.env.COINBASE;
  const dataFile = process.env.DATA_FILE;
  assert.ok(coinbase, 'process.env.COINBASE not found');
  assert.ok(dataFile, 'process.env.DATA_FILE not found');

  console.log(`Coinbase: ${coinbase}`);

  const dataFilePath = path.resolve(__dirname, dataFile);
  console.log(`dataFilePath: ${dataFilePath}`);

  const factoryAddress = process.env.FACTORY_ADDRESS;
  console.log(`Factory address: ${factoryAddress || 'Will deploy a new factory.'}`);

  await askConfirmation();

  let factoryInstance;
  if (!factoryAddress) {
    factoryInstance = await Factory.new(coinbase, { from: coinbase });
    console.log(`Created new factory: ${factoryInstance.address}`);
  } else {
    factoryInstance = Factory.at(factoryAddress);
  }

  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  const recipients = Object.keys(data);

  const veryBeginning = Date.now();
  for (const r of recipients) {
    const numberOfContracts = parseInt(data[r], 10);
    for (let i = 0; i < numberOfContracts; i += 1) {
      const start = Date.now();
      const newContract = await factoryInstance.create.call(r, { from: coinbase });
      await factoryInstance.create(r, { from: coinbase });
      const timeSpent = Date.now() - start;
      console.log(`${i + 1}/${numberOfContracts}, ${r}, ${newContract}, ${timeSpent} ms`);
    }
  }

  console.log(`Done! Total time spent ${Math.ceil((Date.now() - veryBeginning) / 1000 / 60)} minutes`);
};

module.exports = callback => Promise.resolve()
  .then(async () => {
    await main();
  })
  .then(() => callback())
  .catch(console.log);
