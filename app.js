const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user")

mongoose.connect("mongodb://172.17.0.3/shopping-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const app = express();
const router = express.Router();

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



app.use("/api", express.urlencoded({ extended: false }), router);
app.use(express.static("assets"));

app.listen(8080, () => {
  console.log("서버가 요청을 받을 준비가 됐어요");
});