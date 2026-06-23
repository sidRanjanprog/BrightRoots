const Child = require("../models/Child");

const createChild = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    const child = await Child.create({
      parent: req.user.userId,
      name,
      age,
      gender,
    });

    res.status(201).json({
      success: true,
      message: "Child profile created successfully",
      child,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getMyChildren = async (req, res) => {
  try {
    const children = await Child.find({
      parent: req.user.userId,
    });

    res.status(200).json({
      success: true,
      count: children.length,
      children,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateChild = async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    child.name = req.body.name || child.name;
    child.age = req.body.age || child.age;
    child.gender = req.body.gender || child.gender;

    await child.save();

    res.status(200).json({
      success: true,
      message: "Child updated successfully",
      child,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteChild = async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    await Child.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Child deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getChildById = async (req, res) => {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parent: req.user.userId,
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: "Child not found",
      });
    }

    res.status(200).json({
      success: true,
      child,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createChild,
  getMyChildren,
  getChildById,
  updateChild,
  deleteChild,
};
