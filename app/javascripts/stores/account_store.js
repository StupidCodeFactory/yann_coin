var Dispatcher     =  require('../dispatcher/dispatcher');
var EventEmitter   = require('events').EventEmitter;
var assign         = require('object-assign');
var BalanceStore = require('../stores/balance_store');
var Promise        = require('bluebird');
var DappsConstants = require('../constants/dapps_constants');

var ActionTypes    = DappsConstants.ActionTypes;

var _accounts    = {};

var CHANGE_EVENT   = 'change';

var AccountStore = (assign({}, EventEmitter.prototype, {
  init: function (rawAccounts) {
    rawAccounts.forEach(function (account) {
      _accounts[account] = { id: account, balance: 'n/a' };
    });
  },

  getAll: function () {
    return _accounts;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeEvent: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
}));


AccountStore.dispatchToken = Dispatcher.register(function (action) {
  switch(action.type) {
  case ActionTypes.RECEIVE_RAW_ACCOUNT:
    AccountStore.init(action.rawAccounts);
    AccountStore.emitChange();
    break;
  default:
  }
});

module.exports = AccountStore;
