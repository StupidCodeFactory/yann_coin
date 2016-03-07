var Dispatcher     = require('../dispatcher/dispatcher');
var ActionTypes    = require('../constants/dapps_constants').ActionTypes;

module.exports = {
  createProduct: function (product) {
    Dispatcher.dispatch({
      type:    ActionTypes.CREATE_PRODUCT,
      product: product
    });
  },
  editProduct: function (product) {
    Dispatcher.dispatch({
      type:    ActionTypes.EDIT_PRODUCT,
      product: product
    });
  },
  updateProduct: function (product) {
    console.log('ACTIONS CREATOR??');
    Dispatcher.dispatch({
      type:    ActionTypes.UPDATE_PRODUCT,
      product: product
    });
  },
  productCreated: function (product) {
    product.id       = parseInt(product.product_id.valueOf() ,10);
    product.price    = parseFloat(product.price.valueOf());
    product.quantity = parseInt(product.quantity.valueOf(), 10);

    Dispatcher.dispatch({
      type:    ActionTypes.PRODUCT_CREATED,
      product: product
    });
  },
  productUpdated: function (product) {
    product.id       = parseInt(product.product_id.valueOf() ,10);
    product.price    = parseFloat(product.price.valueOf());
    product.quantity = parseInt(product.quantity.valueOf(), 10);

    Dispatcher.dispatch({
      type:    ActionTypes.PRODUCT_UPDATED,
      product: product
    });
  }
};
