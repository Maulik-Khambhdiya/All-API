const API = require("../model/student");

// exports.createData= async(req,res)=>{
//     let data=req.body

//     try {
//         const addData= await API.create(data)
//         res.status(201).json({
//           status:"success",
//           message:"data created successfully",
//           data:addData
//         })

//     } catch (error) {
//         res.status(404).json({
//             status:"failed",
//             message:error.message
//         })
//     }
// }

exports.addData = async (req, res) => {
  //console.log("=====");
  try {
    let data = req.body;
    
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
    const viewData = await API.find();
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

    const updateData = await API.findByIdAndUpdate(editId, req.body, {new: true});
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



