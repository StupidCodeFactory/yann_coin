var React                = require('react');
var AccountStore         = require('../stores/account_store');
var CurrentAccountAction = require('../actions/current_account');
var ServiceAccount       = require('../services/accounts');

var AccountSelect = React.createClass({
    getInitialState: function () {
        return { accounts: AccountStore.getAll() }
    },
    componentWillMount: function () {
        AccountStore.addChangeEvent(this._onChange);
    },
    _onChange: function () {
        this.setState({ accounts: AccountStore.getAll(true) });
    },
    render: function () {

        var accountOptions = [<option key="0">Select an account</option>];

        for(var account in this.state.accounts) {
            accountOptions.push(<option key={account} value={account}>{account}</option>);
        };

        return (
            <select name={this.props.name} onChange={this.props.handleOnAccountSelect}>
                {accountOptions}
            </select>
        )
    }
});

module.exports = AccountSelect;
