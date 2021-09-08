const app =require("./app")
const supertest = require("supertest"); // 서버를 가짜로 실행시킨다. 

// supertest(app).get("/index.html"); //index.html 경로로 get을 받아오는 것처럼 실행 


test("/index.html 경로에 요청했을 때 status code가 200이어야 한다.", async ()=>{
    const res = await supertest(app).get("/index.html");
    expect(res.status).toEqual(200);
})

test("아무경로에 요청했을 때 status code가 404여야 한다.", async()=>{
    const res = await supertest(app).get("/adfadsg");
    expect(res.status).toEqual(404);
})
  