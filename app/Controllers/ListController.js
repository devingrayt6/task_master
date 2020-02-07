import _listService from "../Services/ListService.js";
import _store from "../store.js";

//TODO Don't forget to render to the screen after every data change.
function _drawLists() {
  console.log(_store.State.lists)
}

//Public
export default class ListController {
  constructor() {
    //NOTE: After the store loads, we can automatically call to draw the lists.
    _drawLists();
  }

  addList(event) {
    event.preventDefault();

    let formData = event.target;
    console.log(formData)
    let newList = {
      name: formData.listName.value,
      items: [],
    }

    _listService.addList(newList);

    formData.reset();

    console.log("controller receiving event...")
    _drawLists();
  }

  //TODO: Your app will need the ability to create, and delete both lists and listItems
}
