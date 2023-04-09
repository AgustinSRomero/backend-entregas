const { Router } = require( 'express' )
const ProductManager = require('../managerDAOS/ProductManager')
const CartManager = require('../managerDAOS/CartManager')

const router = Router()
const products = new ProductManager()
const carts = new CartManager()

router.post('/', async (req, res) => {
    return res.status(200).send(await carts.createCart())
})

router.get('/:cid', async (req, res) => {
    let NanCid = isNaN(req.params.cid)

    if (NanCid) {
        return res.status(400).send({status: "Error", message: "Please verify that the ID has only numbers and try again."})
    }

    let cid = parseInt(req.params.cid)
    const verifyError = await carts.getProductsInCart(cid)
    if (verifyError.status === "error") {
        return res.status(400).send(verifyError)
    }

    return res.status(200).send(verifyError)
})

router.post('/:cid/product/:pid', async (req, res) => {
    let NanCid = isNaN(req.params.cid)
    let NanPid = isNaN(req.params.pid)
    
    if (NanCid || NanPid) {
        return res.status(400).send({status: "Error", message: "Please verify that the IDs have only numbers and try again."})
    }
    
    const pid = parseInt(req.params.pid)
    const prods = await products.getProducts()
    const pidVerification = prods.find(item => item.id === pid)

    if (!pidVerification) {
        return res.status(400).send({status: "Error", message: "No product is found with that ID, please try again with another."})
    }

    const cid = parseInt(req.params.cid)
    const verifyError = await carts.addToCart(cid, pid)
    if (verifyError.status === "error") {
        return res.status(400).send(verifyError)
    }

    return res.status(200).send(verifyError)
})

module.exports = router