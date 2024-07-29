const items = require("./fakeDb");
const ExpressError = require("./expressError");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  static findAll() {
    return items;
  }

  static update(name, data) {
    let foundItem = Item.find(name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }
    foundItem.name = data.name !== undefined ? data.name : foundItem.name;
    foundItem.price = data.price !== undefined ? data.price : foundItem.price;

    return foundItem;
  }

  static find(name) {
    const foundItem = items.find(v => v.name === name);
    if (!foundItem) {
      throw new ExpressError("Item not found", 404);
    }
    return foundItem;
  }

  static remove(name) {
    let foundIdx = items.findIndex(v => v.name === name);
    if (foundIdx === -1) {
      throw new ExpressError("Item not found", 404);
    }
    items.splice(foundIdx, 1);
  }
}

module.exports = Item;
