import connection from "../config/db_config.js";
import decrypt from "../util/decrypt.js";
import encrypt2 from "../util/encrypt2.js";

let signup={
    comparesignup: (body,res)=>{
        // 회원가입때 받은 body 데이터와 대학명, 학번을 통해 정보가 맞는지 대조   
            let univName='';
        
            // 어떤 학교인지 확인
            univName=body.univ;
            console.log(`회원가입을 진행하기 위해 ${univName} DB에 접근합니다`);


            // 학번 대조                 
            connection.query(`select ${univName.toLowerCase()}_snum from ${univName}_STUDENT`,
            (err,rows)=>{
                console.log(rows);
                if(err){
                    console.log(err);
                }
                else{
                    // A대학이면서, 해당 학번이 존재하면
                    if(univName==='A'&&body.snum===decrypt('A',rows[0].a_snum)){  
                        // 가천 정보 학적테이블에서 해당 학번의 일련번호 받아오기
                        const encryptedSnum = encrypt2('A', body.snum);
                        return connection.query(`select std_seq from GACHON_STD where std_no=?`,[encryptedSnum],
                        (err,rows)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("body.snum=,",body.snum);
                                console.log("rows",rows);
                                let std_seq=rows[0].std_seq;
                                // 회원가입 멤버에 아이디, 패스워드, 받아온 학적 일련번호 삽입
                                return connection.query(`insert into GACHON_MEMBER values(?,?,?)`,[body.id,encrypt2('G',body.password),std_seq],
                                (err,rows)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log("");
                                        console.log(`A대학 학번, 이름 정보 대조 후 회원 가입 테이블에 ${body.id},${body.password},${std_seq} 삽입 완료`);
                                        res.redirect("/");                                
                                    }
                                })
                            }
                        })
                    }
                    else if(univName==='B'&&body.snum===decrypt('B',rows[0].b_snum)){     
                        const encryptedSnum = encrypt2('B', body.snum);
                        console.log(`encryptedSnum: ${encryptedSnum}`);
                        // 가천 정보 학적테이블에서 해당 학번의 일련번호 받아오기              
                        return connection.query(`select std_seq from GACHON_STD where std_no=?`,[encryptedSnum],
                        (err,rows)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                let std_seq=rows[0].std_seq;
                                // 회원가입 멤버에 아이디, 패스워드, 받아온 학적 일련번호 삽입
                                return connection.query(`insert into GACHON_MEMBER values(?,?,?)`,[body.id,encrypt2('G',body.password),std_seq],
                                (err,rows)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log("");
                                        console.log(`B대학 학번, 이름 정보 대조 후 회원 가입 테이블에 ${body.id},${body.password},${std_seq} 삽입 완료`);
                                        res.redirect("/");                                
                                    }
                                })
                            }
                        })
                    }
                    else if(univName==='C'&&body.snum===decrypt('C',rows[0].c_snum)){ 
                        // 가천 정보 학적테이블에서 해당 학번의 일련번호 받아오기          
                        const encryptedSnum = encrypt2('C', body.snum);            
                        return connection.query(`select std_seq from GACHON_STD where std_no=?`,[encryptedSnum],
                        (err,rows)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                let std_seq=rows[0].std_seq;
                                // 회원가입 멤버에 아이디, 패스워드, 받아온 학적 일련번호 삽입
                                return connection.query(`insert into GACHON_MEMBER values(?,?,?)`,[body.id,encrypt2('G',body.password),std_seq],
                                (err,rows)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        console.log("");
                                        console.log(`C대학 학번, 이름 정보 대조 후 회원 가입 테이블에 ${body.id},${body.password},${std_seq} 삽입 완료`);
                                        res.redirect("/");                                
                                    }
                                })
                            }
                        })
                    }
                    else{
                        console.log(`${univName} 대학에서 대조 실패`);
                        res.send("Fail");
                    }
                }
            })
                            
        }
                
    }


export default signup;