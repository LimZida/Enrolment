import logger from "../../gachon/config/logger.js";
import connection from "../config/db_config.js";
import fs from "fs";
let Bregister={
    getregister: (res)=>{
        console.log("");
        console.log("B대학 REGISTER table 정보");
        connection.query('select * from B_REGISTER',
                         function(err,rows){
                        if(err){       
                            console.log(err);
                            logger.log("error","B대학 수강 전송시오류 ERD");
                            res.render("error",{
                                message:'connection Error'
                            });
                        }else{
                            console.log(rows);
                            console.log("B 대학의 register DB 정보를 송신합니다.");
                            console.log("====================================");
                            logger.log('info','B대학 수강 전송완료 -');
                            // 인터페이스 파일
                            fs.appendFile('buniv/b.json',JSON.stringify(rows),(err)=>err?console.log(err):false);

                            res.send(rows);
                        }
                    }
                )
    }
}

export default Bregister;