import express from "express";
import ProductManager from "./managers/ProductManager.js";

const app = express()
app.use(express.urlencoded({extended: true}))

const products = new ProductManager;

app.get('/products', async (req, res) => {
    const { limit } = req.query
    let NaN = isNaN(limit)

    if (!limit) {
        return res.send(await products.getProducts())
    }

    if(NaN) {
        return res.send({error: "The limit is not a number, please to search with a limit introduce a number"})
    }

    return res.send(await products.limitProducts(limit))
})

app.get('/products/:pid', async (req, res) => {
   let NaN = isNaN(req.params.pid)
   
    if (NaN) {
        return res.send({error: "The ID is not a number, please to search an item introduce a number"})
    }

    const id = parseInt(req.params.pid)
    return res.send(await products.getProductById(id))
})

app.listen(8080, () => {console.log("Listening in port 8080")})









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