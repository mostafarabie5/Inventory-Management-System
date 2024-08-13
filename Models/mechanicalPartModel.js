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
}

module.exports = MechanicalPart;
