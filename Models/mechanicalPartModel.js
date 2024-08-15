const InventoryItem = require("./inventoryItemModel");
const connection = require("../database");
const AppError = require("../utils/appError");

class MechanicalPart extends InventoryItem {
  constructor(
    name,
    quantity,
    description,
    material,
    dimensions,
    weight,
    id = undefined,
  ) {
    super(name, quantity, description, id);

    this.material = material;
    this.dimensions = dimensions;
    this.weight = weight;
  }

  async addItem() {
    if (await this.checkAvailability())
      throw new AppError("This item is already exist in the Database", 400);

    await super.addItem();
    const query = `INSERT INTO MECHANICALPARTS (MATERIAL,DIMENSIONS,WEIGHT,ID) VALUES ('${this.material}','${this.dimensions}',${this.weight},${this.id});`;
    await connection.query(query);
  }

  static async viewItems() {
    const query = `SELECT MECHANICALPARTS.id,name,quantity,description,material,dimensions,weight FROM MECHANICALPARTS,INVENTORYITEMS WHERE MECHANICALPARTS.ID = INVENTORYITEMS.ID;`;

    const [result] = await connection.query(query);

    const items = result.map(
      (item) =>
        new MechanicalPart(
          item.name,
          item.quantity,
          item.description,
          item.material,
          item.dimensions,
          item.weight,
          item.id,
        ),
    );
    return items;
  }

  async getItem() {
    const query = `SELECT MECHANICALPARTS.id,name,quantity,description,material,dimensions,weight FROM MECHANICALPARTS,INVENTORYITEMS WHERE MECHANICALPARTS.ID = INVENTORYITEMS.ID AND MECHANICALPARTS.ID = ${this.id};`;
    const [[result]] = await connection.query(query);

    if (result === undefined)
      throw new AppError(
        `No Item with ID = ${this.id} exist in the database.`,
        404,
      );

    this.name = result.name;
    this.quantity = result.quantity;
    this.description = result.description;
    this.material = result.material;
    this.dimensions = result.dimensions;
    this.weight = result.weight;
  }

  async updateItem(newData) {
    const conditions = [];
    const changedRowsInventory = await super.updateItem(newData);

    if (newData.material !== undefined) {
      conditions.push(`MATERIAL = '${newData.material}'`);
      this.material = newData.material;
    }
    if (newData.dimensions !== undefined) {
      conditions.push(`DIMENSIONS = '${newData.dimensions}'`);
      this.dimensions = newData.dimensions;
    }
    if (newData.weight !== undefined) {
      conditions.push(`WEIGHT = ${newData.weight}`);
      this.weight = newData.weight;
    }
    let changedRows = 0;
    if (conditions.length !== 0) {
      const query = `UPDATE MECHANICALPARTS SET ${conditions.join(",")} WHERE ID = ${this.id};`;
      [{ changedRows }] = await connection.query(query);
    }
    if (changedRowsInventory === 0 && changedRows === 0)
      throw new AppError("No Information changed", 400);
  }
}

module.exports = MechanicalPart;
