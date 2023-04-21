const express = require('express')
const handlebars = require('express-handlebars')
const productRouter = require('./routes/products.router')
const cartRouter = require('./routes/carts.router')
const viewsRouter = require('./routes/views.router')
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')

const app = express()

// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname +'/views')
app.set('view engine', 'handlebars')
// 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser())

app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send('We are having trouble with the server')
})

app.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {})
})

const PORT = 8080

const httpServer = app.listen(PORT, () => {console.log("Listening in port 8080")})

const socketServer = new Server(httpServer)