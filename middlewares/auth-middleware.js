const jwt = require('jsonwebtoken');
const User = require('../models/user')
module.exports = (req, res, next) => {
    // 여기서 토큰을 검사한다. 
    const {authorization} = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    if(tokenType !== 'Bearer'){
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요',
        });
        return;
    }
    
    try{
        const {userId} = jwt.verify(tokenValue, 'my-secret-key');
        
        User.findById(userId).exec().then(user => {
            // 다음으로 넘겨주기 위함. 
            res.locals.user=user;
            next();
        });
        
        // middleware는 next를 호출해야 한다. 
        
    }
    catch(error){
        res.status(400).send({
            errorMessage: '로그인 후 사용하세요'
        })
        return;
    }


}