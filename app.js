const express = require("express");
const Http = require('http');
const socketIo = require('socket.io');
const app = express();
const http = Http.createServer(app);
const io = socketIo(http); 
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

io.on('connection', (socket) => {
  console.log("소켓 연결 성공");
  
  // 연결되었을때만 뜨게된다. 
  socket.emit("BUY_GOODS", {
    nickname: '서버가 보내준 구매자 닉네임',
    goodsId: 10, // 서버가 보내준 상품 데이터 고유 ID
    goodsName: '서버가 보내준 구매자가 구매한 상품 이름',
    date: '서버가 보내준 구매 일시'
  });

  socket.on('BUY', (data)=> {
    console.log("클라이언트가 구매한 데이터",data);
  })


  socket.on('disconnect', () => {
    console.log('소켓 연결이 해제되었습니다.');
  })
})


// 얘만 http로 바꿔주면 된다. 
http.listen(port, () => {
  console.log("listening: " + port);
});


