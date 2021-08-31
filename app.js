const express = require('express');
const Http = require('http');
const app = express();
const http = Http.createServer(app);
const userRouter = require('./router/user');
const goodsRouter = require('./router/goods');
const cartRouter = require('./router/cart');
const authMiddleware = require('./middlewares/auth-middleware');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', authMiddleware, goodsRouter);
app.use('/api', authMiddleware, cartRouter);

app.use(express.static('assets'));



module.exports = http;
