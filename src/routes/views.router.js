const Router = require('express')
const ProductManager = require("../managerDAOS/ProductManager.js")

const router = Router()

const products = new ProductManager;

router.get('/', async (req, res) => {
    const productsArray = await products.getProducts()

    let product = {
        title: 'Productos - Elisa Mercería',
        style: 'index.css',
        productsArray
    }

    res.render('home', product)
})

module.exports = router