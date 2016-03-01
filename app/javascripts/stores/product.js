var Dispatcher     = require('../dispatcher/dispatcher');
var EventEmitter   = require('events').EventEmitter;
var assign         = require('object-assign');
var ActionTypes    = require('../constants/dapps_constants').ActionTypes;

var ServiceProduct = require('../services/product');

var _products    = {};
var CHANGE_EVENT = 'change';

var ProductStore = (assign({}, EventEmitter.prototype, {
  all: function (force) {
    console.log(force);
    if (force) {
      ServiceProduct.all();
    }
    console.log(_products);
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
  switch(action.type) {
  case ActionTypes.CREATE_PRODUCT:
    console.log('ActionTypes.CREATE_PRODUCT');
    ServiceProduct.create(action.product);
    break;
  case ActionTypes.PRODUCT_CREATED:
    ProductStore.set(action.product);
    console.log('ActionTypes.PRODUCT_CREATED');
    ProductStore.emitChange(CHANGE_EVENT);
    break;
  default:
  }
});

module.exports = ProductStore;
