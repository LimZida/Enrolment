import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const algorithm = 'aes-192-cbc'; // AES128 <- 사용할 암호화 알고리즘

function encrypt2(univ, text) {
    let ENCRYPTION_KEY = '';
    let ENCRYPTION_IV = '';
    switch (univ) {
        case 'A':
            ENCRYPTION_KEY = process.env.A_ENCRYPT_KEY;
            ENCRYPTION_IV= process.env.A_ENCRYPT_IV;
            break;
        case 'B':
            ENCRYPTION_KEY = process.env.B_ENCRYPT_KEY;
            ENCRYPTION_IV= process.env.B_ENCRYPT_IV;
            break;
        case 'C':
            ENCRYPTION_KEY = process.env.C_ENCRYPT_KEY;
            ENCRYPTION_IV= process.env.C_ENCRYPT_IV;
            break;
        case 'G':
            ENCRYPTION_KEY = process.env.G_ENCRYPT_KEY;
            ENCRYPTION_IV= process.env.G_ENCRYPT_IV;
            break;
    }

    var cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), Buffer.from(ENCRYPTION_IV, 'hex')); // 암호화객체를 생성

    let encrypted = cipher.update(text, 'utf8', 'hex'); // (128bit 블럭단위로) 암호화실행
    encrypted += cipher.final('hex'); // 암호화 종료를 알림

    return ENCRYPTION_IV + ':' + encrypted;
}

export default encrypt2;