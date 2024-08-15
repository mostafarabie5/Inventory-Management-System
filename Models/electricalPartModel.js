const InventoryItem = require("./inventoryItemModel");
const connection = require("../database");
const AppError = require("../utils/appError");

class ElectricalPart extends InventoryItem {
  constructor(
    name,
    quantity,
    description,
    voltage,
    current,
    powerRating,
    id = undefined,
  ) {
    super(name, quantity, description, id);

    this.voltage = voltage;
    this.current = current;
    this.powerRating = powerRating;
  }

  async addItem() {
    if (await this.checkAvailability())
      throw new AppError("This item is already exist in the Database", 400);

    await super.addItem();
    const query = `INSERT INTO ELECTRICALPARTS (VOLTAGE,CURRENT,POWERRATING,ID) VALUES ('${this.voltage}','${this.current}',${this.powerRating},${this.id});`;
    await connection.query(query);
  }

  static async viewItems() {
    const query = `SELECT ELECTRICALPARTS.id,name,quantity,description,voltage,current,powerRating FROM ELECTRICALPARTS,INVENTORYITEMS WHERE ELECTRICALPARTS.ID = INVENTORYITEMS.ID;`;

    const [result] = await connection.query(query);

    const items = result.map(
      (item) =>
        new ElectricalPart(
          item.name,
          item.quantity,
          item.description,
          item.voltage,
          item.current,
          item.powerRating,
          item.id,
        ),
    );
    return items;
  }

  async getItem() {
    const query = `SELECT ELECTRICALPARTS.id,name,quantity,description,voltage,current,powerrating FROM ELECTRICALPARTS,INVENTORYITEMS WHERE ELECTRICALPARTS.ID = INVENTORYITEMS.ID AND ELECTRICALPARTS.ID = ${this.id};`;
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
    if (newData.voltage !== undefined) {
      conditions.push(`VOLTAGE = ${newData.voltage}`);
      this.voltage = newData.voltage;
    }
    if (newData.current !== undefined) {
      conditions.push(`CURRENT = ${newData.current}`);
      this.current = newData.current;
    }
    if (newData.powerrating !== undefined) {
      conditions.push(`POWERRATING = ${newData.powerrating}`);
      this.powerrating = newData.powerrating;
    }
    let changedRows = 0;
    if (conditions.length !== 0) {
      const query = `UPDATE ELECTRICALPARTS SET ${conditions.join(",")} WHERE ID = ${this.id};`;
      [{ changedRows }] = await connection.query(query);
    }
    if (changedRowsInventory === 0 && changedRows === 0)
      throw new AppError("No Information changed", 400);
  }
}

module.exports = ElectricalPart;
