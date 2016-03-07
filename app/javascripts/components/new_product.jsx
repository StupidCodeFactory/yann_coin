var React                     = require('react');
var ProductWriteActionCreator = require('../actions/product_write_action_creator');
var NewProductStore           = require('../stores/new_product');

function getInitialstate () {
    return NewProductStore.get();
}

var NewProduct = React.createClass({
    getInitialState: function () {
        return getInitialstate();
    },
    onProductChange: function (event) {
        var state = {}
        state[event.target.getAttribute('name')] = event.target.value
        this.setState(state)
    },
    handleOnSubmit: function (event) {
        event.preventDefault();

        if (this.state.id == null) {
            ProductWriteActionCreator.createProduct(this.state);
        } else {
            ProductWriteActionCreator.updateProduct(this.state);
        }

    },
    componentDidMount: function () {
        NewProductStore.addChangeEvent(this._onChange);
    },
    _onChange: function () {
        this.setState(NewProductStore.get());
    },
    render: function() {
        return (
            <form className="pure-form pure-form-stacked" onSubmit={this.handleOnSubmit} >
                <div className="pure-g">
                    <fieldset className="pure-u-md-2-3">
                        <legend>Add a New Product</legend>

                        <div className="pure-g">
                            <div className="pure-u-1 pure-u-md-1-3">
                                <label htmlFor="product-name">Product Name</label>
                                <input
                                    name="product_name"
                                    id="product-name"
                                    className="pure-u-23-24"
                                    type="text"
                                    value={this.state.product_name}
                                    onChange={this.onProductChange}
                                />

                                <label htmlFor="price">Price</label>
                                <input
                                    name="price"
                                    id="price"
                                    className="pure-u-23-24"
                                    type="number"
                                    value={this.state.price}
                                    onChange={this.onProductChange}
                                />

                                <label htmlFor="quantity">Available Quantity</label>
                                <input
                                    name="quantity"
                                    id="quantity"
                                    className="pure-u-23-24"
                                    type="number"
                                    value={this.state.quantity}
                                    onChange={this.onProductChange}
                                />
                            </div>
                            <div className="pure-u-1 pure-u-md-2-3">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="pure-u-1"
                                    rows="8"
                                    defaultValue={this.state.description}
                                    value={this.state.description}
                                    onChange={this.onProductChange}
                                />
                            </div>
                        </div>
                        <div className="pure-g">
                            <div className="pure-u-md-1-2">
                                <input type="submit" value="Create Product" className="pure-button pure-button-primary"/>
                            </div>
                        </div>

                    </fieldset>
                </div>
            </form>
        )
    }

});

module.exports = NewProduct;
