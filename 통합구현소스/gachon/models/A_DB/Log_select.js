import connection from "../../config/db_config.js";

let Log_select={
    selectLog: (data, func)=>{
        console.log("받은 데이터:",data);
        
        // GACHON_CLASSROOM에 일련번호, a_leccode 삽입
        connection.query(`SELECT date_format(log_date, '%Y-%m-%d') as log_date, IF(log_result='info', '성공', '실패') as log_result, log_if_table, log_step, log_err_code FROM LOG WHERE log_date BETWEEN ? AND ? AND log_result=? AND log_if_table=? AND log_step=?`,
                        [data.start_date, data.end_date, data.log_result, data.log_if_table, data.log_step],
                        function(err,rows) {
                            if(err){
                                console.log(err); 
                                if (func!==undefined)
                                    func(rows);
                            }else{
                                console.log(`=============================================================`);
                                for (const row of rows) {
                                    console.log(`row: ${row}`);
                                }
                                console.log(`=============================================================`);
                                if (func!==undefined)
                                    func(rows);
                            }
                        });
            
    }
}

export default Log_select;