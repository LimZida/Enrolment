import logger from "../gachon/config/logger.js";
import Bregister from "./models/Bdb_register.js";
import Bstudent from "./models/Bdb_student.js";
import Bsubject from "./models/Bdb_subject.js";

 function route (app) {
    // 가천정보가 B 대학 수강 정보 요청 및 수신
    app.get("/B/Bregister", async(req, res) =>  {
      //해당 메소드
      try{
        await Bregister.getregister(res);
      }
      catch(error){
        logger.log("error","B대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 B 대학 학생 정보 요청 및 수신
    app.get("/B/Bstudent", async(req, res) =>  {
      //해당 메소드
      try{
        await Bstudent.getstudent(res);
      }
      catch(error){
        logger.log("error","B대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 B 대학 과목 정보 요청 및 수신
    app.get("/B/Bmajor", async(req, res) =>  {
      //해당 메소드
      try{
        await Bsubject.getsubject(res);
      }
      catch(error){
        logger.log("error","B대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

}

export default route;
