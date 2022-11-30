console.log("call : A대학 실행");

// 필요한 기본 모듈 참조
import express from "express";
import route from "./route.js";
import dotenv from "dotenv";
import connection from "./config/db_config.js";

const app = express();
// JSON Parser 미들웨어 등록
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));
//환경변수 사용 미들웨어 등록
dotenv.config();
//주소 등록
route(app);
//DB 연결
connection.connect((err)=>{
  if (err) {
    console.log(err);
  } else {
    console.log('A대학과 MYSQL DB 연결');
  }
});
//서버 연결
app.listen(process.env.AUNIV_PORT, () => {
    console.log("A대학에 접속합니다: " + process.env.AUNIV_PORT);
  });
  
