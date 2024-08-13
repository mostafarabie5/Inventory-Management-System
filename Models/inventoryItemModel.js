const connection = require("../database");

class InventoryItem {
  constructor(name, quantity, id = undefined) {
    this.name = name;
    this.quantity = quantity;
    this.id = id;
  }

  async addItem() {
    const query = `INSERT INTO INVENTORYITEMS (NAME,QUANTITY) VALUES ('${this.name}',${this.quantity});`;
    const [result] = await connection.query(query);

    this.id = result.insertId;
  }

  async checkAvailability() {
    const query = `SELECT * FROM INVENTORYITEMS WHERE NAME = '${this.name}'`;
    const [[result]] = await connection.query(query);

    if (result === undefined) return false;
    return true;
  }
}

module.exports = InventoryItem;
