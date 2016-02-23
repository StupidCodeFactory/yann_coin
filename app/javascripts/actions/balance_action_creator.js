var Dispatcher     = require('../dispatcher/dispatcher');
var DappsConstants = require('../constants/dapps_constants');
var ActionTypes    = DappsConstants.ActionTypes;

module.exports = {
  mintCoin: function (mint) {
    Dispatcher.dispatch({
      type:     ActionTypes.MINT_COIN,
      receiver: mint.receiver,
      amount:   mint.amount
    });
  },
  balanceUpdated: function (account, amount) {
    Dispatcher.dispatch({
      type: ActionTypes.BALANCE_UPDATED,
      account: account,
      amount: amount
    });
  },
  transferAmount: function (transfer) {
    Dispatcher.dispatch({
      type: ActionTypes.CREATE_TRANSFER,
      transfer: transfer
    });
  },
  receiveBalances: function (balances) {
    Dispatcher.dispatch({
      type:    ActionTypes.RAW_BALANCES_RECEIVED,
      balances: balances
    });
  },
};
