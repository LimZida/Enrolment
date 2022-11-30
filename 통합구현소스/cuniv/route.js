import Cmajor from "./models/Cdb_major.js";
import Cregister from "./models/Cdb_register.js";
import Csubject from "./models/Cdb_subject.js";
import Cstudent from "./models/Cdb_student.js";
import logger from "../gachon/config/logger.js";

 function route (app) {
    // 가천정보가 C 대학 학생 정보 요청 및 수신
    app.get("/C/Cstudent", async(req, res) =>  {
      //해당 메소드
      try{
        await Cstudent.getstudent(res);
      }
      catch(error){
        logger.log("error","C대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 C 대학 학과 정보 요청 및 수신
    app.get("/C/Cmajor", async(req, res) =>  {
      //해당 메소드
      try{
        await Cmajor.getmajor(res);
      }
      catch(error){
        logger.log("error","C대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 C 대학 수강 정보 요청 및 수신
    app.get("/C/Cregister", async(req, res) =>  {
      //해당 메소드
      try{
        await Cregister.getregister(res);
      }
      catch(error){
        logger.log("error","C대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 C 대학 과목 정보 요청 및 수신
    app.get("/C/Csubject", async(req, res) =>  {
      //해당 메소드
      try{
        await Csubject.getsubject(res);
      }
      catch(error){
        logger.log("error","C대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })
}

export default route;
