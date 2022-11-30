import connection from "../../config/db_config.js";
import logger from "../../config/logger.js";

let Cstudent_inserted={
    insertstudent: (data)=>{
        console.log("받은 데이터:",data);

        for (let d of data) {
            // 코드 매핑
            if(d.c_scode==="001"){
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S001`);
                d.c_scode="S001";
            }
            else if(d.c_scode==="002"){
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S002`);
                d.c_scode="S002";
            }
            else if(d.c_scode==="003"){
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S003`);
                d.c_scode="S003";
            }
            else if(d.c_scode==="301"){
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S301`);
                d.c_scode="S301";
            }
            else if(d.c_scode==="302"){
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S302`);
                d.c_scode="S302";
            }
            // 인문계 
            else if (d.c_scode==="101") {
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S101`);
                d.c_scode="S101";
            }
            else if(d.c_scode==="102"){
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S102`);
                d.c_scode="S102";
            }
            // 예술계
            else if(d.c_scode==="201"){
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S201`);
                d.c_scode="S201";
            }
            else if(d.c_scode==="202"){
                console.log("");
                console.log(`코드 매핑 ${d.c_scode} => S202`);
                d.c_scode="S202";
            }
            else{
                logger.log("error","C대학 학과 생성시오류 ETD");
            }

            console.log("");
            console.log("Cstudent 데이터 삽입");
            // DB 기본키로 넣을 일련번호 생성
            let PrimaryKey=Math.floor(Math.random()*10000);
            // error 코드 로그 기록 후 정의
            PrimaryKey>20000?logger.log("error","C대학 생성시오류 ESL"):PrimaryKey;         
            // GACHON_STD에 이름, 대학명, 학과, 학번, 일련번호 삽입
            connection.query(`insert into GACHON_STD values(?,?,?,?,?)`
                            ,[d.c_name, 'C', d.c_scode, d.c_snum, PrimaryKey],
                            function(err,rows){
                            if(err){
                                console.log(err);
                                logger.log('error','C대학 학생 생성시오류 ESD');
                            }else{
                                logger.log('info','C대학 학생 생성완료 -');
                                console.log("");
                                console.log(`GACHON_CLASSROOM에 ${d.c_name}, 'C', ${d.c_scode}, ${d.c_snum}, ${PrimaryKey} 삽입 완료`);
                                console.log(`=============================================================`);
                            }
                        }
                    )
        }
    }
}

export default Cstudent_inserted;