const ElectricalPartModel = require("../Models/electricalPartModel");
const MechanicalPartModel = require("../Models/mechanicalPartModel");
const RawMaterialModel = require("../Models/rawMaterialModel");

const getMechanicalParts = async (req, res) => {
  try {
    const items = await MechanicalPartModel.viewItems();

    res.status(200).json({
      status: "success",
      requrestedAt: req.requestedAt,
      data: {
        items,
      },
    });
  } catch (err) {
    res.status(500).json("fail");
  }
};

const addMechanicalPart = async (req, res) => {
  const { body } = req;
  const item = new MechanicalPartModel(
    body.name,
    body.quantity,
    body.material,
    body.dimensions,
    body.weight,
  );

  try {
    await item.addItem();

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        item,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const getElectricalParts = async (req, res) => {
  try {
    const items = await ElectricalPartModel.viewItems();

    res.status(200).json({
      status: "success",
      requrestedAt: req.requestedAt,
      data: {
        items,
      },
    });
  } catch (err) {
    res.status(500).json("fail");
  }
};

const addElectricalPart = async (req, res) => {
  const { body } = req;
  const item = new ElectricalPartModel(
    body.name,
    body.quantity,
    body.voltage,
    body.current,
    body.powerrating,
  );

  try {
    await item.addItem();

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        item,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const getRawMaterials = async (req, res) => {
  try {
    const items = await RawMaterialModel.viewItems();

    res.status(200).json({
      status: "success",
      requrestedAt: req.requestedAt,
      data: {
        items,
      },
    });
  } catch (err) {
    res.status(500).json("fail");
  }
};

const addRawMaterial = async (req, res) => {
  const { body } = req;
  const item = new RawMaterialModel(
    body.name,
    body.quantity,
    body.type,
    body.purity,
  );

  try {
    await item.addItem();

    res.status(201).json({
      status: "success",
      requestedAt: req.requestedAt,
      data: {
        item,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err,
    });
  }
};

const getAllItems = async (req, res) => {
  try {
    const electrical = await ElectricalPartModel.viewItems();
    const mechanical = await MechanicalPartModel.viewItems();
    const raw = await RawMaterialModel.viewItems();

    const items = electrical.concat(mechanical).concat(raw);

    res.status(200).json({
      status: "success",
      requrestedAt: req.requestedAt,
      data: {
        items,
      },
    });
  } catch (err) {
    res.status(500).json("fail");
  }
};

const updateItem = async (req, res) => {
  try {
    const { path } = req;
    const { id } = req.params;
    const { body } = req;
    let item;

    if (/mechanical/.test(path)) item = new MechanicalPartModel();
    else if (/electrical/.test(path)) item = new ElectricalPartModel();
    else if (/raw/.test(path)) item = new RawMaterialModel();
    else return res.status(505).json("fail");

    item.id = id;

    await item.getItem();
    await item.updateItem(body);

    res.status(201).json({
      status: "success",
      requrestedAt: req.requestedAt,
      data: {
        item,
      },
    });
  } catch (err) {
    res.status(400).json("fail");
  }
};

module.exports = {
  addMechanicalPart,
  getMechanicalParts,
  getElectricalParts,
  addElectricalPart,
  getRawMaterials,
  addRawMaterial,
  getAllItems,
  updateItem,
};
