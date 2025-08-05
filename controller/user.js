let API = require("../model/user");


exports.addData = async (req, res) => {
  //console.log("=====");
  try {
    let data = req.body;
    data.profile = req.file.filename;
    //console.log("--> ", data);

    const createData = await API.create(data);
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
