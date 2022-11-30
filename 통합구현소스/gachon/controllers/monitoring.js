import fs from "fs";
import Log_select from "../models/A_DB/Log_select.js";

const monitoring={
    getDatesStartToLast:(startDate, lastDate)=>{
        var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
        if (!(regex.test(startDate) && regex.test(lastDate))) return "Not Date Format";
        var StartToLast = [];
        var curDate = new Date(startDate);
        while (curDate <= new Date(lastDate)) {
            StartToLast.push(curDate.toISOString().split("T")[0]);
            curDate.setDate(curDate.getDate() + 1);
        }
        return StartToLast;
    }
    ,
    moniter:(req,res)=>{
        const startDate = req.body.start_date;
        const endDate = req.body.end_date;
        
        let univ;
        switch (req.body.univ) {
          case 'a':
            univ = 'A대학';
            break;
          case 'b':
            univ = 'B대학';
            break;
          case 'c':
            univ = 'C대학';
            break;
        }
        
        let ifTable;
        switch (req.body.ifTable) {
          case 'std':
            ifTable = '학생';
            break;
          case 'major':
            ifTable = '학과';
            break;
          case 'lecture':
            ifTable = '과목';
            break;
          case 'prof':
            ifTable = '교수';
            break;
          case 'register':
            ifTable = '수강';
            break;
          case 'classroom':
            ifTable = '강의실';
            break;
        }
        
        let step;
        switch(req.body.step) {
          case 'cf':
            step = '생성완료';
            break;
          case 'ce':
            step = '생성시오류';
            break;
          case 'sf':
            step = '전송완료';
            break;
          case 'se':
            step = '전송시오류';
            break;
        }
        
        let result;
        switch(req.body.result) {
          case 'success':
            result = 'info';
            break;
          case 'fail':
            result = 'error';
            break;
        }
        
        if (req.body.univ==='a') {  //A 대학은 DB에서 로그 가져오기
          const logData = {'start_date': startDate, 'end_date': endDate, 'log_result': result, 'log_if_table': ifTable, 'log_step': step};
          Log_select.selectLog(logData, function(logs) {
            res.render("monitoring", {datas: logs, univ: univ});
          });
        } else {  //B, C 대학은 파일에서 로그 가져오기
          const dates = monitoring.getDatesStartToLast(startDate, endDate);
          let filteredLogs = [];
          for (var date of dates) {
            try {
              let logs = fs.readFileSync(`./logs/${date}.log`, "utf8") + '\n';    //2022-05-26
              let splitLogs = logs.split("\n")
              for (var log of splitLogs) {
                  let splitSpaceLog = log.split(' ');
                  if (splitSpaceLog[2]===result && splitSpaceLog[3]===univ && splitSpaceLog[4]===ifTable && splitSpaceLog[5]===step) {
                    if (result==='info') {
                      filteredLogs.push({'log_date': date, 'log_result': '성공', 'log_if_table': ifTable, 'log_step': step, 'log_err_code': splitSpaceLog[6]});
                    } else {
                      filteredLogs.push({'log_date': date, 'log_result': '실패', 'log_if_table': ifTable, 'log_step': step, 'log_err_code': splitSpaceLog[6]});
                    }
                  }
              }
            } catch(err) {
              console.log(err);
            }
          }    
          res.render("monitoring", {datas: filteredLogs, univ: univ});
        }
    }
}

export default monitoring;