import connection from "../../config/db_config.js";
import log from "./Log_insert.js";

let Aprof_inserted={
    insertprof: (data)=>{
        console.log("받은 데이터:",data);

        for(let d of data){
        console.log("");
        console.log("Aprof 데이터 삽입");

        // DB 기본키로 넣을 일련번호 생성
        let PrimaryKey=Math.floor(Math.random()*10000);
        // error 코드 로그 기록 후 정의
        if (PrimaryKey>20000) {
            const logData = {'log_result': 'error', 'log_if_table': '교수', 'log_step': '생성시오류', 'log_err_code': 'ESL'};
            log.insertLog(logData);
        } 

        // GACHON_PROFESSOR에 PK, a_pnum 삽입
        connection.query(`insert into GACHON_PROFESSOR values(?,?)`,[PrimaryKey,d.a_pnema],
                         function(err,rows){
                        if(err){
                            console.log(err);
                            const logData = {'log_result': 'error', 'log_if_table': '교수', 'log_step': '생성시오류', 'log_err_code': 'ESD'};
                            log.insertLog(logData);
                        }else{
                            console.log("");
                            console.log(`GACHON_PROFESSOR에 ${PrimaryKey},${d.a_pnema} 완료`);
                            console.log(`=============================================================`);
                            const logData = {'log_result': 'info', 'log_if_table': '교수', 'log_step': '생성완료', 'log_err_code': '-'};
                            log.insertLog(logData);
                        }
                    }
                )

        }
    }
}

export default Aprof_inserted;