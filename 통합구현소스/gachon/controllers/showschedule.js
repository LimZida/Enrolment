import Gmember_select from "../models/G_DB/Gmember_select.js";
import Gstudent_select from "../models/G_DB/Gstudent_select.js";
import decrypt from "../util/decrypt.js";
import schedule from "./schedule.js";

let showschedule={
    getinfo:(req,res)=>{
        Gmember_select.selectmember(req.body.id, function(data) {
            if (data==='fail') {
              res.send("<script>alert('아이디와 비밀번호를 확인해주세요.');</script>");
            } else {
              const member = JSON.parse(data); //DB를 통해 조회된 학생 정보
    
              let pwInDB = decrypt('G', member.member_pw);  //비밀번호 조회를 위해 DB에 저장돼 있던 비밀번호 복호화
              if (pwInDB!==req.body.pw)
                res.send("<script>alert('아이디와 비밀번호를 확인해주세요.');</script>");
              else {  //학적 일련번호를 가지고 GACHON_STD 테이블에서 학적 정보 조회
                Gstudent_select.selectstudent(member.member_seq_no, function(data) {
                  if (data==='fail') {
                    res.send("<script>alert('학적 데이터가 존재하지 않습니다.');</script>");
                  } else {
                    const std = JSON.parse(data);
                    std.std_name = decrypt(std.std_unive, std.std_name);  //학생 이름 복호화
                    std.std_no = decrypt(std.std_unive, std.std_no);  //학번 복호화
                    switch(std.std_unive) {
                      case 'A':
                      case 'C':
                        switch(std.std_dept) {
                          case 'S001':
                            std.std_dept = '컴공학';
                            break;
                          case 'S002':
                            std.std_dept = '전자공학';
                            break;
                          case 'S003':
                            std.std_dept = '기계공학';
                            break;
                          case 'S101':
                            std.std_dept = '행정학';
                            break;
                          case 'S102':
                            std.std_dept = '경제학';
                            break;
                          case 'S201':
                            std.std_dept = '미술학';
                            break;
                          case 'S202':
                            std.std_dept = '관현악';
                            break;
                          case 'S301':
                            std.std_dept = '수학';
                            break;
                          case 'S302':
                            std.std_dept = '화학';
                            break;
                        }
                        break;
                      case 'B':
                        switch(std.std_dept) {
                          case 'IT01':
                            std.std_dept = '컴퓨터공학과';
                            break;
                          case 'IT02':
                            std.std_dept = '전자공학과';
                            break;
                          case 'IT03':
                            std.std_dept = '소프트웨어과';
                            break;
                          case 'SS01':
                            std.std_dept = '사회복지학과';
                            break;
                          case 'SS02':
                            std.std_dept = '경제학과';
                            break;
                          case 'SS03':
                            std.std_dept = '유아교육학과';
                            break;
                        }
                        break;
                    }
    
                    //시간표 조회
                    schedule.getschedule(std.std_seq, std.std_unive, function(schedules) {
                      res.render("timetable", {'std': std, 'schedules': JSON.parse(schedules)});
                    });
                  }
                }) 
              }
            }
          });
    }
}

export default showschedule;