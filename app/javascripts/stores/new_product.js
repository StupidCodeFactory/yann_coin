var Dispatcher     = require('../dispatcher/dispatcher');
var EventEmitter   = require('events').EventEmitter;
var assign         = require('object-assign');
var ActionTypes    = require('../constants/dapps_constants').ActionTypes;

var ServiceProduct = require('../services/product');
var CHANGE_EVENT   = 'change';

function resetProduct() {
  return {
    id:           null,
    product_name: null,
    price:        null,
    quantity:     null,
    description:  null
  };
}

var _product  = resetProduct();

var NewProductStore = (assign({}, EventEmitter.prototype, {
  set: function (product) {
    _product = product;
  },
  get: function () {
    return _product;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeEvent: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
}));

NewProductStore.dispatchToken = Dispatcher.register(function (action) {

  switch(action.type) {
  case ActionTypes.CREATE_PRODUCT:
    ServiceProduct.create(action.product);
    break;
  case ActionTypes.EDIT_PRODUCT:
    NewProductStore.set(action.product);
    NewProductStore.emitChange();
    break;
  case ActionTypes.UPDATE_PRODUCT:
    ServiceProduct.update(action.product);
    break;
  case ActionTypes.PRODUCT_CREATED:
    NewProductStore.set(resetProduct());
    NewProductStore.emitChange();
    break;
  default:
  }
});

module.exports = NewProductStore;
