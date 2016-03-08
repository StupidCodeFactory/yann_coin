import "Admin.sol";

contract Shop is Admin {

        struct Product {
                uint   id;
                string product_name;
                uint   price;
                uint   quantity;
                string description;
        }

        uint products_count;

        mapping(uint => Product) products;
        address[] admins;

        event OnProductCreated(uint product_id, string product_name, uint price, uint quantity, string description);
        event OnProductUpdated(uint product_id, string product_name, uint price, uint quantity, string description);

        function createProduct(string product_name, uint price, uint quantity, string description) AdminOnly returns (uint product_id) {
                product_id           = products_count++;
                products[product_id] = Product(product_id, product_name, price, quantity, description);
                OnProductCreated(product_id, product_name, price, quantity, description);
                return product_id;
        }

        function updateProduct(uint product_id, string product_name, uint price, uint quantity, string description) AdminOnly returns (uint updated_product_id) {

                Product p = products[product_id];
                p.product_name = product_name;
                p.price        = price;
                p.quantity     = quantity;
                p.description  = description;

                OnProductUpdated(product_id, product_name, price, quantity, description);
                return product_id;
        }

        function Shop() {

        }

}
