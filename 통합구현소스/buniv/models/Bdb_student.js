import logger from "../../gachon/config/logger.js";
import connection from "../config/db_config.js";
import fs from "fs";

let Bstudent={
    getstudent: (res)=>{
        console.log("");
        console.log("B대학 STUDENT table 정보");
        connection.query('select * from B_STUDENT',
                         function(err,rows){
                        if(err){
                            console.log(err);
                            logger.log("error","B대학 학생 전송시오류 ERD");
                            res.render("error",{
                                message:'connection Error'
                            });
                        }else{
                            console.log(rows);
                            console.log("B 대학의 student DB 정보를 송신합니다.");
                            console.log("====================================");
                            logger.log('info','B대학 학생 전송완료 -');
                            // 인터페이스 파일
                            fs.writeFileSync('buniv/b.json',JSON.stringify(rows));

                            res.send(rows);
                        }
                    }
                )
    }
}

export default Bstudent;