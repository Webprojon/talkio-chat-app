import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "ChatImages",
		allowed_formats: ["jpg", "jpeg", "png"],
	},
});

const upload = multer({ storage });

export default upload;
