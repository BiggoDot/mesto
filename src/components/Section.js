export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.prepend(item);
  };

  clear() {
    this._element = null;
  }

  renderItems(items) {
    this.clear();

    items.forEach((item) => {
      this._renderer(item);
    });
  }


}