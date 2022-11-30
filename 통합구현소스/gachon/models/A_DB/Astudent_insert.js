import connection from "../../config/db_config.js";
import log from "./Log_insert.js";

let Astudent_inserted={
    insertstudent: (data)=>{
        console.log("받은 데이터:",data);
        
        // 코드 매핑
         // 이공계
            if(data[0].a_scode==="001"){
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S001`);
                data[0].a_scode="S001";
            }
            else if(data[0].a_scode==="002"){
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S002`);
                data[0].a_scode="S002";
            }
            else if(data[0].a_scode==="003"){
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S003`);
                data[0].a_scode="S003";
            }
            else if(data[0].a_scode==="301"){
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S301`);
                data[0].a_scode="S301";
            }
            else if(data[0].a_scode==="302"){
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S302`);
                data[0].a_scode="S302";
            }
            // 인문계 
            else if (data[0].a_scode==="101") {
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S101`);
                data[0].a_scode="S101";
            }
            else if(data[0].a_scode==="102"){
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S102`);
                data[0].a_scode="S102";
            }
            // 예술계
            else if(data[0].a_scode==="201"){
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S201`);
                data[0].a_scode="S201";
            }
            else if(data[0].a_scode==="202"){
                console.log("");
                console.log(`코드 매핑 ${data[0].a_scode} => S202`);
                data[0].a_scode="S202";
            }
            else {
                const logData = {'log_result': 'error', 'log_if_table': '학생', 'log_step': '생성시오류', 'log_err_code': 'ETD'};
                log.insertLog(logData);
            }

        console.log("");
        console.log("Astudent 데이터 삽입");
        // DB 기본키로 넣을 일련번호 생성
        let PrimaryKey=Math.floor(Math.random()*10000);
        // error 코드 로그 기록 후 정의
        if (PrimaryKey>20000) {
            const logData = {'log_result': 'error', 'log_if_table': '학생', 'log_step': '생성시오류', 'log_err_code': 'ESL'};
            log.insertLog(logData);
        }

        // GACHON_STD에 이름, 대학명, 학과코드, 학번, 일련번호 삽입
        connection.query(`insert into GACHON_STD values(?,?,?,?,?)`,
        [data[0].a_name,'A',data[0].a_scode,data[0].a_snum,PrimaryKey],
                         function(err,rows){
                        if(err){
                            console.log(err);

                            const logData = {'log_result': 'error', 'log_if_table': '학생', 'log_step': '생성시오류', 'log_err_code': 'ESD'};
                            log.insertLog(logData);
                        }else{
                            console.log("");
                            console.log(`GACHON_STD에 ${data[0].a_name},'A',${data[0].a_scode},${data[0].a_snum},${PrimaryKey} 삽입 완료`);
                            console.log(`=============================================================`);

                            const logData = {'log_result': 'info', 'log_if_table': '학생', 'log_step': '생성완료', 'log_err_code': '-'};
                            log.insertLog(logData);
                        }
                    }
                )
    }
}

export default Astudent_inserted;