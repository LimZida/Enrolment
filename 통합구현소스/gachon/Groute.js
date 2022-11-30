import dotenv from "dotenv";
import signup from "./controllers/signup.js";
import monitoring from "./controllers/monitoring.js"
import showschedule from "./controllers/showschedule.js"

// 환경변수(.env) 사용하기 위한 미들웨어
dotenv.config();

function Groute (app,env,logger) {
    // A,B,C 정보를 요청하는 초기 시작화면 (버튼으로 구현)
    app.get("/", async(req, res) =>  {
      //views/home.ejs 출력
      res.render("home");
    })
    
    //회원가입(signup 명사)
    app.post("/signUp", async(req, res) => {
      console.log(req.body);
      // 회원가입 정보 비교 controller 참조
      signup.comparesignup(req.body,res);
    });

    //로그인(login 명사)
    app.post("/login", async(req, res) => {
      // 로그인 정보 controller 참조
      showschedule.getinfo(req,res);
    });

    //송수신현황 모니터링화면 (monitoring 명사)
    app.get("/monitoring", async(req, res) => {
      res.render("monitoring", {
        datas: []
      });
    })
    app.post("/monitoring", async(req, res) => {
      console.log(req.body);
      // monitroing controller 참조
      monitoring.moniter(req,res);
    })
}

export default Groute;

