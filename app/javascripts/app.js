/*global document, MetaCoin, window, AccountListing, ReactDOM, React */

require('../stylesheets/app.css');

var React = require('react');
var ReactDOM = require('react-dom');
var ServiceAccount = require('./services/accounts');
var AccountListing = require('./components/account_list');
// var accounts;
// var account;
// var balance;



// function setStatus(message) {
//   var status = document.getElementById("status");
//   status.innerHTML = message;
// }

// function refreshBalance() {
//   var meta = MetaCoin.deployed();

//   meta.getBalance.call(account, {from: account}).then(function(value) {
//     var balance_element = document.getElementById("balance");
//     balance_element.innerHTML = value.valueOf();
//   }).catch(function(e) {
//     console.log(e);
//     setStatus("Error getting balance; see log.");
//   });
// }

// function sendCoin() {
//   var meta = MetaCoin.deployed();

//   var amount = parseInt(document.getElementById("amount").value, 10);
//   var receiver = document.getElementById("receiver").value;





//   setStatus("Initiating transaction... (please wait)");

//   meta.sendCoin(receiver, amount, {from: account}).then(function() {
//     setStatus("Transaction complete!");
//     refreshBalance();
//   }).catch(function(e) {
//     console.log(e);
//     setStatus("Error sending coin; see log.");
//   });
// }

window.onload = function() {
  ServiceAccount.getAccounts();
  ReactDOM.render(React.createElement(AccountListing), document.getElementById('accounts'));

  // account = accounts[0].id;

  // refreshBalance();
};
