var Dispatcher  = require('../dispatcher/dispatcher');
var ActionTypes = require('../constants/dapps_constants').ActionTypes;

module.exports = {
  select: function (account) {
    console.log(account);
    Dispatcher.dispatch({
      type: ActionTypes.CURRENT_ACCOUNT_SELECTED,
      account: account
    });
  }
};
