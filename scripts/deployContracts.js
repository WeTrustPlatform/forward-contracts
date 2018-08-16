const Factory = artifacts.require("PassiveForwarderFactory");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

//
// export COINBASE="0x..."
// export DATA_FILE="data.example"
// unlock coinbase account in the local geth client
// geth --rinkeby --rpc --unlock "0x..."
// cd scripts
// truffle exec deployContracts.js --network rinkeby
//
const main = async () => {
  const coinbase = process.env.COINBASE;
  const dataFile = process.env.DATA_FILE;
  assert.ok(coinbase, "process.env.COINBASE not found");
  assert.ok(dataFile, "process.env.DATA_FILE not found");

  console.log(`Coinbase: ${coinbase}`);

  const factoryAddress = process.env.FACTORY_ADDRESS;
  let factoryInstance;
  if(!factoryAddress) {
    factoryInstance = await Factory.new(coinbase, {from: coinbase});
  } else {
    factoryInstance = Factory.at(factoryAddress);
  }

  console.log(`Factory address: ${factoryInstance.address}`);

  const dataFilePath = path.resolve(__dirname, dataFile);
  console.log(`dataFilePath: ${dataFilePath}`);

  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  const recipients = Object.keys(data);

  for(let r of recipients) {
    const numberOfContracts = parseInt(data[r], 10);
    for(let i = 0; i < numberOfContracts; i++) {
      const newContract = await factoryInstance.create.call(r, {from: coinbase});
      const tx = await factoryInstance.create(r, {from: coinbase});
      console.log(`Recipient: ${r} - Contract: ${newContract}`)
    }
  }
}

module.exports = (callback) => {
  return Promise.resolve()
    .then(async () => {
      await main();
    })
    .then(() => callback())
    .catch(console.log);
}
