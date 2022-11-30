import connection from "../config/db_config.js";
import log from "../../gachon/models/A_DB/Log_insert.js";
import fs from "fs";

let Alecroom={
    getLecroom: (res)=>{
        console.log("");
        console.log("A대학 LECROOM table 정보");
        connection.query('select * from A_LECROOM',
                         function(err,rows){
                        if(err){
                            console.log(err);

                            const logData = {'log_result': 'error', 'log_if_table': '강의실', 'log_step': '전송시오류', 'log_err_code': 'ERD'};
                            log.insertLog(logData, function() {
                                res.render("error",{
                                    message:'connection Error'
                                });
                            });
                        }else{
                            console.log(rows);
                            console.log("A 대학의 Lecroom DB 정보를 송신합니다.");
                            console.log("====================================");
                            // 인터페이스 파일
                            fs.writeFileSync('auniv/a.json',JSON.stringify(rows));

                            const logData = {'log_result': 'info', 'log_if_table': '강의실', 'log_step': '전송완료', 'log_err_code': '-'};
                            log.insertLog(logData, function() {
                                res.send(rows);
                            });
                        }
                    }
                )
    }
}

export default Alecroom;