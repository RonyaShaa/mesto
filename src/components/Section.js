class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cardData){
    cardData.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element){
    this._container.append(element);
  }
  
  prependItem(element){
    this._container.prepend(element);
  }
}

export default Section;