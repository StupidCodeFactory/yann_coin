var Dispatcher     = require('../dispatcher/dispatcher');
var DappsConstants = require('../constants/dapps_constants');
var ServiceBalance = require('../services/balance');

var ActionTypes = DappsConstants.ActionTypes;

module.exports = {
  receiveAll: function (rawAccounts) {
    ServiceBalance.getBalances(rawAccounts);
    Dispatcher.dispatch({
      type:        ActionTypes.RECEIVE_RAW_ACCOUNT,
      rawAccounts: rawAccounts
    });
  }
};
