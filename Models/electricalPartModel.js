const InventoryItem = require("./inventoryItemModel");
const connection = require("../database");

class ElectricalPart extends InventoryItem {
  constructor(name, quantity, voltage, current, powerRating, id = undefined) {
    super(name, quantity, id);

    this.voltage = voltage;
    this.current = current;
    this.powerRating = powerRating;
  }

  async addItem() {
    if (await this.checkAvailability())
      // eslint-disable-next-line no-throw-literal
      throw "This item is already exist in the system";

    await super.addItem();
    const query = `INSERT INTO ELECTRICALPARTS (VOLTAGE,CURRENT,POWERRATING,ID) VALUES ('${this.voltage}','${this.current}',${this.powerRating},${this.id});`;
    await connection.query(query);
  }

  static async viewItems() {
    const query = `SELECT ELECTRICALPARTS.id,name,quantity,voltage,current,powerRating FROM ELECTRICALPARTS,INVENTORYITEMS WHERE ELECTRICALPARTS.ID = INVENTORYITEMS.ID;`;

    const [result] = await connection.query(query);

    const items = result.map(
      (item) =>
        new ElectricalPart(
          item.name,
          item.quantity,
          item.voltage,
          item.current,
          item.powerRating,
          item.id,
        ),
    );
    return items;
  }

  async getItem() {
    const query = `SELECT ELECTRICALPARTS.id,name,quantity,voltage,current,powerrating FROM ELECTRICALPARTS,INVENTORYITEMS WHERE ELECTRICALPARTS.ID = INVENTORYITEMS.ID AND ELECTRICALPARTS.ID = ${this.id};`;
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
    if (conditions.length !== 0) {
      const query = `UPDATE ELECTRICALPARTS SET ${conditions.join(",")} WHERE ID = ${this.id};`;
      await connection.query(query);
    }
  }
}

module.exports = ElectricalPart;
