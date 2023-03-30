import fs from 'fs';

export default class ProductManager{
    constructor(){
        this.path = '../files/data.json';
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            }

            console.log("Path no existe")
            await fs.promises.writeFile(this.path, '[]', 'utf-8')
            return [] 
        } catch (error) {
            return console.log(error)
        }
    }

    async limitProducts(limit){
        try {
            const products = await this.getProducts()
            const limitProducts = []

            for (let index = 0; index < limit; index++) {
                let item = products[index]
                limitProducts.push(item)
            }

            return limitProducts
        } catch (error) {
            return console.log(error)
        }
    }
    
    async addProduct(title, description, price, thumbnail, code, stock){
        try {
            const product = {
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            
            const products = await this.getProducts();
    
            // chequeo si el codigo existe
            const codeRegistered = products.find(item => item.code === product.code);
            if(codeRegistered){
                return console.log(`Product code already exist.`);
            }
    
            // genero id automático
            if(products.length === 0){
                product.id = 1
            }else{
                product.id = products[products.length-1].id +1;
            }
    
            // Chequeo que los campos esten completos y pusheo o rechazo
            if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock){
                products.push(product)
                const productsJSON = JSON.stringify(products, null, 2)
                await fs.promises.writeFile(this.path, productsJSON, 'utf-8')
                return console.log("The product has been created with success.")
            }else{
                return console.log("Missing required information.");
            }
        } catch (error) {
            return console.log(error);
        }
    }

    async getProductById(searchId){
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex(item => item.id === searchId);
    
            if(productIndex === -1){
                return {error: "The product with that ID is not found, please try again with another ID."};
            }else{
                return products[productIndex];
            }
        } catch (error) {
            return console.log(error);
        }
    }

    async updateProducts(productId, infoUpdate){
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex(item => item.id === productId);

            if(productIndex === -1){
                return console.log("Product not found")
            }else{
                
                infoUpdate.id? console.log("Can't modified the product ID") : Object.assign(products[productIndex], infoUpdate)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
                return console.log("The product has been updated with success.")
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async deleteProduct(productId){
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex(item => item.id === productId);
    
            if(productIndex === -1){
                return console.log("Product not found");
            }else{
                let newArray = products.filter(item => item.id !== productId);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray, null, 2))
                return console.log("The product has been eliminated with success.")
            }
        } catch (error) {
            return console.log(error); 
        }
    }
}

