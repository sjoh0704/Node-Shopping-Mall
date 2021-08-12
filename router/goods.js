const express = require('express');
const {Goods, Cart} = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();
const {Op} = require('sequelize');

/**
 * 내가 가진 장바구니 목록을 전부 불러온다.
 */
 router.get("/goods/cart", async (req, res) => {
  const { userId } = res.locals.user;
  const cart = await Cart.findAll({
    where:{
      userId
    }
  });
  const goodsIds = cart.map((c) => c.goodsId);
  const goodsKeyById = await Goods.findAll({
    where:{
      goodsId:{
        [Op.in]:[goodsIds]
      }
    }
  }).then((goods) =>
      goods.reduce(
        (prev, g) => ({
          ...prev,
          [g.goodsId]: g,
        }),
        {}
      )
    );

  res.send({
    cart: cart.map((c) => ({
      quantity: c.quantity,
      goods: goodsKeyById[c.goodsId],
    })),
  });


  
});


/**
 * 모든 상품 가져오기
 * 상품도 몇개 없는 우리에겐 페이지네이션은 사치다.
 * @example
 * /api/goods
 * /api/goods?category=drink
 * /api/goods?category=drink2
 */
 router.get("/goods", async (req, res) => {
    const { category } = req.query;
    const goods = await Goods.findAll(category ? { where:{category} } : {});
  
    res.send({ goods });
  });


/**
 * 상품 하나만 가져오기
 */
 router.get("/goods/:goodsId", async (req, res) => {
    const { goodsId } = req.params;
    const goods = await Goods.findByPk(goodsId);
  
    if (!goods) {
      res.status(404).send({});
    } else {
      res.send({ goods });
    }
  });

router.post('/goods', async(req, res) => {
  const {name, thumbnailUrl, category, price} = req.body;
  const goods = await Goods.findOne({
    where:{
      name
    }
  });
  if(goods){
    res.status(400).send({errorMessage: '이미 있는 상품'})
    return;
  }
  await Goods.create({
    name, 
    thumbnailUrl, 
    category, 
    price
  });

  res.send({message: 'goods 생성'});
  
})




module.exports  = router;