var Dispatcher     = require('../dispatcher/dispatcher');
var ActionTypes    = require('../constants/dapps_constants').ActionTypes;

module.exports = {
  get: function (account) {
    Dispatcher.dispatch({
      type: ActionTypes.GET_BALANCE,
      account: account
    });
  }
};
