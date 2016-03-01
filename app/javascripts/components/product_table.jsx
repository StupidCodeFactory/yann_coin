var React           = require('react');
var ProductStore    = require('../stores/product');
var ProductListItem = require('./product_list_item');
var _               = require('lodash');

var ProductTable   = React.createClass({
    getInitialState: function () {
        return { products: ProductStore.all(true) }
    },
    componentWillMount: function () {
        ProductStore.addChangeEvent(this._onChange);
    },
    render: function() {
        var tableRows  = [];

        _.forEach(function (productId, product) {
            console.log('asdasd');
            tableRows.push(<ProductListItem key={productId} product={product}/>)
        });
        console.log(tableRows);
        return (
            <table className="pure-table pure-table-striped">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    },
    _onChange: function () {
        console.log(ProductStore.all());
        this.setState({ products: ProductStore.all() });
    }


});

module.exports = ProductTable;
