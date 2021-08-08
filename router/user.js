const express =require('express');
const router = express.Router();
const User = require("../models/user")
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/users', async(req, res)=>{
    const {nickname, email, password, confirmPassword} = req.body;
    if(password!==confirmPassword){
        res.status(400).send({
            errorMessage: "비밀번호가 다르네요"
        });
        return;
    }
    const existUser = await User.find({
        $or:[{email}, {nickname}]
    });
    if(existUser.length){
        res.status(400).send({
            errorMessage: "닉네임이나 이메일이 존재합니다."
        });
        return;
    }
    
    const user = new User({email, nickname, password});
    await user.save();
    res.send({message: "success"});
});


router.post('/auth', async(req, res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email, password}).exec();
    if(!user){
        res.status(400).send({
            errorMessage: '이메일이나 패스워드가 잘못되었습니다.'
        });
        return;
    }

    const token = jwt.sign({userId: user.userId}, 'my-secret-key');

    res.send({
        token
    });

});


// middleware는 다음처럼 중앙에 배치 
router.get('/users/me',authMiddleware, async(req, res)=>{
    console.log(res.locals.user);
    res.send({});
})

module.exports = router;
