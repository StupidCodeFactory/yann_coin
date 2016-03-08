var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(WEB3_PROVIDER_LOCATION));

module.exports = web3;
