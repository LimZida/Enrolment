import logger from "../../gachon/config/logger.js";
import connection from "../config/db_config.js";
import fs from "fs";
let Cmajor={
    getmajor: (res)=>{
        console.log("");
        console.log("C대학 MAJOR table 정보");
        connection.query('select * from C_MAJOR',
                         function(err,rows){
                        if(err){
                            console.log(err);
                            logger.log("error","C대학 학과 전송시오류 ERD");
                            res.render("error",{
                                message:'connection Error'
                            });
                        }else{
                            console.log(rows);
                            console.log("C 대학의 major DB 정보를 송신합니다.");
                            console.log("====================================");
                            // 인터페이스 파일
                            fs.writeFileSync('cuniv/c.json',JSON.stringify(rows));

                            logger.log('info','C대학 학과 전송완료 -');
                            res.send(rows);
                        }
                    }
                )
    }
}

export default Cmajor;