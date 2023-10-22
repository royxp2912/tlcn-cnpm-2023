import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const CRYPTO_SECRET = process.env.CRYPTO_SECRET;
const KEY = crypto.scryptSync(CRYPTO_SECRET, 'salt', 32) // 32 bytes

const ALGORTIHM = 'aes-256-cbc';
const IV = Buffer.alloc(16, 0); // Initialization crypto vector

const encrypt = (text = "") => {
    const cipher = crypto.createCipheriv(ALGORTIHM, KEY, IV);

    try {
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (err) {
        return err;
    }
}

export default encrypt
