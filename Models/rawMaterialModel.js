const InventoryItem = require("./inventoryItemModel");
const connection = require("../database");
const AppError = require("../utils/appError");

// eslint-disable-next-line no-unused-vars
class RawMaterial extends InventoryItem {
  constructor(name, quantity, description, type, purity, id = undefined) {
    super(name, quantity, description, id);

    this.type = type;
    this.purity = purity;
  }

  async addItem() {
    if (await this.checkAvailability())
      // eslint-disable-next-line no-throw-literal
      throw new AppError("This item is already exist in the Database", 400);

    await super.addItem();
    const query = `INSERT INTO RAWMATERIALS (TYPE,PURITY,ID) VALUES ('${this.type}','${this.purity}',${this.id});`;
    await connection.query(query);
  }

  static async viewItems() {
    const query = `SELECT RAWMATERIALS.id,name,quantity,description,type,purity FROM RAWMATERIALS,INVENTORYITEMS WHERE RAWMATERIALS.ID = INVENTORYITEMS.ID;`;

    const [result] = await connection.query(query);

    const items = result.map(
      (item) =>
        new RawMaterial(
          item.name,
          item.quantity,
          item.description,
          item.type,
          item.purity,
          item.id,
        ),
    );
    return items;
  }

  async getItem() {
    const query = `SELECT RAWMATERIALS.id,name,quantity,description,type,purity FROM RAWMATERIALS,INVENTORYITEMS WHERE RAWMATERIALS.ID = INVENTORYITEMS.ID AND RAWMATERIALS.ID = ${this.id};`;
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

    if (newData.type !== undefined) {
      conditions.push(`TYPE = '${newData.type}'`);
      this.type = newData.type;
    }
    if (newData.purity !== undefined) {
      conditions.push(`PURITY = ${newData.purity}`);
      this.purity = newData.purity;
    }
    let changedRows = 0;

    if (conditions.length !== 0) {
      const query = `UPDATE RAWMATERIALS SET ${conditions.join(",")} WHERE ID = ${this.id};`;
      [{ changedRows }] = await connection.query(query);
    }
    if (changedRowsInventory === 0 && changedRows === 0)
      throw new AppError("No Information changed", 400);
  }
}

module.exports = RawMaterial;
