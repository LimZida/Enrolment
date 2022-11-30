import connection from "../../config/db_config.js";
import logger from "../../config/logger.js";
import Gmajor_selected from "../G_DB/Gmajor_select.js";

let Bstudent_inserted={
    insertstudent: (std)=>{
        console.log("받은 데이터:",std);

        let deptCode = '';
        let deptName = '';
        // 코드 매핑
        if(std[0].b_sname==="IT-01"){
            console.log("");
            console.log(`코드 매핑 ${std[0].b_sname} => IT01`);
            deptCode = "IT01"
            deptName = "컴퓨터공학과"
        }
        else if(std[0].b_sname==="IT-02"){
            console.log("");
            console.log(`코드 매핑 ${std[0].b_sname} => IT02`);
            deptCode = "IT02"
            deptName = "전자공학과"
        }
        else if(std[0].b_sname==="IT-03"){
            console.log("");
            console.log(`코드 매핑 ${std[0].b_sname} => IT03`);
            deptCode = "IT03"
            deptName = "소프트웨어과"
        }
        else if(std[0].b_sname==="SS-01"){
            console.log("");
            console.log(`코드 매핑 ${std[0].b_sname} => SS01`);
            deptCode = "SS01"
            deptName = "사회복지학과"
        }
        else if(std[0].b_sname==="SS-02"){
            console.log("");
            console.log(`코드 매핑 ${std[0].b_sname} => SS02`);
            deptCode = "SS02"
            deptName = "경제학과"
        }
        else if(std[0].b_sname==="SS-03"){
            console.log("");
            console.log(`코드 매핑 ${std[0].b_sname} => SS03`);
            deptCode = "SS03"
            deptName = "유아교육학과"
        }   
        else{
            logger.log("error","B대학 학과 생성시오류 ETD");
        }


        console.log("");
        console.log("GACHON_MAJOR 데이터 조회")
        Gmajor_selected.selectmajor(deptCode, function(data) {
            if (data===undefined) { //조회 시 데이터가 없을 경우 GACHON_MAJOR 테이블에 학과 코드 추가
                // GACHON_MAJOR에 a_mcode, a_name 삽입
                connection.query(`insert into GACHON_MAJOR values(?,?)`,[deptCode, deptName],
                function(err,rows){
                    if(err){
                        console.log(err);
                        logger.log('error','B대학 학과 생성시오류 ESD');
                    }else{
                        logger.log('info','B대학 학과 생성완료 -');
                        console.log("");
                        console.log(`GACHON_MAJOR에 ${deptCode},${deptName} 삽입 완료`);
                        console.log(`=============================================================`);
                    }
                });
            }

            console.log("");
            console.log("Bstudent 데이터 삽입");

            // DB 기본키로 넣을 일련번호 생성
            let PrimaryKey=Math.floor(Math.random()*10000);
            // error 코드 로그 기록 후 정의
            PrimaryKey>20000?logger.log("error","B대학 생성시오류 ESL"):PrimaryKey;

            // GACHON_STD에 이름, 대학명, 학과, 학번,일련번호 삽입
            connection.query(`insert into GACHON_STD values(?,?,?,?,?)`, 
                            [std[0].b_name,'B',deptCode,std[0].b_snum,PrimaryKey],
                            function(err,rows) {
                                if(err){
                                    console.log(err);
                                    logger.log('error','B대학 학생 생성시오류 ESD');
                                }else{
                                    logger.log('info','B대학 학생 생성완료 -');
                                    console.log("");
                                    console.log(`GACHON_STD ${std[0].b_name},'B',${deptCode},${std[0].b_snum},${PrimaryKey} 삽입 완료`);
                                    console.log(`=============================================================`);
                                }
                            }
                    )
        })
    }
}

export default Bstudent_inserted;