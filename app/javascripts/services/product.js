var ProductActionCreator = require('../actions/product_write_action_creator.js');
var CurrentAccount       = require('../stores/current_account');
var web3                 = require('./web3');
var Pudding              = require('ether-pudding');

Pudding.setWeb3(web3);
Shop.load(Pudding);
var ShopContract = Shop.deployed();

var ShopService = function (shop) {
  function WatchForProductUpdated(productId) {
    var event = shop.OnProductUpdated({fromBlock: 0, toBlock: 'latest'});

    event.watch(function (error, result) {
      if (error) {
        throw error;
      }
      ProductActionCreator.productCreated(result.args);
      event.stopWatching();
    });

  }

  function WatchForProductCreated() {

    var event = shop.OnProductCreated({fromBlock: 0, toBlock: 'latest'});

    event.watch(function (error, result) {
      if (error) {
        throw error;
      }

      ProductActionCreator.productCreated(result.args);
      event.stopWatching();
    });
  }

  return {
    all: function () {
      shop.allEvents({fromBlock: 0, toBlock: 'latest'}).get(function(error, logs){
        if (error) {
          throw error;
        }
        logs.forEach(function (log) {

           ProductActionCreator.productCreated(log.args);
        });
      });
    },
    get: function (productId) {
      shop.getProduct(productId).then(function (product) {
        console.log(product);
      }).catch(function (error) {
        throw error;
      });
    },
    create: function (product) {
      shop.createProduct(
        product.product_name,
        product.price,
        product.quantity,
        product.description,
        {from: CurrentAccount.get(), gas: 1000000}
      ).then(function(res) {
        console.log('res');
        console.log(res);
        WatchForProductCreated();
      }).catch(function (error) {
        console.log(error);
        throw error;
      });
    },
    update: function (product) {
      console.log(product);
      shop.updateProduct(
        product.id,
        product.product_name,
        product.price,
        product.quantity,
        product.description,
        {from: CurrentAccount.get(), gas: 1000000}
      ).then(function() {
        WatchForProductUpdated(product.id);
      }).catch(function (error) {
        throw error;
      });
    }
  };
};


module.exports = new ShopService(ShopContract);
