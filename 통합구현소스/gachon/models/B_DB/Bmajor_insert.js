import connection from "../../config/db_config.js";
import logger from "../../config/logger.js";

let Bmajor_inserted={
    insertMajor: (data, func)=>{
        console.log("받은 데이터:",data);

        // let deptCode = "";
        // let deptName = "";

        // if(data[0].b_sname==="IT-01"||data[0].b_sname==="IT-02" ||data[0].b_sname==="IT-03"){
        //     console.log("");
        //     console.log(`코드 매핑 ${data[0].b_sname} => B-IT`);
        //     deptCode = "B-IT"
        //     deptName = "IT융합대학"
        // }
        // else if(data[0].b_sname==="SS-01"||data[0].b_sname==="SS-02" ||data[0].b_sname==="SS-03"){
        //     console.log("");
        //     console.log(`코드 매핑 ${data[0].b_sname} => B-SS`);
        //     deptCode = "B-SS"
        //     deptName = "사회과학대학"
        // }
        // else{
        //     logger.log("error","B대학 학과 생성시오류 ETD");
        // }


        console.log("");
        console.log("Bmajor 데이터 삽입");

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
                    }
                )
    }
}

export default Bmajor_inserted;