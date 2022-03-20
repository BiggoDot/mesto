export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  };

  addItemAppend(item) {
    this._container.append(item);
  };

  clear() {
    this._element = null;
  }

  renderItems() {
    this.clear();

    this._items.forEach((item) => {
      this._renderer(item);
    });
  }


}