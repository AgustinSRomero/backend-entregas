const Router = require('express')
const ProductManager = require("../managerDAOS/ProductManager.js")

const router = Router()

const products = new ProductManager;

//GET all products with limit
router.get('/', async (req, res) => {
    const { limit } = req.query
    let NaN = isNaN(limit)

    if (!limit) {
        return res.send(await products.getProducts())
    }

    if(NaN) {
        return res.status(400).send({status: "Error", message: "The limit is not a number, please to search with a limit introduce a number"})
    }

    return res.send(await products.limitProducts(limit))
})

// GET product by pid
router.get('/:pid', async (req, res) => {
   let NaN = isNaN(req.params.pid)
    if (NaN) {return res.status(400).send({status: "error", message: "The ID is not a number, please to search an item introduce a number"})}

    const id = parseInt(req.params.pid)
    const verifyError= await products.getProductById(id)
    if (verifyError.status === "error") {
        return res.status(400).send(verifyError)
    }

    return res.status(200).send(verifyError)
})

// POST new product 
router.post('/', async (req, res) => {
    const product = req.body

    // Chequeo que los campos esten completos y envio o rechazo
    if(product.title && product.description && product.code && product.price && product.stock && product.category){
        const verifyError = await products.addProduct(product)
        if (verifyError.status === "error") {
            return res.status(400).send(verifyError)
        }
        return res.status(200).send(verifyError)
    }else{
        return res.status(400).send({status: "error", message: "Missing required information."})
    }
})

// PUT product by pid
router.put('/:pid', async (req, res) => {
    let NaN = isNaN(req.params.pid)
    if (NaN) {return res.status(400).send({status: "error", message: "The ID is not a number, please to search an item introduce a number"})}

    const id = parseInt(req.params.pid)
    const infoUpdate = req.body

    if (infoUpdate.id) {
        return res.status(400).send({status: "error", message: "Can't modified the product ID"})
    }

    const verifyError = await products.updateProduct(id, infoUpdate)
    if (verifyError.status === "error") {
        return res.status(400).send(verifyError)
    }
    return res.status(200).send(verifyError)
})

//DELETE product by pid
router.delete('/:pid', async (req, res) => {
    let NaN = isNaN(req.params.pid)
    if (NaN) {return res.status(400).send({status: "error", message: "The ID is not a number, please to search an item introduce a number"})}
    
    const id = parseInt(req.params.pid)
    const verifyError = await products.deleteProduct(id)
    if (verifyError.status === "error") {
        return res.status(400).send(verifyError)
    }

    return res.status(200).send(verifyError)
})


/* // Añadido de producto

await products.addProduct("Aguja", "De metal", 60, "img-url", "AGU001", 25)
await products.addProduct("Alfiler", "De cabeza plástica", 15, "img2-url", "ALF001", 50)
await products.addProduct("Cinta", "Raso", 160, "img3-url", "CINR020", 10)
await products.addProduct("Bies", "Angosto", 250, "img4-url", "BSANG04", 25)
await products.addProduct("Cierre", "De metal", 60, "img5-url", "CIER001", 25)
await products.addProduct("Pegamento", "Universal", 15, "img6-url", "PEG011", 50)
await products.addProduct("Cierre", "Plástico", 160, "img7-url", "CIER024", 10)
await products.addProduct("Puntilla", "Algodón", 250, "img8-url", "PNTALG054", 25)
await products.addProduct("Cinta", "Raso Motivo", 60, "img9-url", "CINR421", 25)
await products.addProduct("Mendafacil", "Jea", 15, "img10-url", "MEND154", 50)
await products.addProduct("Hilo", "Encerado", 160, "img11-url", "HIL354", 10)
await products.addProduct("Hilo", "Bobina", 250, "img12-url", "HIL084", 25) */

module.exports = router