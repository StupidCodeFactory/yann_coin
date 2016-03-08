var Dispatcher    =  require('../dispatcher/dispatcher');
var EventEmitter  = require('events').EventEmitter;
var assign        = require('object-assign');
var AccountStore  = require('./account_store');
var ActionTypes   = require('../constants/dapps_constants').ActionTypes;

var _account      = null;
var CHANGE_EVENT  = 'change';

var CurrentAccount = (assign({}, EventEmitter.prototype, {
  get: function () {
    return _account;
  },
  set: function (account) {
    console.log("setting current account: " + account);
    _account = account;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeEvent: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
}));

CurrentAccount.dispatchToken = Dispatcher.register(function (action) {
  Dispatcher.waitFor([AccountStore.dispatchToken]);

  switch(action.type) {
  case ActionTypes.CURRENT_ACCOUNT_SELECTED:
    CurrentAccount.set(action.account);
    CurrentAccount.emitChange();
    break;
  default:
  }
});

module.exports = CurrentAccount;
