let API = require("../model/user");

exports.createData = async (req, res) => {


  try {
    let data = req.body;
     console.log('==>>>>',data);
    data.profile = req.file.filename;
    const createData = await API.create(req.body);
    res.status(201).json({
      status: "success",
      message: "data create successfully",
      data: createData,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.viewData = async (req, res) => {
  try {
    const allData = await API.find();
    res.status(200).json({
      status: "success",
      message: "data found successfully",
      data: allData,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};
