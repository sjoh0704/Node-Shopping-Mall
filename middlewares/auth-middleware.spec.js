const authMiddleware = require("./auth-middleware")
const jwt = require("jsonwebtoken");
const {User} = require("../models")

test("정상적인 토큰을 넣은 경우 User.findByPk가 실행된다", ()=>{
    User.findByPk = jest.fn(); // db를 mock
    const token = jwt.sign({userId: "test"}, "my-secret-key");
    authMiddleware({
        headers:{
            authorization:`Bearer ${token}`
        }
    },{
        status:()=>({
            send: ()=>{}
        }),
        locals:{}
    }
    );

    expect(User.findByPk).toHaveBeenCalledWith("test"); // 입력값을 받는 것!
    expect(User.findByPk).toHaveBeenCalledTimes(1);
})

test("변조된 토큰으로 요청한 경우 로그인 후 사용하세요 라는 에러 메시지가 뜬다.", ()=>{
    const mockedSend = jest.fn();
    const token = jwt.sign({userId: "test"}, "not-correct-key");
    authMiddleware({
        headers:{
            authorization:`Bearer ${token}`
        }
    },{
        status:()=>({
            send: mockedSend
        }),
        locals:{}
    }
    );

    expect(mockedSend).toHaveBeenCalledWith({
        errorMessage: "로그인 후 사용하세요"
    });
})

