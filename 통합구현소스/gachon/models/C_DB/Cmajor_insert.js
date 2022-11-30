import connection from "../../config/db_config.js";
import logger from "../../config/logger.js";

let Cmajor_inserted={
    insertMajor: (d)=>{
        console.log("받은 데이터:",d);

        // 코드 매핑
        // 이공계
        if(d[0].c_mcode==="001"){
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S001`);
            d[0].c_mcode="S001";
        }
        else if(d[0].c_mcode==="002"){
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S002`);
            d[0].c_mcode="S002";
        }
        else if(d[0].c_mcode==="003"){
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S003`);
            d[0].c_mcode="S003";
        }
        else if(d[0].c_mcode==="301"){
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S301`);
            d[0].c_mcode="S301";
        }
        else if(d[0].c_mcode==="302"){
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S302`);
            d[0].c_mcode="S302";
        }
        // 인문계 
        else if (d[0].c_mcode==="101") {
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S101`);
            d[0].c_mcode="S101";
        }
        else if(d[0].c_mcode==="102"){
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S102`);
            d[0].c_mcode="S102";
        }
        // 예술계
        else if(d[0].c_mcode==="201"){
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S201`);
            d[0].c_mcode="S201";
        }
        else if(d[0].c_mcode==="202"){
            console.log("");
            console.log(`코드 매핑 ${d[0].c_mcode} => S202`);
            d[0].c_mcode="S202";
        }
        else {
            logger.log("error","C대학 학과 생성시오류 ETD");
        }


        console.log("");
        console.log("Cmajor 데이터 삽입");

        // GACHON_MAJOR에 학과코드, 학과이름 삽입
        connection.query(`insert into GACHON_MAJOR values(?,?)`,[d[0].c_mcode,d[0].c_mname],
                         function(err,rows){
                        if(err){
                            logger.log('error','C대학 학과 생성시오류 ESD');
                        }else{
                            logger.log('info','C대학 학과 생성완료 -');
                            console.log("");
                            console.log(`GACHON_MAJOR에 ${d[0].c_mcode},${d[0].c_mname} 삽입 완료`);
                            console.log(`=============================================================`);
                        }
                    }
                )
    }
}

export default Cmajor_inserted;