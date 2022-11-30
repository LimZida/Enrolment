import connection from "../../config/db_config.js";
import log from "./Log_insert.js";

let Aregister_inserted={

    insertregister: (data)=>{
        console.log("받은 데이터:",data);

        for(let d of data){
        // 49번째 줄 where절에 사용할 매핑되기 전의 A대학 수강테이블의 교과목 코드
        let a_rcode=d.a_rcode;
        // 코드 매핑
        if(d.a_rcode==="0010001"){
            console.log("");
            console.log(`코드 매핑 ${d.a_rcode} => N0101`);
            d.a_rcode="N0101";
        }
        else if(d.a_rcode==="0010002"){
            console.log("");
            console.log(`코드 매핑 ${d.a_rcode} => N0102`);
            d.a_rcode="N0102";
        }
        else if(d.a_rcode==="0010003"){
            console.log("");
            console.log(`코드 매핑 ${d.a_rcode} => N0103`);
            d.a_rcode="N0103";
        }
        else if(d.a_rcode==="0010004"){
            console.log("");
            console.log(`코드 매핑 ${d.a_rcode} => N0104`);
            d.a_rcode="N0104";
        }
        else if(d.a_rcode==="0020001"){
            console.log("");
            console.log(`코드 매핑 ${d.a_rcode} => N0201`);
            d.a_rcode="N0201";
        }
        else if(d.a_rcode==="0020002"){
            console.log("");
            console.log(`코드 매핑 ${d.a_rcode} => N0202`);
            d.a_rcode="N0202";
        }
        else{
            const logData = {'log_result': 'error', 'log_if_table': '수강', 'log_step': '생성시오류', 'log_err_code': 'ETD'};
            log.insertLog(logData);
        }

        console.log("");
        console.log("Aregister 데이터 삽입");

        // GACHON_lecture 외래키에 넣기 위해 A대학의 강의실 테이블에서 강의실 일련번호 가져오기
        connection.query(`select a_leccode from A_LECROOM where a_leccode=?`,[d.a_room], 
        function(err,rows1){
            if(err){
                return console.log(err);
            }else{
                // 강의실 테이블의 일련번호를 통해 가천 정보 교과목 테이블의 일련번호를 가져오기 위해 다시 코드 매핑
                if(rows1[0].a_leccode==="M120"){
                    console.log("");
                    console.log(`코드 매핑 ${rows1[0].a_leccode} => P120`);
                    rows1[0].a_leccode="P120";
                }
                else if(rows1[0].a_leccode==="M121"){
                    console.log("");
                    console.log(`코드 매핑 ${rows1[0].a_leccode} => P121`);
                    rows1[0].a_leccode="P121";
                }
                else if(rows1[0].a_leccode==="M122"){
                    console.log("");
                    console.log(`코드 매핑 ${rows1[0].a_leccode} => P122`);
                    rows1[0].a_leccode="P122";
                }
                else if(rows1[0].a_leccode==="M123"){
                    console.log("");
                    console.log(`코드 매핑 ${rows1[0].a_leccode} => P123`);
                    rows1[0].a_leccode="P123";
                }
                else if(rows1[0].a_leccode==="M124"){
                    console.log("");
                    console.log(`코드 매핑 ${rows1[0].a_leccode} => P124`);
                    rows1[0].a_leccode="P124";
                }
                else if (rows1[0].a_leccode==="M125") {
                    console.log("");
                    console.log(`코드 매핑 ${rows1[0].a_leccode} => P125`);
                    rows1[0].a_leccode="P125";
                }
                let classroom_id=rows1[0].a_leccode;
                // 가천 정보 교과목 테이블에 넣을 강의실 테이블의 일련번호 얻는 쿼리문
                return connection.query(`select classroom_id from GACHON_CLASSROOM where lecture_name=?`,[classroom_id],
                (err,rows)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        let inserted_classroom_id=rows[0].classroom_id;
                        // 가천정보 교과목 테이블에 외래키로 넣을 교수 일련번호 가져오기
                        // A대학 과목테이블에서 해당 교수 일련번호 가져오기
                        return connection.query(`select a_pcode from A_SUBJECT where a_scode=?`,[a_rcode], 
                            function(err,rows2){
                                if(err){
                                    return console.log(err);
                                }else{
                                    let prof_id=rows2[0].a_pcode;
                                    // 교수 일련번호로 교수 이름을 얻는 쿼리
                                    return connection.query(`select a_pnema from A_PROF where a_pnum=?`,[prof_id],
                                    (err,rows)=>{
                                        if(err){

                                        }
                                        else{
                                        let prof_name=rows[0].a_pnema;
                                        // 교수 이름을 얻어 가천정보 교수 테이블에서 일련번호 얻는 쿼리
                                        return connection.query(`select prof_id from GACHON_PROFESSOR where prof_name=?`,[prof_name],
                                            (err,rows)=>{
                                                if(err){
                                                    console.log(err);
                                                }
                                                else{
                                                    // DB 기본키로 넣을 일련번호 생성
                                                    let PrimaryKey1=Math.floor(Math.random()*10000);
                                                    // error 코드 로그 기록 후 정의
                                                    if (PrimaryKey1>20000) {
                                                        const logData = {'log_result': 'error', 'log_if_table': '교과목', 'log_step': '생성시오류', 'log_err_code': 'ESL'};
                                                        log.insertLog(logData);
                                                    }

                                                    let inserted_prof_id=rows[0].prof_id;
                                                    return connection.query(`insert into GACHON_LECTURE values(?,?,?,?,?,?)`,
                                                        [PrimaryKey1, d.a_rcode, d.a_rday, d.a_period, inserted_classroom_id, inserted_prof_id],
                                                            function(err,rows){
                                                                if(err){
                                                                    console.log(err);
                                                                    const logData = {'log_result': 'error', 'log_if_table': '교과목', 'log_step': '생성시오류', 'log_err_code': 'ESD'};
                                                                    log.insertLog(logData);
                                                                }else{
                                                                    console.log("");
                                                                    console.log(`GACHON_LECTURE에 ${PrimaryKey1}, ${d.a_rcode},${d.a_rday} ,${d.a_period},${inserted_classroom_id},${inserted_prof_id}, 삽입 완료`);
                                                                    
                                                                    const logData = {'log_result': 'info', 'log_if_table': '교과목', 'log_step': '생성완료', 'log_err_code': '-'};
                                                                    log.insertLog(logData);

                                                                    // 가천정보 수강테이블 외래키에 넣을 학적 일련번호 가져오기
                                                                    return connection.query(`select std_seq from GACHON_STD WHERE std_no=?`, 
                                                                        [d.a_snum], 
                                                                        function(err,rows){
                                                                            if(err){
                                                                                return console.log(err);
                                                                            }else{
                                                                                
                                                                                let GACHON_LECTURE_sequence=PrimaryKey1
                                                                                // DB 기본키로 넣을 일련번호 생성
                                                                                let PrimaryKey2=Math.floor(Math.random()*10000);
                                                                                if (PrimaryKey2>20000) {
                                                                                    const logData = {'log_result': 'error', 'log_if_table': '수강', 'log_step': '생성시오류', 'log_err_code': 'ESL'};
                                                                                    log.insertLog(logData);
                                                                                }
                                                                            
                                                                                let std_seq=rows[0].std_seq;
                                                                                // 가천정보 수강테이블 에 일련번호, a_rnum, 교과목 일련번호,학적 일련번호 삽입
                                                                                return connection.query(`insert into GACHON_CLASS values(?,?,?,?)`,
                                                                                [PrimaryKey2,d.a_rnum,GACHON_LECTURE_sequence,std_seq],
                                                                                    function(err,rows){
                                                                                        if(err){
                                                                                            console.log(err);

                                                                                            const logData = {'log_result': 'error', 'log_if_table': '수강', 'log_step': '생성시오류', 'log_err_code': 'ESD'};
                                                                                            log.insertLog(logData);
                                                                                        }else{
                                                                                            console.log("");
                                                                                            console.log(`GACHON_CLASS에 ${PrimaryKey2},${d.a_rnum},${GACHON_LECTURE_sequence},${std_seq} 삽입 완료`);
                                                                                            console.log(`=============================================================`);

                                                                                            const logData = {'log_result': 'info', 'log_if_table': '수강', 'log_step': '생성완료', 'log_err_code': '-'};
                                                                                            log.insertLog(logData);
                                                                                        }
                                                                                    }
                                                                                ) 
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            }
                                                    )    
                                                }
                                            })    
                                        }                                               
                                    })
                                    // 가천정보 교과목테이블에 일련번호, a_rcode, a_period , a_rday, 외래키 삽입
                                }
                            }
                        )
                    }
                })
            }

            }
            )
    }
             


        
                 

    }
}

export default Aregister_inserted;