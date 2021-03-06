var React        = require('react');
var SendCoinForm = require('./send_coin_form');
var MintCoinForm = require('./mint_coint');
var AdminForm    = require('./admin_form');
var BalanceStore = require('../stores/balance_store');
var BalanceActionCreator = require('../actions/balance_action_creator.js');

function getStateFromStores(accountId) {
    return { account: accountId, balance: BalanceStore.get(accountId) };
}

var AccountListItem = React.createClass({
    getInitialState: function () {
        return getStateFromStores(this.props.account);
    },
    componentWillMount: function () {
        BalanceStore.addChangeEvent(this._onChange);
    },
    componentDidMount: function () {

    },
    render: function () {
        return (
            <tr>
                <td>{this.state.account}</td>
                <td>{this.state.balance}</td>
                <td><SendCoinForm from={this.state.account}/></td>
                <td><MintCoinForm receiver={this.state.account}/></td>
                <td><AdminForm account={this.state.account}/></td>
            </tr>
        )
    },
    _onChange: function() {
        this.setState(getStateFromStores(this.props.account));
    },
});

module.exports = AccountListItem;
