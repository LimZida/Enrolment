import connection from "../../config/db_config.js";

let Gmajor_selected={
    selectmajor: (data, func)=>{        
        // GACHON_MEMBER 테이블에서 사용자가 입력한 아이디를 활용해 비밀번호와 학적 일련번호 조회
        connection.query(`select m_code, m_name FROM GACHON_MAJOR WHERE m_code=?`,
                        [data],
                        function(err,rows){
                            if(err){
                                console.log(err);
                                res.send({
                                    message:'connection Error'
                                });
                            }else{
                                if (rows[0]===undefined) {
                                    func(undefined);
                                } else {
                                    func(JSON.stringify(rows[0]));
                                }
                            }
                    }
                )
    }
}

export default Gmajor_selected;