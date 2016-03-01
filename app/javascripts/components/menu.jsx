var React   = require('react');
var Link    = require('react-router').Link;

var TopMenu = React.createClass({
    render: function () {

        var menuItems = [
            <li key="shop" className="pure-menu-item">
                <Link to="/shop" className="pure-menu-link" >Shop</Link>
            </li>,
            <li key="shop-admin" className="pure-menu-item">
                <Link to="/admin/shop" className="pure-menu-link" >Shop Admin</Link>
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
