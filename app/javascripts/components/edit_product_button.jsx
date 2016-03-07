var React                     = require('react');
var ProductWriteActionCreator = require('../actions/product_write_action_creator');

var EditProductButton         = React.createClass({
    handleOnClick: function (event) {
        event.preventDefault();
        ProductWriteActionCreator.editProduct(this.props.product);
    },
    render: function() {
        return (
            <a className="pure-button pure-button-primary" onClick={this.handleOnClick}>Edit</a>
        )
    }

});

module.exports = EditProductButton;
