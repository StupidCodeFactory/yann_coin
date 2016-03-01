/*global document, MetaCoin, window, AccountListing, ReactDOM, React */

require('../stylesheets/app.css');

var React          = require('react');
var ReactDOM       = require('react-dom');
var ServiceAccount = require('./services/accounts');
var AccountListing = require('./components/account_list');
var Menu           = require('./components/menu');
var Shop           = require('./components/shop');
var ShopAdmin      = require('./components/shop_admin');

var Router       = require('react-router').Router;
var Route        = require('react-router').Route;

var hashHistory  = require('react-router').hashHistory;
var IndexRoute   = require('react-router').IndexRoute;

window.onload = function() {
    ServiceAccount.getAccounts();

    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={Menu} >
                <IndexRoute component={AccountListing} />
                <Route path="shop" component={Shop} />
                <Route path="admin/shop" component={ShopAdmin} />
            </Route>
        </Router>
        ,
        document.getElementById('container')
    );
};
