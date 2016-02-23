var AccountsActionCreator = require('../actions/accounts_action_creator');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(WEB3_PROVIDER_LOCATION));

module.exports = {
  getAccounts: function () {
     web3.eth.getAccounts(function(err, accounts) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accounts.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      AccountsActionCreator.receiveAll(accounts);
    });
  }
};
