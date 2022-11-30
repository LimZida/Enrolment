console.log("call : 가천정보 실행");

// 필요한 기본 모듈 참조
import express from "express";
import Groute from "./Groute.js";
import ejs from "ejs";
import dotenv from "dotenv";
import connection from "./config/db_config.js";
import path from "path";
import { fileURLToPath } from 'url';
import logger from './config/logger.js';
import batch from './controllers/batch.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log("dirname", __dirname);

const app = express();
// JSON Parser 미들웨어 등록
app.use(express.json());  
app.use(express.urlencoded({ extended: false }));
//환경변수 사용 미들웨어 등록
dotenv.config();

// view 경로 설정
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
// app.use(express.static(__dirname + '/public'));

//가천정보에 요청하기 위한 주소 등록
Groute(app,process.env.GUNIV_PORT,logger);

//A,B,C대학에 일괄 처리로 데이터 요청 등록
batch(logger);

//DB 연결
connection.connect((err)=>{
  err?logger.log("error",'가천정보 DB연결 에러:'+err):console.log('가천정보와 MYSQL DB 연결');
});
//서버 연결
app.listen(process.env.GACHON_PORT, () => {
    console.log("가천정보에 접속합니다: " + process.env.GACHON_PORT);
  });


  
