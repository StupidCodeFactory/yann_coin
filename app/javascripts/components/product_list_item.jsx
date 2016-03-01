var React = require('react');

var ProductListItem = React.createClass({
    render: function() {
        return (
            <tr>
                <td>{this.props.account.product_name}</td>
                <td>{this.props.account.price}</td>
                <td>{this.props.account.quantity}</td>
                <td>{this.props.account.description}</td>
            </tr>
        )
    }

});

module.exports = ProductListItem;
