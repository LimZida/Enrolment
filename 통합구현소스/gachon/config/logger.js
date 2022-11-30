import { format as _format, createLogger, transports as _transports } from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const logDir = 'logs';  // 로그 파일 저장 경로 설정
const { combine, timestamp, printf } = _format;

// 로그에 어떻게 기록할지를 설정
const logFormat = printf(info => {
    return `${info.timestamp} ${info.level} ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY/MM/DD HH:MM:SS',
        }),
        logFormat,
    ),
    transports: [
        // info 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'info', //레벨 단위
            datePattern: 'YYYY-MM-DD',
            dirname: logDir, //저장 디렉토리
            filename: `%DATE%.log`,//파일명
            maxFiles: 30,  // 30일치 로그 파일 저장
            zippedArchive: true,
        }),
        // error 레벨 로그를 저장할 파일 설정
        new winstonDaily({
            level: 'error',//레벨 단위
            datePattern: 'YYYY-MM-DD',
            dirname: logDir, //저장 디렉토리
            filename: `%DATE%.log`,//파일명
            maxFiles: 30, // 30일치 로그 파일 저장
            zippedArchive: true,
        }),
    ],
});
                                                                                       

export default logger;