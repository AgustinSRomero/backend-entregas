import ProductManager from "./managers/ProductManager.js";

const products = new ProductManager;

// Prueba añadido de producto -> OK

// products.addProduct("Aguja", "De metal", 60, "img-url", 1, 25)
// products.addProduct("Alfiler", "De cabeza plástica", 15, "img2-url", 2, 50)

// Prueba retorno de producto -> OK

/* products.getProductById(2)  */

// Prueba eliminar producto -> OK

/* products.deleteProduct(2) */

// Prueba actualizar producto -> OK

/* products.updateProducts(1, {title: "Alfileres", price: 30, stock: 70}) */

const askProducts = await products.getProducts();
console.log(askProducts)

