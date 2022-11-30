import connection from "../config/db_config.js";
import decrypt from "../util/decrypt.js";
let schedule={
    getschedule: (id,unive,func)=>{
                    let objectArr=[];
                    let object={};
                    console.log("");
                    console.log(`학생의 일련번호: ${id}`);
                    console.log(`학생의 대학: ${unive} 대학`);
                    console.log("");
                    console.log(`해당 학적 일련번호로 회원가입을 한 학생의 시간표를 보여줍니다.`);
                    // 학생 일련번호를 받은 뒤 가천정보 수강 테이블에서 학적 일련번호와 관련된 교과목 일련번호 반환
                    connection.query(`select class_lect_id from GACHON_CLASS where class_std_seq=?`,[id],
                            (err,classes)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    for(let data of classes){
                                            let class_lect_id=0;
                                            console.log("");
                                            console.log(`교과목 일련번호: ${data.class_lect_id}`);
                                            //교과목 일련번호를 할당
                                            class_lect_id=data.class_lect_id;
                                            // GACHON_CLASS의 교과목 일련번호와 맞는 교과목 테이블을 반환
                                            connection.query(`select * from GACHON_LECTURE where lecture_id=?`,[class_lect_id],
                                            (err,rows)=>{
                                                if(err){
                                                    console.log(err);
                                                }
                                                else{
                                                    console.log("");
                                                    // 교과목 테이블에 있는 정보를 반환하기 위해 변수 선언
                                                    let lecture_id=0;
                                                    let lecture_name='';
                                                    let lecture_day='';
                                                    let lecture_time='';
                                                    let lecture_classroom_id_code=0;
                                                    let lecture_prof_id_code=0;
                                                    // 시간표에 보여줄 데이터 할당
                                                    lecture_id=rows[0].lecture_id;// 교과목 일련번호
                                                    lecture_classroom_id_code=rows[0].lecture_classroom_id; //강의실 이름 코드
                                                    lecture_prof_id_code=rows[0].lecture_prof_id;// 교수님 성함 코드
        
                                                    // 수강 시간 ex) 1교시 2교시 3교시
                                                    // 코드를 코드명으로 변환(시간표에는 코드가 아닌 코드명으로 명시해야함)
                                                    switch(rows[0].lecture_time){
                                                        case 1:
                                                            lecture_time='1교시';
                                                            break;
                                                        case 2:
                                                            lecture_time='2교시';
                                                            break;
                                                        case 3:
                                                            lecture_time='3교시';
                                                            break;
                                                        case 4:
                                                            lecture_time='4교시';
                                                            break;
                                                        case 5:
                                                            lecture_time='5교시';
                                                            break;
                                                        case 6:
                                                            lecture_time='6교시';
                                                            break;
                                                        case 7:
                                                            lecture_time='7교시';
                                                            break;
                                                        case 8:
                                                            lecture_time='8교시';
                                                            break;
                                                        default:
                                                            lecture_time='9~10 야간교시'
                                                            break;
                                                    }
                                                    console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_time} => ${lecture_time}`);
                                                    // 수강 요일 ex)월화수목금토일
                                                    // 코드를 코드명으로 변환(시간표에는 코드가 아닌 코드명으로 명시해야함)
                                                    switch(rows[0].lecture_day){
                                                        case 'MO':
                                                            lecture_day='월요일';
                                                            break;
                                                        case 'TU':
                                                            lecture_day='화요일';
                                                            break;
                                                        case 'WE':
                                                            lecture_day='수요일';
                                                            break;
                                                        case 'TH':
                                                            lecture_day='목요일';
                                                            break;
                                                        case 'FR':
                                                            lecture_day='금요일';
                                                            break;
                                                        default:
                                                            lecture_day='무슨요일이야?';
                                                            break;                                            
                                                        }
                                                    // 교과목 명
                                                    // 코드를 코드명으로 변환(시간표에는 코드가 아닌 코드명으로 명시해야함)
                                                    // A,C대학 경우
                                                    if(rows[0].lecture_name==='N0101'){
                                                        lecture_name='C언어';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N0102'){
                                                        lecture_name='컴퓨터개론';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N0103'){
                                                        lecture_name='사물인터넷';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N0104'){
                                                        lecture_name='인공지능';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N0201'){
                                                        lecture_name='전자회로';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N0202'){
                                                        lecture_name='반도체';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    //B대학 경우
                                                    else if(rows[0].lecture_name==='N01'){
                                                        lecture_name='C언어';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N02'){
                                                        lecture_name='컴퓨터개론';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N03'){
                                                        lecture_name='사물인터넷';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N04'){
                                                        lecture_name='인공지능';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N05'){
                                                        lecture_name='전자회로';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
                                                    else if(rows[0].lecture_name==='N06'){
                                                        lecture_name='반도체';              
                                                        console.log("");                
                                                        console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_name}`);
                                                    }
        
                                                    // 강의실 일련번호 코드를 받아 강의실 테이블에 있는 강의실명 데이터 접근
                                                    connection.query(`select lecture_name from GACHON_CLASSROOM where classroom_id=?`,[lecture_classroom_id_code],
                                                    (err,rows)=>{
                                                        if(err){
                                                            console.log(err);
                                                        }
                                                        else{
                                                            console.log("");
                                                            // 코드를 코드명으로 변환(시간표에는 코드가 아닌 코드명으로 명시해야함)
                                                            let lecture_classroom_id="";
                                                            if(rows[0].lecture_name==="P120"){
                                                                lecture_classroom_id="IT대 120호"
                                                                console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_classroom_id}`);
                                                            }
                                                            else if(rows[0].lecture_name==="P121"){
                                                                lecture_classroom_id="IT대 121호"
                                                                console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_classroom_id}`);
                                                            }
                                                            else if(rows[0].lecture_name==="P122"){
                                                                lecture_classroom_id="IT대 122호"
                                                                console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_classroom_id}`);
                                                            }
                                                            else if(rows[0].lecture_name==="P123"){
                                                                lecture_classroom_id="IT대 123호"
                                                                console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_classroom_id}`);
                                                            }
                                                            else if(rows[0].lecture_name==="P124"){
                                                                lecture_classroom_id="IT대 124호"
                                                                console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_classroom_id}`);
                                                            }
                                                            else if(rows[0].lecture_name==="P125"){
                                                                lecture_classroom_id="IT대 125호"
                                                                console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_classroom_id}`);
                                                            }
                                                            else{
                                                                lecture_classroom_id=rows[0].lecture_name
                                                                console.log(`코드를 코드명으로 변환합니다. ${rows[0].lecture_name} => ${lecture_classroom_id}`);
                                                            }
                
                                                            // 교수 일련번호 코드를 받아 교수 테이블에 있는 교수명 데이터 접근
                                                            connection.query(`select prof_name from GACHON_PROFESSOR where prof_id=?`,[lecture_prof_id_code],
                                                            (err,rows)=>{
                                                                if(err){
                                                                    console.log(error);
                                                                }
                                                                else{  
                                                                    console.log("");
                                                                    let lecture_prof_id=rows[0].prof_name;
                                                                    console.log("해당 내용이 시간표에 출력됩니다.");

                                                                    object={
                                                                        "교과목 일련번호":lecture_id,
                                                                        "교과목명":lecture_name,
                                                                        "수강요일":lecture_day,
                                                                        "수강시간":lecture_time,
                                                                        "강의실이름":lecture_classroom_id,
                                                                        "교수님성함":decrypt(unive, rows[0].prof_name)
                                                                    }

                                                                    objectArr.push(object);
                                                                }
                                                        
                                                                if (objectArr.length===classes.length) {
                                                                    func(JSON.stringify(objectArr));
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            })   
                                    }
                                }
                            })
                    
                }
                
            }

export default schedule;