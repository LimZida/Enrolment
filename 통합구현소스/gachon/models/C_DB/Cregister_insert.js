import connection from "../../config/db_config.js";
import logger from "../../config/logger.js";

let Cregister_inserted={
    insertregister: (data)=>{
        console.log("받은 데이터:",data);

        for(let d of data){
        // 코드 매핑
        if(d.C_SCODE==="0000000001"){
            console.log("");
            console.log(`코드 매핑 ${d.C_SCODE} => N01`);
            d.C_SCODE="N01";
        }
        else if(d.C_SCODE==="0000000002"){
            console.log("");
            console.log(`코드 매핑 ${d.C_SCODE} => N02`);
            d.C_SCODE="N02";
        }
        else if(d.C_SCODE==="0000000003"){
            console.log("");
            console.log(`코드 매핑 ${d.C_SCODE} => N03`);
            d.C_SCODE="N03";
        }
        else if(d.C_SCODE==="0000000004"){
            console.log("");
            console.log(`코드 매핑 ${d.C_SCODE} => N04`);
            d.C_SCODE="N04";
        }
        else if(d.C_SCODE==="0000000005"){
            console.log("");
            console.log(`코드 매핑 ${d.C_SCODE} => N05`);
            d.C_SCODE="N05";
        }
        else if(d.C_SCODE==="0000000006"){
            console.log("");
            console.log(`코드 매핑 ${d.C_SCODE} => N06`);
            d.C_SCODE="N06";
        }    
        else{
            logger.log("error","C대학 강의실 생성시오류 ETD");
        }

        console.log("");
        console.log("Cregister 데이터 삽입");

        // DB 기본키로 넣을 일련번호 생성
        let PrimaryKey1=Math.floor(Math.random()*10000);
        // error 코드 로그 기록 후 정의
        PrimaryKey1>20000?logger.log("error","C대학 생성시오류 ESL"):PrimaryKey1;

        // GACHON_CLASSROOM에 일련번호, 강의실명 삽입
        connection.query(`insert into GACHON_CLASSROOM values(?,?)`,[PrimaryKey1,d.c_lecnum],
                         function(err,rows){
                        if(err){
                            console.log(err);
                            logger.log('error','C대학 강의실 생성시오류 ESD');
                        }else{
                            logger.log('info','C대학 강의실 생성완료 -');
                            console.log("");
                            console.log(`GACHON_CLASSROOM에 ${PrimaryKey1},${d.c_lecnum} 삽입 완료`);
                            console.log(`=============================================================`);
                            // DB 기본키로 넣을 일련번호 생성
                            let PrimaryKey2=Math.floor(Math.random()*10000);
                            // error 코드 로그 기록 후 정의
                            PrimaryKey2>20000?logger.log("error","C대학 생성시오류 ESL"):PrimaryKey2;
                    
                            // GACHON_PROFESSOR에 일련번호, 교수명 삽입    
                            return connection.query(`insert into GACHON_PROFESSOR values(?,?)`,[PrimaryKey2,d.c_prof],
                                            function(err,rows){
                                            if(err){
                                                console.log(err);
                                                logger.log('error','C대학 교수 생성시오류 ESD');
                                            }else{
                                                logger.log('info','C대학 교수 생성완료 -');
                                                console.log("");
                                                console.log(`GACHON_PROFESSOR에 ${PrimaryKey2},${d.c_prof} 삽입 완료`);
                                                console.log(`=============================================================`);
                                                // 가천정보 교과목테이블에 일련번호, 교과목명, 수강시간, 수강요일, 외래키 삽입
                                                return connection.query(`select classroom_id from GACHON_CLASSROOM where lecture_name=?`,[d.c_lecnum],
                                                    (err,rows)=>{
                                                        if(err){
                                                            console.log(err);
                                                        }
                                                        else{
                                                            let classroom_id=rows[0].classroom_id;
                                                            return connection.query(`select prof_id from GACHON_PROFESSOR where prof_name=?`,[d.c_prof],
                                                            (err,rows)=>{
                                                                if(err){
                                                                    console.log(err);
                                                                }
                                                                else{
                                                                   let prof_id=rows[0].prof_id;
                                        
                                                                    // DB 기본키로 넣을 일련번호 생성
                                                                    let PrimaryKey3=Math.floor(Math.random()*10000);
                                                                    // error 코드 로그 기록 후 정의
                                                                    PrimaryKey3>20000?logger.log("error","C대학 생성시오류 ESL"):PrimaryKey3;
                                        
                                                                    // 가천정보 교과목 테이블에 일련번호, 교과목명, 수강시간, 수강요일, 강의실 일련번호, 교수 일련번호 삽입
                                                                   connection.query(`insert into GACHON_LECTURE values(?,?,?,?,?,?)`,
                                                                   [PrimaryKey3,d.C_SCODE,d.c_rday,d.c_period,classroom_id,prof_id],
                                                                            function(err,rows){
                                                                                   if(err){
                                                                                       console.log(err);
                                                                                       logger.log('error','C대학 과목 생성시오류 ESD');
                                                                                   }else{
                                                                                       logger.log('info','C대학 과목 생성완료 -');
                                                                                       console.log("");
                                                                                       console.log("");
                                                                                       console.log(`GACHON_LECTURE에 ${PrimaryKey3},${d.C_SCODE},${d.c_period},${d.c_rday} 삽입 완료`);
                                                                                       console.log(`=============================================================`);
                                                                                       // 가천정보 수강테이블 외래키에 넣을 학적 일련번호 가져오기
                                                                                       return connection.query(`select std_seq from GACHON_STD where std_no=?`,[d.c_snum], 
                                                                                       function(err,rows){
                                                                                           if(err){
                                                                                               return console.log(err);
                                                                                           }else{
                                                                                                   let std_seq=rows[0].std_seq;
                                                                                                   // DB 기본키로 넣을 일련번호 생성
                                                                                                    let PrimaryKey4=Math.floor(Math.random()*10000);
                                                                                                    // error 코드 로그 기록 후 정의
                                                                                                    PrimaryKey4>20000?logger.log("error","C대학 생성시오류 ESL"):PrimaryKey4;
                                                                                                    // 가천정보 수강테이블에서 일련번호, 수강번호, 교과목 일련번호, 학적 일련번호 삽입
                                                                                                   return connection.query(`insert into GACHON_CLASS values(?,?,?,?)`,
                                                                                                                       [PrimaryKey4,d.c_rnum,PrimaryKey3,std_seq],
                                                                                                                               function(err,rows){
                                                                                                                           if(err){
                                                                                                                               console.log(err);
                                                                                                                           }else{
                                                                                                                               console.log("");
                                                                                                                               console.log("");
                                                                                                                               console.log(`GACHON_CLASS에 ${PrimaryKey4},${d.c_rnum},${PrimaryKey3},${std_seq}, 삽입 완료`);
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
                                            }
                                        }
                                    )
                        }
                    }
                )

        }


            
    }
}

export default Cregister_inserted;