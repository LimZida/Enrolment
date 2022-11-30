import connection from "../../config/db_config.js";
import log from "./Log_insert.js";

let Alecroom_inserted={
    insertLecroom: (data)=>{
        console.log("받은 데이터:",data);
        // 코드 매핑
        for(let d of data){
        if(d.a_leccode==="M120"){
            console.log("");
            console.log(`코드 매핑 ${d.a_leccode} => P120`);
            d.a_leccode="P120";
        }
        else if(d.a_leccode==="M121"){
            console.log("");
            console.log(`코드 매핑 ${d.a_leccode} => P121`);
            d.a_leccode="P121";
        }
        else if(d.a_leccode==="M122"){
            console.log("");
            console.log(`코드 매핑 ${d.a_leccode} => P122`);
            d.a_leccode="P122";
        }
        else if(d.a_leccode==="M123"){
            console.log("");
            console.log(`코드 매핑 ${d.a_leccode} => P123`);
            d.a_leccode="P123";
        }
        else if(d.a_leccode==="M124"){
            console.log("");
            console.log(`코드 매핑 ${d.a_leccode} => P124`);
            d.a_leccode="P124";
        }
        else if(d.a_leccode==="M125"){
            console.log("");
            console.log(`코드 매핑 ${d.a_leccode} => P125`);
            d.a_leccode="P125";
        }
        else{
            const logData = {'log_result': 'error', 'log_if_table': '강의실', 'log_step': '생성시오류', 'log_err_code': 'ETD'};
            log.insertLog(logData);
        }

        console.log("");
        console.log("Alecroom 데이터 삽입");

        // DB 기본키로 넣을 일련번호 생성
        let PrimaryKey=Math.floor(Math.random()*10000);
        // error 코드 로그 기록 후 정의
        if (PrimaryKey>20000) {
            const logData = {'log_result': 'error', 'log_if_table': '강의실', 'log_step': '생성시오류', 'log_err_code': 'ESL'};
            log.insertLog(logData);
        } 

        // GACHON_CLASSROOM에 일련번호, a_leccode 삽입
        connection.query(`insert into GACHON_CLASSROOM values(?,?)`,[PrimaryKey,d.a_leccode],
                         function(err,rows){
                        if(err){
                            console.log(err);         
                            const logData = {'log_result': 'error', 'log_if_table': '강의실', 'log_step': '생성시오류', 'log_err_code': 'ESD'};
                            log.insertLog(logData);            
                        }else{
                            console.log("");
                            console.log(`GACHON_CLASSROOM에 ${PrimaryKey},${d.a_leccode} 삽입 완료`);
                            console.log(`=============================================================`);
                            const logData = {'log_result': 'info', 'log_if_table': '강의실', 'log_step': '생성완료', 'log_err_code': '-'};
                            log.insertLog(logData);  
                        }
                    }
                )
            
        }
    }
}

export default Alecroom_inserted;