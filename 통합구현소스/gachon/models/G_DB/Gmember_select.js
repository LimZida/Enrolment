import connection from "../../config/db_config.js";
import logger from "../../config/logger.js";
// import encrypt from "../../util/encrypt.js";


let Gmember_selected={
    selectmember: (data, func)=>{        
        // GACHON_MEMBER 테이블에서 사용자가 입력한 아이디를 활용해 비밀번호와 학적 일련번호 조회
        connection.query(`select member_pw, member_seq_no FROM GACHON_MEMBER WHERE member_id=?`,
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

export default Gmember_selected;