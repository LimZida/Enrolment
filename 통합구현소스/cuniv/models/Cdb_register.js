import logger from "../../gachon/config/logger.js";
import connection from "../config/db_config.js";
import fs from "fs";
let Cregister={
    getregister: (res)=>{
        console.log("");
        console.log("C대학 REGISTER table 정보");
        connection.query('select * from C_REGISTER',
                         function(err,rows){
                        if(err){
                            console.log(err); 
                            logger.log("error","C대학 수강 전송시오류 ERD");
                            res.render("error",{
                                message:'connection Error'
                            });
                        }else{
                            console.log(rows);
                            console.log("C 대학의 register DB 정보를 송신합니다.");
                            console.log("====================================");
                            // 인터페이스 파일
                            fs.appendFile('cuniv/c.json',JSON.stringify(rows),(err)=>err?console.log(err):false);

                            logger.log('info','C대학 수강 전송완료 -');
                            res.send(rows);
                        }
                    }
                )
    }
}

export default Cregister;