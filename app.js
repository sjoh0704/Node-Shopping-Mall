const express = require("express");
const app = express();
const userRouter = require('./router/user');
const goodsRouter = require('./router/goods');
const cartRouter = require('./router/cart');
const authMiddleware = require('./middlewares/auth-middleware')
const port = 8080;


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/api", userRouter);
app.use("/api", authMiddleware, goodsRouter);
app.use("/api", authMiddleware, cartRouter);


app.use(express.static("assets"));

app.listen(port, () => {
  console.log("listening: " + port);
});


