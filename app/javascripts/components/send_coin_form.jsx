var React                = require('react');
var BalanceActionCreator = require('../actions/balance_action_creator');
var AccountStore         = require('../stores/account_store');

var SendCoinForm = React.createClass({
    propTypes: {
        amount: React.PropTypes.number
    },
    getInitialState: function () {
        return { amount: null, accounts: AccountStore.getAll(), to: null };
    },
    handleAmountOnChange: function (e) {
        this.setState({amount: parseInt(e.target.value.trim(), 10) });
    },
    handleOnSubmit: function (e) {
        e.preventDefault();
        BalanceActionCreator.transferAmount(
            {
                from:   this.props.from,
                to:     this.state.to,
                amount: this.state.amount
            }
        );
    },
    handleOnAccountSelect: function (e) {
        this.setState({to: e.target.value});
    },
    render: function () {
        var accountOptions = [<option key="0">Select an account</option>];


        for(var account in this.state.accounts) {
            var option = <option key={account} value={account}>{account}</option>;
            accountOptions.push(option);
        };

        return (
            <form className="pure-form pure-form-stacked" onSubmit={this.handleOnSubmit}>
                <select onChange={this.handleOnAccountSelect}>
                    {accountOptions}
                </select>
                <input
                    className="pure-input-1"
                    type="text"
                    placeholder="Enter amount"
                    onChange={this.handleAmountOnChange}
                />
                <button  type="submit" className="pure-button pure-button-primary">Send</button>
            </form>
        )
    }
});

module.exports = SendCoinForm;
