let API = require("../model/studentMark");

exports.createData = async (req, res) => {
  try {
    let data = req.body;
    const addData = await API.create(data);
    res.status(201).json({
      status: "success",
      message: "data created successfully",
      data: addData,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.viewData = async (req, res) => {
  try {
    //const viewData = await API.find().populate("name");

    const viewData = await API.find().aggregate([
      {
        $lookup: {
          from: "students",
          localField: "name",
          foreignField: "_id",
          as: "StudentInfo",
        },
      },

      {
        $unwind: "$StudentInfo",
      },
      {
        $addFields: {
          Total: {
            $sum: ["$s1", "$s2", "$s3"],
          },
          Min: {
            $min: ["$s1", "$s2", "$s3"],
          },
        },
      },
      {
        $lookup: {
          from: "students",
          localField: "name",
          foreignField: "_id",
          as: "StudentInformation",
        },
      },
      {
        $unwind: "$StudentInformation",
      },{
        $addFields : {
          Max : {
            $max: ['$s1', '$s2', '$s3']
          }
        }
      }
    ]); //pass as array

    res.status(200).json({
      status: "success",
      message: "data found successfully",
      data: viewData,
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
