var React  = require('react');
var ProductTable = require('./product_table');
var Shop = React.createClass({
    render: function () {
        return(
            <main className="pure-g">
                <div className="pure-u-1-3">Shop</div>
                <div className="pure-u-1-3">
                    <ProductTable />
                </div>
                <div className="pure-u-1-3">Shop</div>
            </main>
        );
    }
});
module.exports = Shop;
