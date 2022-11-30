import connection from "../../config/db_config.js";
import log from "./Log_insert.js";

let Amajor_inserted={
    insertMajor: (data)=>{
        console.log("받은 데이터:",data);
        
        
        // 코드 매핑
        for (let d of data) {
            // 이공계
            if(d.a_mcode==="001"){
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S001`);
                d.a_mcode="S001";
            }
            else if(d.a_mcode==="002"){
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S002`);
                d.a_mcode="S002";
            }
            else if(d.a_mcode==="003"){
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S003`);
                d.a_mcode="S003";
            }
            else if(d.a_mcode==="301"){
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S301`);
                d.a_mcode="S301";
            }
            else if(d.a_mcode==="302"){
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S302`);
                d.a_mcode="S302";
            }
            // 인문계 
            else if (d.a_mcode==="101") {
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S101`);
                d.a_mcode="S101";
            }
            else if(d.a_mcode==="102"){
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S102`);
                d.a_mcode="S102";
            }
            // 예술계
            else if(d.a_mcode==="201"){
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S201`);
                d.a_mcode="S201";
            }
            else if(d.a_mcode==="202"){
                console.log("");
                console.log(`코드 매핑 ${d.a_mcode} => S202`);
                d.a_mcode="S202";
            }
            else {
                const logData = {'log_result': 'error', 'log_if_table': '학과', 'log_step': '생성시오류', 'log_err_code': 'ETD'};
                log.insertLog(logData); 
            }
            
    
            console.log("");
            console.log("Amajor 데이터 삽입");
    
            // GACHON_MAJOR에 a_mcode, a_name 삽입
            connection.query(`insert into GACHON_MAJOR values(?,?)`,[d.a_mcode,d.a_name],
                             function(err,rows){
                            if(err){
                                console.log(err);
                                const logData = {'log_result': 'error', 'log_if_table': '학과', 'log_step': '생성시오류', 'log_err_code': 'ESD'};
                                log.insertLog(logData);
                            }else{
                                // logger.log('info','A대학 학과 생성완료 -');
                                console.log("");
                                console.log(`GACHON_MAJOR에 ${d.a_mcode},${d.a_name} 삽입 완료`);
                                console.log(`=============================================================`);
                                const logData = {'log_result': 'info', 'log_if_table': '학과', 'log_step': '생성완료', 'log_err_code': '-'};
                                log.insertLog(logData);
                            }
                        }
                    )
        }
    }
}

export default Amajor_inserted;