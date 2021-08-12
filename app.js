const express = require("express");
const app = express();
const userRouter = require('./router/user');
const goodsRouter = require('./router/goods');
const cartRouter = require('./router/cart');
const port = 8080;

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/apis", userRouter);
app.use("/apis", goodsRouter);
app.use("/apis", cartRouter);


app.use(express.static("assets"));

app.listen(port, () => {
  console.log("listening: " + port);
});


