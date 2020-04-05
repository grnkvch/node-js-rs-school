const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'COLUMN_TITLE', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}
class Board {
  constructor({ id = uuid(), title = 'BOARD_TITLE', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(
      // eslint-disable-next-line no-shadow
      ({ title, order } = {}, index) =>
        new Column({
          title,
          order: Number.isInteger(order) ? order : index
        })
    );
  }

  static toResponse(user) {
    const { id, title, columns } = user;
    return { id, title, columns };
  }
}

module.exports = Board;
