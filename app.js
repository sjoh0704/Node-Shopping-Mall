const express = require("express");
const app = express();
const userRouter = require('./router/user');
const goodsRouter = require('./router/goods');
const cartRouter = require('./router/cart');
const port = 8080;
//mongo
const mongoose = require("mongoose");
const dbpath = "mongodb://172.17.0.3/shopping-demo"
mongoose.connect(dbpath, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/api", userRouter);
app.use("/api", goodsRouter);
app.use("/api", cartRouter);


app.use(express.static("assets"));

app.listen(port, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});


