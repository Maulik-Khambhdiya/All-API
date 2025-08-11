const express = require("express");
const apiRouter = express.Router();
const AM = require('../middleware/auth')

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

let AC = require("../controller/user");

apiRouter.post("/createData", upload.single("profile"), AC.addData); // http://localhost:3000/signup/createData
apiRouter.get("/",AM.authCheck,AC.viewData);
apiRouter.delete('/:id',AM.authCheck,AC.deleteData)
apiRouter.patch('/:id',AM.authCheck,AC.editData)


module.exports = apiRouter;
