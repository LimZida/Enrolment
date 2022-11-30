import connection from "../../config/db_config.js";

let Log_insert={
    insertLog: (data, func)=>{
        console.log("받은 데이터:",data);
        
        // DB 기본키로 넣을 일련번호(log_id) 생성
        data.log_id = Math.floor(Math.random()*10000);
        // GACHON_CLASSROOM에 일련번호, a_leccode 삽입
        connection.query(`insert into LOG values(?, NOW(), ?, ?, ?, ?)`,
                        [data.log_id, data.log_result, data.log_if_table, data.log_step, data.log_err_code],
                        function(err,rows) {
                            if(err){
                                console.log(err); 
                                if (func!==undefined)
                                    func();
                            }else{
                                console.log(`Log에 ${data} 삽입 완료`);
                                console.log(`=============================================================`);
                                if (func!==undefined)
                                    func();
                            }
                        });
            
    }
}

export default Log_insert;