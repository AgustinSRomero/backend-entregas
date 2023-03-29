import ProductManager from "./managers/ProductManager.js";

const products = new ProductManager;

// Prueba añadido de producto

await products.addProduct("Aguja", "De metal", 60, "img-url", "AGU001", 25)
await products.addProduct("Alfiler", "De cabeza plástica", 15, "img2-url", "ALF001", 50)
await products.addProduct("Cinta", "Raso", 160, "img3-url", "CINR020", 10)
await products.addProduct("Bies", "Angosto", 250, "img4-url", "BSANG04", 25)

/* // Prueba retorno de producto -> OK

products.getProductById(2) */

/* // Prueba eliminar producto -> OK

products.deleteProduct(2)
 */

/* // Prueba actualizar producto -> OK

products.updateProducts(1, {title: "Alfileres", price: 30, stock: 70}) */

/* const askProducts = await products.getProducts();
console.log(askProducts) */

