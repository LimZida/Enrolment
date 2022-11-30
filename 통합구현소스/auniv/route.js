import Alecroom from "./models/Adb_lecroom.js";
import Amajor from "./models/Adb_major.js";
import Aprof from "./models/Adb_prof.js";
import Aregister from "./models/Adb_register.js";
import Astudent from "./models/Adb_student.js";
import Asubject from "./models/Adb_subject.js";
import log from "../gachon/models/A_DB/Log_insert.js";

 function route (app) {
    // 테스트용 초기화면
    app.get("/", async(req, res) =>  {
      //해당 메소드
      res.send("초기화면");
    })
    
    
    // 가천정보가 A 대학 강의실 정보 요청 및 수신
    app.get("/A/Alecroom", async(req, res) =>  {
      //해당 메소드
      try{
        await Alecroom.getLecroom(res);
      }
      catch(error){
        const logData = {'log_result': 'error', 'log_if_table': '강의실', 'log_step': '전송시오류', 'log_err_code': 'ERS'};
        log.insertLog(logData);
        // logger.log("error","A대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 A 대학 학과 정보 요청 및 수신
    app.get("/A/Amajor", async(req, res) =>  {
      //해당 메소드
      try{
        await Amajor.getmajor(res);
      }
      catch(error){
        const logData = {'log_result': 'error', 'log_if_table': '학과', 'log_step': '전송시오류', 'log_err_code': 'ERS'};
        log.insertLog(logData);
        // logger.log("error","A대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 A 대학 교수 정보 요청 및 수신
    app.get("/A/Aprof", async(req, res) =>  {
      //해당 메소드
      try{
        await Aprof.getprof(res);
      }
      catch(error){
        const logData = {'log_result': 'error', 'log_if_table': '교수', 'log_step': '전송시오류', 'log_err_code': 'ERS'};
        log.insertLog(logData);
        // logger.log("error","A대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 A 대학 수강 정보 요청 및 수신
    app.get("/A/Aregister", async(req, res) =>  {
      //해당 메소드
      try{
        await Aregister.getregister(res);
      }
      catch(error){
        const logData = {'log_result': 'error', 'log_if_table': '수강', 'log_step': '전송시오류', 'log_err_code': 'ERS'};
        log.insertLog(logData);
        // logger.log("error","A대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 A 대학 학생 정보 요청 및 수신
    app.get("/A/Astudent", async(req, res) =>  {
      //해당 메소드
      try{
        await Astudent.getstudent(res);
      }
      catch(error){
        const logData = {'log_result': 'error', 'log_if_table': '학생', 'log_step': '전송시오류', 'log_err_code': 'ERS'};
        log.insertLog(logData);
        // logger.log("error","A대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })

    // 가천정보가 A 대학 과목 정보 요청 및 수신
    app.get("/A/Asubject", async(req, res) =>  {
      //해당 메소드
      try{
        await Asubject.getsubject(res);
      }
      catch(error){
        const logData = {'log_result': 'error', 'log_if_table': '과목', 'log_step': '전송시오류', 'log_err_code': 'ERS'};
        log.insertLog(logData);
        // logger.log("error","A대학 전송시오류 ERS");
        res.status(404);
        res.send(error);
      }
    })    
}

export default route;
