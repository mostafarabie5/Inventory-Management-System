const InventoryItem = require("./inventoryItemModel");
const connection = require("../database");

// eslint-disable-next-line no-unused-vars
class RawMaterial extends InventoryItem {
  constructor(name, quantity, type, purity, id = undefined) {
    super(name, quantity, id);

    this.type = type;
    this.purity = purity;
  }

  async addItem() {
    if (await this.checkAvailability())
      // eslint-disable-next-line no-throw-literal
      throw "This item is already exist in the system";

    await super.addItem();
    const query = `INSERT INTO RAWMATERIALS (TYPE,PURITY,ID) VALUES ('${this.type}','${this.purity}',${this.id});`;
    await connection.query(query);
  }

  static async viewItems() {
    const query = `SELECT RAWMATERIALS.id,name,quantity,type,purity FROM RAWMATERIALS,INVENTORYITEMS WHERE RAWMATERIALS.ID = INVENTORYITEMS.ID;`;

    const [result] = await connection.query(query);

    const items = result.map(
      (item) =>
        new RawMaterial(
          item.name,
          item.quantity,
          item.type,
          item.purity,
          item.id,
        ),
    );
    return items;
  }
}

module.exports = RawMaterial;
