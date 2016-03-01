var Dispatcher     = require('../dispatcher/dispatcher');
var ActionTypes    = require('../constants/dapps_constants').ActionTypes;

module.exports = {
  createProduct: function (product) {
    Dispatcher.dispatch({
      type: ActionTypes.CREATE_PRODUCT,
      product: product
    });
  },
  productCreated: function (product) {
    product.product_id = product.product_id.valueOf();
    product.price      = product.price.valueOf();
    product.quantity   = product.quantity.valueOf();

    Dispatcher.dispatch({
      type: ActionTypes.PRODUCT_CREATED,
      product: product
    });
  }
};
