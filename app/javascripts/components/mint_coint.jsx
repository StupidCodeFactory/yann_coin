var React                = require('react');
var BalanceActionCreator = require('../actions/balance_action_creator');
var AccountStore         = require('../stores/account_store');

var MintCoin = React.createClass({
    propTypes: {
        amount: React.PropTypes.number
    },
    getInitialState: function () {
        return { amount: null  };
    },
    handleAmountOnChange: function (e) {
        this.setState({amount: parseInt(e.target.value.trim(), 10) });
    },
    handleOnSubmit: function (e) {
        e.preventDefault();
        BalanceActionCreator.mintCoin(
            {
                receiver: this.props.receiver,
                amount:   this.state.amount
            }
        );
    },
    handleOnAccountSelect: function (e) {
        this.setState({to: e.target.value});
    },
    render: function () {
        return (
            <form className="pure-form pure-form-stacked" onSubmit={this.handleOnSubmit}>
                <input
                    className="pure-input-1"
                    type="text"
                    placeholder="Mint"
                    onChange={this.handleAmountOnChange}
                />
                <button  type="submit" className="pure-button pure-button-primary">Send</button>
            </form>
        )
    }
});

module.exports = MintCoin;
