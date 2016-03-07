var React      = require('react');
var NewProduct = require('./new_product');
var ProductTable = require('./product_table');

var ShopAmin = React.createClass({
    render: function () {
        return(
            <main className="pure-g">
                <div className="pure-u-1-3">
                    <NewProduct />
                </div>

                <div className="pure-u-2-3">
                    <ProductTable admin={true}/>
                </div>
            </main>
        );
    }
});
module.exports = ShopAmin;
