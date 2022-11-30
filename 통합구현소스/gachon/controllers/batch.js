import schedule from "node-schedule";
import decrypt from "../util/decrypt.js";
import fetch from "node-fetch";
import Alecroom_inserted from "../models/A_DB/Alecroom_insert.js"
import Amajor_inserted from "../models/A_DB/Amajor_insert.js"
import Aprof_inserted from "../models/A_DB/Aprof_insert.js"
import Aregister_inserted from "../models/A_DB/Aregister_insert.js"
import Astudent_inserted from "../models/A_DB/Astudent_insert.js"
import Bregister_inserted from "../models/B_DB/Bregister_insert.js";
import Bstudent_inserted from "../models/B_DB/Bstudent_insert.js";
import Cregister_inserted from "../models/C_DB/Cregister_insert.js";
import Cstudent_inserted from "../models/C_DB/Cstudent_insert.js";
import Cmajor_inserted from "../models/C_DB/Cmajor_insert.js";
import fs from "fs";

// 수강신청 끝난 후 일괄처리
const batch =(logger)=>{  
    //파라미터값 second(0-59), minute(0-59), hour(0-23), day of month(1-31), month(1-12), day of week(0-6 일-월) 순
    schedule.scheduleJob('20 50 13 * * *', async ()=>{
        //ex) 해당 경우 '00 44  01 * * *' => 매일 오전 1시 44분마다 이 함수가 실행
        // 수강신청 끝난 후 한번 일괄처리 실행-(A,B,C 서버 다 켜놓고 해야 함)
       try{       
           await fetch(`http://192.9.20.62:65001/A/Alecroom`)
               .then((response)=>response.json())
               .then((data)=>{
                   Alecroom_inserted.insertLecroom(data);
                  // 인터페이스 파일
                   fs.writeFileSync('gachon/gachon.json',JSON.stringify(data));                  
               })
   
           await fetch(`http://192.9.20.62:65001/A/Aprof`)
               .then((response)=>response.json())
               .then((data)=>{
                   console.log("복호화 진행 결과: ",decrypt('A', data[0].a_pnema)); //교수명 복호화
                   console.log("복호화 진행 결과: ",decrypt('A', data[0].a_email));  //교수이메일 복호화
                   // 인터페이스 파일
                   fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);

                   Aprof_inserted.insertprof(data);
               })

          await fetch(`http://192.9.20.62:65001/A/Amajor`)
            .then((response)=>response.json())
            .then((data)=>{
              console.log("복호화 진행 결과: ",decrypt('A', data[0].a_mcon));  //학과장명 복호화
              Amajor_inserted.insertMajor(data);
              // 인터페이스 파일
              fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);
          })
   
         await fetch(`http://192.9.20.62:65001/A/Astudent`)
           .then((response)=>response.json())
           .then((data)=>{
               console.log("복호화 진행 결과: ",decrypt('A', data[0].a_snum));  //학번 복호화
               console.log("복호화 진행 결과: ",decrypt('A', data[0].a_name));  //이름 복호화
               console.log("복호화 진행 결과: ",decrypt('A', data[0].a_regnum));  //주민번호 복호화
               console.log("복호화 진행 결과: ",decrypt('A', data[0].a_pnum));  //전화번호 복호화
               console.log("복호화 진행 결과: ",decrypt('A', data[0].a_adr)); //주소 복호화
               Astudent_inserted.insertstudent(data);
               // 인터페이스 파일
               fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);
           })
   
         await fetch(`http://192.9.20.62:65001/A/Aregister`)
           .then((response)=>response.json())
           .then((data)=>{
               console.log("복호화 진행 결과: ",decrypt('A', data[0].a_snum));  //학번 복호화
   
               Aregister_inserted.insertregister(data);
               // 인터페이스 파일
               fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);
           })

         await fetch(`http://192.9.20.62:65002/B/Bstudent`)
           .then((response)=>response.json())
           .then((data)=>{
              Bstudent_inserted.insertstudent(data);
              // 인터페이스 파일
              fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);
           })
   
   
         await fetch(`http://192.9.20.62:65002/B/Bregister`)
           .then((response)=>response.json())
           .then((data)=>{
                Bregister_inserted.insertregister(data);
                // 인터페이스 파일
                fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);
           })
         
          await fetch(`http://192.9.20.62:65003/C/Cmajor`)
            .then((response)=>response.json())
            .then((data)=>{
                Cmajor_inserted.insertMajor(data);
                // 인터페이스 파일
                fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);
            })
         
         await fetch('http://192.9.20.62:65003/C/Cstudent')
           .then((response)=>response.json())
           .then((data)=>{
               Cstudent_inserted.insertstudent(data);
               // 인터페이스 파일
               fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);
           })

         await fetch(`http://192.9.20.62:65003/C/Cregister`)
           .then((response)=>response.json())
           .then((data)=>{
                 Cregister_inserted.insertregister(data);
                 // 인터페이스 파일
                 fs.appendFile('gachon/gachon.json',JSON.stringify(data),(err)=>err?console.log(err):false);
           })
         }catch(error){
             console.log(error);
           }
         finally{
             // 정해놨던 일괄처리 시스템 종료
             //ex) 해당 경우 오전 1시 44분마다 실행되는 함수가 종료됨
             schedule.cancelJob();
             // 2초정도 딜레이 줘서 터미널 맨 마지막에 "일괄처리 종료" 출력되게
             setTimeout(()=>{
                 console.log("=====================");
                 console.log("=====================");
                 console.log("    일괄처리 종료     ");
                 console.log("=====================");
                 console.log("=====================");
             },2000);
         }
       })
} 


export default batch;


