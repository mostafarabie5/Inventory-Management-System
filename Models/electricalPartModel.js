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
          item.powerRatin,
          item.id,
        ),
    );
    return items;
  }
}

module.exports = ElectricalPart;
