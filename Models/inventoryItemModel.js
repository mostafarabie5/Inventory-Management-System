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

  async updateItem(newData) {
    const conditions = [];
    if (newData.name !== undefined) {
      conditions.push(`NAME = '${newData.name}'`);
      this.name = newData.name;
    }
    if (newData.quantity !== undefined) {
      conditions.push(`QUANTITY = ${newData.quantity}`);
      this.quantity = newData.quantity;
    }
    if (conditions.length !== 0) {
      const query = `UPDATE INVENTORYITEMS SET ${conditions.join(",")} WHERE ID = ${this.id};`;
      await connection.query(query);
    }
  }
}

module.exports = InventoryItem;
