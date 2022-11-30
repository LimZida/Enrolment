import connection from "../config/db_config.js";
import log from "../../gachon/models/A_DB/Log_insert.js";
import fs from "fs";
let Aprof={
    getprof: (res)=>{
        console.log("");
        console.log("A대학 prof table 정보");
        connection.query('select * from A_PROF',
                         function(err,rows){
                        if(err){
                            console.log(err);

                            const logData = {'log_result': 'error', 'log_if_table': '교수', 'log_step': '전송시오류', 'log_err_code': 'ERD'};
                            log.insertLog(logData, function() {
                                res.render("error",{
                                    message:'connection Error'
                                });
                            });
                        }else{
                            console.log(rows);
                            console.log("A 대학의 prof DB 정보를 송신합니다.");
                            console.log("====================================");
                            // 인터페이스 파일
                            fs.appendFile('auniv/a.json',JSON.stringify(rows),(err)=>err?console.log(err):false);

                            const logData = {'log_result': 'info', 'log_if_table': '교수', 'log_step': '전송완료', 'log_err_code': '-'};
                            log.insertLog(logData, function() {
                                res.send(rows);
                            });
                        }
                    }
                )
    }
}

export default Aprof;