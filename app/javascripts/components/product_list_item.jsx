var React = require('react');
var EditProductButton = require('./edit_product_button');
var ProductListItem = React.createClass({

    render: function() {
        var actionCol = null;
        if (this.props.admin) {
            actionCol = <td><EditProductButton product={this.props.product} /></td>;
        } else {
            actionCol =<td><a className="pure-button pure-button-primary" href="/products/{this.props.product}/buy">Buy</a></td>
        }

        return (
            <tr>
                <td>{this.props.product.product_name}</td>
                <td>{this.props.product.price}</td>
                <td>{this.props.product.quantity}</td>
                <td>{this.props.product.description}</td>
                {actionCol}
            </tr>
        )
    }

});

module.exports = ProductListItem;
