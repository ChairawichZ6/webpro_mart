const express = require("express")
const app = express();
const path = require("path")
const cors = require('cors')
const { logger } = require('./middlewares')

app.use(logger)
app.use(cors())

// Statics => built-in middleware 3 ตัวนี้
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const profileRouter = require('./routes/profile')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const userRouter = require('./routes/user')

app.use(indexRouter.router)
app.use(profileRouter.router)
app.use(productRouter.router)
app.use(userRouter.router)
app.use(cartRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})
