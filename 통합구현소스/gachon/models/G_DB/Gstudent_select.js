import connection from "../../config/db_config.js";
import logger from "../../config/logger.js";
// import encrypt from "../../util/encrypt.js";

let Gstudent_selected={
    selectstudent: (data, func)=>{        
        // 학적 일련번호로 GACHON_STD 의 일련번호, 학생 이름, 학생 대학, 학생 학과, 학번 조회
        connection.query(`select std_seq, std_name, std_unive, std_dept, std_no FROM GACHON_STD WHERE std_seq=?`,
                        [data],
                        function(err,rows){
                            if(err){
                                console.log(err);
                                res.send({
                                    message:'connection Error'
                                });
                            }else{
                                if (rows[0]===undefined) {
                                    func('fail');
                                } else {
                                    func(JSON.stringify(rows[0]));
                                }
                                
                            }
                    }
                )
    }
}

export default Gstudent_selected;