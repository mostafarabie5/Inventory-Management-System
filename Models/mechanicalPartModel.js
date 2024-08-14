const InventoryItem = require("./inventoryItemModel");
const connection = require("../database");

class MechanicalPart extends InventoryItem {
  constructor(name, quantity, material, dimensions, weight, id = undefined) {
    super(name, quantity, id);

    this.material = material;
    this.dimensions = dimensions;
    this.weight = weight;
  }

  async addItem() {
    if (await this.checkAvailability())
      // eslint-disable-next-line no-throw-literal
      throw "This item is already exist in the system";

    await super.addItem();
    const query = `INSERT INTO MECHANICALPARTS (MATERIAL,DIMENSIONS,WEIGHT,ID) VALUES ('${this.material}','${this.dimensions}',${this.weight},${this.id});`;
    await connection.query(query);
  }

  static async viewItems() {
    const query = `SELECT MECHANICALPARTS.id,name,quantity,material,dimensions,weight FROM MECHANICALPARTS,INVENTORYITEMS WHERE MECHANICALPARTS.ID = INVENTORYITEMS.ID;`;

    const [result] = await connection.query(query);

    const items = result.map(
      (item) =>
        new MechanicalPart(
          item.name,
          item.quantity,
          item.material,
          item.dimensions,
          item.weight,
          item.id,
        ),
    );
    return items;
  }

  async getItem() {
    const query = `SELECT MECHANICALPARTS.id,name,quantity,material,dimensions,weight FROM MECHANICALPARTS,INVENTORYITEMS WHERE MECHANICALPARTS.ID = INVENTORYITEMS.ID AND MECHANICALPARTS.ID = ${this.id};`;
    const [[result]] = await connection.query(query);
    
    this.name = result.name;
    this.quantity = result.quantity;
    this.material = result.material;
    this.dimensions = result.dimensions;
    this.weight = result.weight;
  }

  async updateItem(newData) {
    const conditions = [];
    super.updateItem(newData);

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
    if (conditions.length !== 0) {
      const query = `UPDATE MECHANICALPARTS SET ${conditions.join(",")} WHERE ID = ${this.id};`;
      await connection.query(query);
    }
  }
}

module.exports = MechanicalPart;
