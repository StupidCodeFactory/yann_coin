var Dispatcher           =  require('../dispatcher/dispatcher');
var EventEmitter         = require('events').EventEmitter;
var assign               = require('object-assign');
var Promise              = require('bluebird');
var DappsConstants       = require('../constants/dapps_constants');
var AccountStore         = require('../stores/account_store');
var BalanceActionCreator = require('../actions/balance_action_creator');
var MetaCoin             = require('../services/meta_coin');
var ServiceBalance       = require('../services/balance');


var ActionTypes    = DappsConstants.ActionTypes;

var _balances = {};

var CHANGE_EVENT   = 'change';

var BalanceStore = assign({}, EventEmitter.prototype, {
  init: function (balances) {
    _balances = balances;
  },
  get: function (id) {
    return _balances[id];
  },
  set: function (id, balance) {
    _balances[id] = balance;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeEvent: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
});


BalanceStore.dispatchToken = Dispatcher.register(function (action) {

  switch(action.type) {
  case ActionTypes.RAW_BALANCES_RECEIVED:
    BalanceStore.init(action.balances);
    BalanceStore.emitChange();
    break;
  case ActionTypes.CREATE_TRANSFER:
    console.log(ActionTypes.TRANSFER_AMOUNT);
    MetaCoin.transfer(
      action.transfer.from,
      action.transfer.to,
      action.transfer.amount
    );
    ServiceBalance.getBalances([action.transfer.from, action.transfer.to]);
    break;
  case ActionTypes.MINT_COIN:
    MetaCoin.mint(action.receiver, action.amount);
    break;
  case ActionTypes.BALANCE_UPDATED:
    BalanceStore.set(action.account, action.amount);
    BalanceStore.emitChange();
    break;
  default:
  }

});

module.exports = BalanceStore;
