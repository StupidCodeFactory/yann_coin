var Dispatcher     = require('../dispatcher/dispatcher');
var ActionTypes    = require('../constants/dapps_constants').ActionTypes;

module.exports = {
  updated: function (account, value) {
    Dispatcher.dispatch({
      type:    ActionTypes.ADMIN_RECEIVED,
      account: account,
      admin:   value
    });
  },
  set: function (account, value) {
    Dispatcher.dispatch({
      type:    ActionTypes.SET_ADMIN,
      account: account,
      admin:   value
    });
  }
};
