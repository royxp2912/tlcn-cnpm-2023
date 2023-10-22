import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

// 32 bytes
const CRYPTO_SECRET = process.env.CRYPTO_SECRET;
const KEY = crypto.scryptSync(CRYPTO_SECRET, 'salt', 32)

const ALGORTIHM = 'aes-256-cbc';
const IV = Buffer.alloc(16, 0); // Initialization crypto vector

const decrypt = (text = "") => {
    console.log("key: ", IV);
    const decipher = crypto.createDecipheriv(ALGORTIHM, KEY, IV);

    try {
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (err) {
        return err;
    }
}

export default decrypt
