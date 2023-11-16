import multer from "multer";
import cloudinary from "../utils/cloudinary_config.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// product
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png'],
    params: {
        folder: 'shoeshop'
    }
});

// test
// const storage = new CloudinaryStorage({
//     cloudinary,
//     allowedFormats: ['jpg', 'png', 'jpeg'],
//     params: {
//         folder: 'test'
//     }
// });

const uploadCloud = multer({ storage });

export default uploadCloud