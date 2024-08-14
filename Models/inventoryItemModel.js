const connection = require("../database");

class InventoryItem {
  constructor(name, quantity, description, id = undefined) {
    this.name = name;
    this.quantity = quantity;
    this.id = id;
    this.description = description;
  }

  async addItem() {
    const query = `INSERT INTO INVENTORYITEMS (NAME,QUANTITY,DESCRIPTION) VALUES ('${this.name}',${this.quantity},'${this.description}');`;
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
    if (newData.description !== undefined) {
      conditions.push(`DESCRIPTION = '${newData.description}'`);
      this.description = newData.description;
    }
    let changedRows = 0;
    if (conditions.length !== 0) {
      const query = `UPDATE INVENTORYITEMS SET ${conditions.join(",")} WHERE ID = ${this.id};`;
      [{ changedRows }] = await connection.query(query);
    }
    return changedRows;
  }
}

module.exports = InventoryItem;
