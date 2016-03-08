var BalanceActionCreator = require('../actions/balance_action_creator');

var web3 = require('./web3');

Pudding.setWeb3(web3);
MetaCoin.load(Pudding);
var Meta = MetaCoin.deployed();



var MetaCoin = function (meta) {
  this.meta = meta;

  function WatchForResult() {
    var event = meta.OnCoinSent({});
    event.watch(function (error, result) {

      if (error) {
        console.log(error);
      } else {

        BalanceActionCreator.balanceUpdated(
          result.args.sender,
          result.args.newBalance.toString(10)
        );

      }
      event.stopWatching();
    });
  }

  function WatchForAmountReceived(account) {
    var event = meta.OnCoinReceived({receiver: account});
    event.watch(function (error, result) {
      if (error) {
        console.log(error);
      } else {
        BalanceActionCreator.balanceUpdated(
          result.args.receiver,
          result.args.newBalance.toString(10)
        );

      }
      event.stopWatching();
    });
  }

  return {
    transfer: function (from, to, amount) {

      Meta.sendCoin(to, amount, {from: from, gas: 100000}).then(function(e) {
        console.log(e);
        WatchForResult();
        WatchForAmountReceived(to);

      }).catch(function(error) {
        throw error;
      });

    },
    mint: function (to, amount) {
      var args = {from: web3.eth.accounts[0], gas: 100000};
      Meta.mint(to, amount, args).then(function (e) {
        console.log('mint');
        console.log(e);
        WatchForAmountReceived(to);
      }).catch(function (error) {
        throw error;
      });
    }
  };
};

module.exports = new MetaCoin(Meta);
