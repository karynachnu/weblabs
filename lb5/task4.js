class ProductCatalog {
    constructor() {
        this.products = new Map();
        this.orders = new Set();
        this.productHistory = new WeakMap();
        this.userReferences = new WeakSet();
    }

    addProduct(id, name, price, quantity) {
        if (this.products.has(id)) {
            alert("Продукт з таким ID вже існує!");
            return;
        }
        this.products.set(id, { name, price, quantity });
        this.productHistory.set(this.products.get(id), []);
        this.displayProducts();
    }

    removeProduct(id) {
        if (!this.products.has(id)) {
            alert("Продукт не знайдено!");
            return;
        }
        this.products.delete(id);
        this.displayProducts();
    }

    updateProduct(id, newPrice, newQuantity) {
        if (!this.products.has(id)) {
            alert("Продукт не знайдено!");
            return;
        }
        let product = this.products.get(id);
        this.productHistory.get(product).push({ oldPrice: product.price, oldQuantity: product.quantity });
        product.price = newPrice;
        product.quantity = newQuantity;
        this.displayProducts();
    }

    searchProduct() {
        let name = prompt("Введіть назву продукту:");
        for (let [id, product] of this.products) {
            if (product.name.toLowerCase() === name.toLowerCase()) {
                alert(`Знайдено: ID: ${id}, Назва: ${product.name}, Ціна: ${product.price}, Кількість: ${product.quantity}`);
                return;
            }
        }
        alert("Продукт не знайдено!");
    }

    placeOrder() {
        let userName = prompt("Введіть ваше ім'я:");
        let id = parseInt(prompt("Введіть ID продукту:"));
        let quantity = parseInt(prompt("Введіть кількість:"));
        if (!this.products.has(id)) {
            alert("Продукт не знайдено!");
            return;
        }
        let product = this.products.get(id);
        if (product.quantity < quantity) {
            alert("Недостатньо товару на складі!");
            return;
        }
        product.quantity -= quantity;
        this.orders.add({ user: { name: userName }, product, quantity });
        this.displayProducts();
        alert("Замовлення успішно оформлене!");
    }

    displayProducts() {
        const list = document.getElementById("productList");
        list.innerHTML = "";
        for (let [id, product] of this.products) {
            list.innerHTML += `<p>ID: ${id}, Назва: ${product.name}, Ціна: ${product.price}, Кількість: ${product.quantity}</p>`;
        }
    }
}

const store = new ProductCatalog();
function addProduct() {
    let id = parseInt(prompt("Введіть ID продукту:"));
    let name = prompt("Введіть назву продукту:");
    let price = parseFloat(prompt("Введіть ціну продукту:"));
    let quantity = parseInt(prompt("Введіть кількість продукту:"));
    store.addProduct(id, name, price, quantity);
}
function searchProduct() {
    store.searchProduct();
}
function placeOrder() {
    store.placeOrder();
}