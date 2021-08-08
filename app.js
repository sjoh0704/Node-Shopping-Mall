const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require('./router/user')
const port = 8080;
//mongo
mongoose.connect("mongodb://172.17.0.2/shopping-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// user 
app.use("/api", express.urlencoded({ extended: false }), userRouter);
app.use(express.static("assets"));

app.listen(port, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});