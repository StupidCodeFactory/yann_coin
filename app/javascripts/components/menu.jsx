var React                = require('react');
var Link                 = require('react-router').Link;
var AccountSelect        = require('./account_select');
var CurrentAccountAction = require('../actions/current_account');

var TopMenu = React.createClass({
    handleOnAccountSelect: function (event) {
        CurrentAccountAction.select(event.target.value);
    },
    render: function () {

        var menuItems = [
            <li key="shop" className="pure-menu-item">
                <Link to="/shop" className="pure-menu-link" >Shop</Link>
            </li>,
            <li key="shop-admin" className="pure-menu-item">
                <Link to="/admin/shop" className="pure-menu-link" >Shop Admin</Link>
            </li>,
            <li key="accounts" className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
                <form className="pure-form">
                    <AccountSelect name="currentAccount" handleOnAccountSelect={this.handleOnAccountSelect} />
                </form>
            </li>
        ];

        return (
            <div >
                <header>
                    <div className="pure-menu pure-menu-horizontal">
                        <a href="#" className="pure-menu-heading pure-menu-link">Yann's DAPP</a>
                        <ul className="pure-menu-list">
                            {menuItems}
                        </ul>
                    </div>
                </header>
                {this.props.children}
            </div>
        )
    }
});

module.exports = TopMenu;
