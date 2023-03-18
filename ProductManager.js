class ProductManager{
    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        // chequeo si el codigo existe
        const codeRegistered = this.products.find(item => item.code === product.code);
        if(codeRegistered){
            return console.log(`Product code already exist.`);
        }

        // genero id automático
        if(this.products.length === 0){
            product.id = 1
        }else{
            product.id = this.products[this.products.length-1].id +1;
        }

        // Chequeo que los campos esten completos y pusheo o rechazo
        if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock){
            this.products.push(product);
        }else{
            return console.log("Missing required information.");
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(searchId){
        const productIndex = this.products.findIndex(item => item.id === searchId);

        if(productIndex === -1){
            console.log("Product not found");
        }else{
            return console.log(this.products[productIndex]);
        }
    }
}

const products = new ProductManager();
products.addProduct("Aguja", "Para coser", 50, "img-bla", 1, 25);
products.addProduct("Alfiler", "Con cabeza plástica", 30, "img-img", 2, 50);

// Error de falta informacion
products.addProduct("Carton", 400, "img.url", 3, 350);

// Error codigo repetido
products.addProduct("Alfileres", "Cabeza plástica", 30, "img-img", 2, 50);

console.log(products.getProducts());

// Encontrar producto por id
products.getProductById(1);
products.getProductById(40);

