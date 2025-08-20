let API = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.addData = async (req, res) => {
  //console.log("=====");
  try {
    let data = req.body;
    data.profile = req.file.filename;
    data.password = await bcrypt.hash(data.password, 10);
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

exports.deleteData = async (req, res) => {
  try {
    const deleteId = req.params.id;

    const checkData = await API.findById(deleteId);
    // console.log(checkData);

    if (!checkData) throw new Error("Record not found");

    const deleteData = await API.findByIdAndDelete(deleteId);
    res.status(200).json({
      status: "Success",
      message: "Data Delete SuccessFully",
      data: deleteData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.editData = async (req, res) => {
  try {
    const editId = req.params.id;

    const checkData = await API.findById(editId);
    // console.log(checkData);

    if (!checkData) throw new Error("Record not found");

    const updateData = await API.findByIdAndUpdate(editId, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Success",
      message: "Data Update SuccessFully",
      data: updateData,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const emailVerify = await API.findOne({ email: req.body.email });
    if (!emailVerify) throw new Error("Invalid email");
    const passVerify = await bcrypt.compare(
      req.body.password,
      emailVerify.password
    );

    if (!passVerify) throw new Error("Invalid password");
    const token = jwt.sign({ id: emailVerify._id }, "surat");

    res.status(200).json({
      status: "Success",
      message: "Login Successfully",
      loginUser: emailVerify,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
