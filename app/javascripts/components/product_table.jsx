var React           = require('react');
var ProductStore    = require('../stores/product');
var ProductListItem = require('./product_list_item');
var _               = require('lodash');

var allProductLoaded = false;

var ProductTable   = React.createClass({
    getInitialState: function () {
        return { products:  [] }
    },
    componentWillMount: function () {
        ProductStore.addChangeEvent(this._onChange);
    },
    componentDidMount: function () {
        if (!allProductLoaded) {
            ProductStore.all(true);
            allProductLoaded = !allProductLoaded;
        } else {
            this.setState({products: ProductStore.all()});
        }

    },
    componentWillUnmount: function () {
    },
    render: function() {
        var tableRows  = [];
        _.forEach(this.state.products, function (product, productId) {
            tableRows.push(<ProductListItem key={productId} product={product} admin={this.props.admin}/>)
        }.bind(this));

        return (
            <table className="pure-table pure-table-striped">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
            </table>
        )
    },
    _onChange: function () {
        this.setState({ products: ProductStore.all() });
    }
});

module.exports = ProductTable;
