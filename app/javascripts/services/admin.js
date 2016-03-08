var Dispatcher   =  require('../dispatcher/dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var ActionTypes  = require('../constants/dapps_constants').ActionTypes;
var AccountStore = require('../stores/account_store');
var AdminService = require('../services/admin');
var _admins      = {};
var CHANGE_EVENT = 'change';

var _admins = {};
var AdminStore = assign({}, EventEmitter.prototype, {
  get: function (account) {
    return _admins[account];
  },
  set: function (account, value) {
    _admins[account] = value;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeEvent: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AdminStore.dispatchToken = Dispatcher.register(function (action) {
  switch(action.type) {
  case ActionTypes.ADMIN_RECEIVED:
    AdminStore.set(action.account, action.admin);
    AdminStore.emitChange();
    break;
  default:

  }
});
