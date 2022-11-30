import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const algorithm = 'aes-192-cbc'; // AES128 <- 사용할 암호화 알고리즘

function decrypt(univ, text) {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')

  let ENCRYPTION_KEY = '';
  switch (univ) {
    case 'A':
      ENCRYPTION_KEY = process.env.A_ENCRYPT_KEY;
      break;
    case 'B':
      ENCRYPTION_KEY = process.env.B_ENCRYPT_KEY;
      break;
    case 'C':
      ENCRYPTION_KEY = process.env.C_ENCRYPT_KEY;
      break;
    case 'G':
      ENCRYPTION_KEY = process.env.G_ENCRYPT_KEY;
      break;
  }

  var decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv); // 복호화객체를 생성
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8'); // (128bit 블럭단위로) 복호화실행
  
  return decrypted += decipher.final('utf8');
}

export default decrypt;