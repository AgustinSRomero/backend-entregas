const fs = require('fs')

class CartManager{
    constructor(){
        this.path = './files/carts.json'
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data);
                return carts;
            }

            console.log("Path no existe")
            await fs.promises.writeFile(this.path, '[]', 'utf-8')
            return [] 
        } catch (error) {
            return console.log(error)
        }
    }

    async createCart(){
        try {
            const carts = await this.getCarts()
            const cart = {products: []}


            if(carts.length === 0){
                cart.id = 1
            }else{
                cart.id = carts[carts.length-1].id +1;
            }

            carts.push(cart)
            const cartsJSON = JSON.stringify(carts, null, 2)
            await fs.promises.writeFile(this.path, cartsJSON, 'utf-8')
            return {status: "success", message: `A new cart has been created with the ID: ${cart.id}`}
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cid){
        try {
            const carts = await this.getCarts()

            if (carts.length === 0) {
                return {status: "error", message: "There is no cart in the data base, please create one."}
            }

            const cartIndex = carts.findIndex(item => item.id === cid)

            if (cartIndex === -1) {
                return {status: "error", message: 'There is no cart with that ID, please try again with another.'}
            }else{
                return carts[cartIndex]
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getProductsInCart(cid){
        const cart = await this.getCartById(cid)

        if (!cart.id) {
            return cart
        }

        return cart.products
    }

    async addToCart(cid, pid){
        try {
            const cart = await this.getCartById(cid)
            console.log(cart)

            if (!cart.id) {
                return cart
            }

            // busco el index del producto en los productos del cart
            const productIndex = cart.products.findIndex(item => item.product === pid)
            console.log(productIndex)

            if(productIndex === -1){
                cart.products.push({product: pid, quantity: 1})
            }else{
                cart.products[productIndex].quantity++
            }
            
            //Traigo mi arreglo carts para trabajarlo
            const carts = await this.getCarts()

            // busco el index del cart en el arreglo carts
            const cartIndex = carts.findIndex(item => item.id === cid)

            // sobreescribo el cart en el arreglo y lo guardo en fs
            Object.assign(carts[cartIndex], cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return {status: "success", message: "The product has been added to the cart."}
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartManager