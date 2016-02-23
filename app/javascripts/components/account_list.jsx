var React = require('react');
var AccountStore = require('../stores/account_store');
var AccountListItem = require('./account_list_item');

function getStateFromStores() {
    return {
        accounts: AccountStore.getAll()
    }
}

var AccountListing = React.createClass({

    getInitialState: function () {
        return getStateFromStores();
    },

    componentDidMount: function() {
        AccountStore.addChangeEvent(this._onChange);
    },

    render: function () {
        var accountItems = [];

        for(var accountId in this.state.accounts) {
            var account = this.state.accounts[accountId];
            accountItems.push(<AccountListItem key={account.id} account={account.id} balance={account.balance} />);
        }

        return (
            <table className="pure-table pure-table-bordered">
                <thead>
                    <tr>
                        <th>Accounts</th>
                        <th>Balances</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {accountItems}
                </tbody>

            </table>
        );
    },
    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = AccountListing;
