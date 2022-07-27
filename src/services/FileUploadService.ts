
import path from "path";
import multer from "multer";

const UserUpload = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.fieldname === 'image') {
			cb(null, "./views/uploads/images");
		} else if (file.fieldname === 'Profile_img') {
			cb(null, "./views/uploads/profilepics");
		}
		else {
			cb(null, "./views/uploads")
		}

	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
		//console.log(storage.filename);
	},
});

const AdminUpload = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./views/uploads/studentpics");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const multerUser = multer({ storage: UserUpload });
const multerAdmin = multer({ storage: AdminUpload });


export default { multerUser, multerAdmin }

