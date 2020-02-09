import { generateId } from "../utils.js";

export default class List {
  constructor(data) {
    //TODO Your constructor takes in a data object that should have the properties you need to create your list here is a freebie, it will set the id its provided, or if that is undefined it will create a new one (this is an alternative to object destructuring)
    this.name = data.name;
    this.items = data.items;
    //
    this.id = data.id || generateId();
  }
  //Be sure to add the methods needed to create the view template for this model
  //For starting out, your tasks may be strings alone, but later you may wish to turn them into full objects, that will be up to you
  get Template() {
    let template = '';

    this.items.forEach(item => {
      template += `
        <span>${item}</span><i class="fas fa-trash-alt" onclick="app.listController.removeListItem('${item}', '${this.id}')"></i>
      `
    });

    return `
    <div class="col-12 col-md-4 m-1">
    <div class="card" style="width: 18rem;">
      <div class="card-body">
      <button class="btn btn-danger" onclick="app.listController.removeList('${this.id}')">X</button>
      <h5 class="card-title">${this.name}</h5>
      <form action="" id="add-item" onsubmit="app.listController.addListItem(event, '${this.id}')">
      <button class="btn btn-info" type="submit">+</button>
        <div class="form-group">
          <label for="listItemName">Item Name</label>
          <input type="text" class="form-control" id="listItemName" name="listItemName"
            placeholder="Create a new Item here..." required="true">
        </div>
      </form>
        <div>${template}</div>
      </div>
    </div>
  </div>
    `
  }
}
