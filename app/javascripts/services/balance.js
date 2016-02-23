var BalanceActionCreator = require('../actions/balance_action_creator');
var Promise = require('bluebird');
var Pudding = require('ether-pudding');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(WEB3_PROVIDER_LOCATION));
Pudding.setWeb3(web3);
MetaCoin.load(Pudding);
var Meta = MetaCoin.deployed();

module.exports = {
  getBalances: function (accounts) {
    Promise.reduce(
      accounts,
      function (acc, account) {
        return Meta.getBalance.call(account, {from: account})
          .then(function (value) {
            acc[account] = value.valueOf();
            return acc;
          }).catch(function (error) {
            throw error;
          });
      }, {}).then(function (balances) {
        BalanceActionCreator.receiveBalances(balances);
      });
  }
};
