var Dispatcher      = require('../dispatcher/dispatcher');
var EventEmitter    = require('events').EventEmitter;
var assign          = require('object-assign');
var ActionTypes     = require('../constants/dapps_constants').ActionTypes;
var NewProductStore = require('./new_product');
var ServiceProduct  = require('../services/product');

var _products    = {};
var CHANGE_EVENT = 'change';

var ProductStore = (assign({}, EventEmitter.prototype, {
  all: function (force) {

    if (force) {
      ServiceProduct.all();
    }

    return _products;
  },
  set: function (product) {
    _products[product.product_id] = product;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeEvent: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
}));

ProductStore.dispatchToken = Dispatcher.register(function (action) {
  Dispatcher.waitFor([NewProductStore.dispatchToken]);

  switch(action.type) {
  case ActionTypes.PRODUCT_UPDATED:
    ProductStore.set(action.product);
    ProductStore.emitChange();
    break;
  case ActionTypes.PRODUCT_CREATED:
    ProductStore.set(action.product);
    ProductStore.emitChange();
    break;
  default:
  }
});

module.exports = ProductStore;
