contract Shop {

        struct Product {
                uint   id;
                string product_name;
                uint   price;
                uint   quantity;
                string description;
        }

        uint products_count;

        mapping(uint => Product) products;

        event OnProductCreated(uint product_id, string product_name, uint price, uint quantity, string description);

        function createProduct(string product_name, uint price, uint quantity, string description) returns (uint product_id) {
                product_id           = products_count++;
                products[product_id] = Product(product_id, product_name, price, quantity, description);
                OnProductCreated(product_id, product_name, price, quantity, description);
                return product_id;
        }

        function Shop() {

        }

}
