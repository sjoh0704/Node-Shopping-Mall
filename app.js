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
  

  socket.on('BUY', (data)=> {
    const payload = {
      nickname: data.nickname,
      goodsId: data.goodsId,
      goodsName: data.goodsName,
      date: new Date().toISOString(), // 보기 쉬운 문자열로 바꾸기 
    };
    
    // io.emit('BUY_GOODS', payload); // io는 모든 소켓 관리자라고 하자 
    // socket.emit('BUY_GOODS', payload); 나에게만 보내기 
    socket.broadcast.emit('BUY_GOODS', payload); // 나를 제외한 모두에게 
  })


  socket.on('disconnect', () => {
    console.log('소켓 연결이 해제되었습니다.');
  })
})


// 얘만 http로 바꿔주면 된다. 
http.listen(port, () => {
  console.log("listening: " + port);
});


