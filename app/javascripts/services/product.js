var ProductActionCreator = require('../actions/product_write_action_creator.js');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(WEB3_PROVIDER_LOCATION));
var Pudding = require('ether-pudding');
Pudding.setWeb3(web3);
Shop.load(Pudding);
var ShopContract = Shop.deployed();

var ShopService = function (shop) {

  function WatchForProductCreated() {

    var event = shop.OnProductCreated({fromBlock: 0, toBlock: 'latest'});

    event.watch(function (error, result) {
      if (error) {
        throw error;
      }
      console.log('OnProductCreated:');
      console.log(result);
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
        {from: web3.eth.accounts[0], gas: 1000000}
      ).then(function() {
        WatchForProductCreated();
      }).catch(function (error) {
        throw error;
      });
    }
  };
};


module.exports = new ShopService(ShopContract);
