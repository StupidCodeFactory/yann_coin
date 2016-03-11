var web3               = require('./web3');
var CurrentAccount     = require('../stores/current_account');
var AdminActionCreator = require('../actions/admin_action_creator');
var Pudding            = require('ether-pudding');
Pudding.setWeb3(web3);
Admin.load(Pudding);

var AdminService = function (AdminContract) {
  function WatchForAdminReceived(accountId) {
    var event = AdminContract.WatchForAdminReceived({account_id: accountId}, {toBlock: 'latest'});
    event.watch(function (error, result) {
      if (error) {
        throw error;
      }

      AdminActionCreator.updated(result.args.account, result.args.admin);
      event.stopWatching();
    });

  }
  function WatchForAdminChanged(accountId) {
    var event = AdminContract.OnAdminChanged({account_id: accountId}, {toBlock: 'latest'});
    event.watch(function (error, result) {
      if (error) {
        throw error;
      }
      console.log('WatchForAdminChanged');
      AdminActionCreator.updated(result.args.account, result.args.admin);
      event.stopWatching();
    });
  }

  return {
    get: function (account) {
      AdminContract.get(account, {from: CurrentAccount.get()}).then(function () {
        WatchForAdminReceived(account);
      }).catch(function (error) {
        throw error;
      });
    },
    set: function (account, admin) {
      AdminContract.set(account, admin, {from: CurrentAccount.get(), gas: 500000}).then(function () {
        WatchForAdminChanged(account);
      }).catch(function (error) {
        throw error;
      });
    }
  };
};

module.exports = new AdminService(Admin.deployed());
