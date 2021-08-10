const express = require('express');
const router = express.Router();
const Cart = require("../models/cart");
const Goods = require("../models/goods");
const authMiddleware = require("../middlewares/auth-middleware");


/**
 * 장바구니에 상품 담기.
 * 장바구니에 상품이 이미 담겨있으면 갯수만 수정한다.
 */
 router.put("/goods/:goodsId/cart", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { goodsId } = req.params;
    const { quantity } = req.body;
  
    const existsCart = await Cart.findOne({
      userId,
      goodsId,
    }).exec();
  
    if (existsCart) {
      existsCart.quantity = quantity;
      await existsCart.save();
    } else {
      const cart = new Cart({
        userId,
        goodsId,
        quantity,
      });
      await cart.save();
    }
  
    // NOTE: 성공했을때 응답 값을 클라이언트가 사용하지 않는다.
    res.send({});
  });
  


/**
 * 장바구니 항목 삭제
 */
router.delete("/goods/:goodsId/cart", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { goodsId } = req.params;
  
    const existsCart = await Cart.findOne({
      userId,
      goodsId,
    }).exec();
  
    // 있든 말든 신경 안쓴다. 그냥 있으면 지운다.
    if (existsCart) {
      existsCart.delete();
    }
  
    // NOTE: 성공했을때 딱히 정해진 응답 값이 없다.
    res.send({});
  });






  module.exports = router;