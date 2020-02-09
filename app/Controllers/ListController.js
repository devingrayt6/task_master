import _listService from "../Services/ListService.js";
import _store from "../store.js";

//TODO Don't forget to render to the screen after every data change.
function _drawLists() {
  console.log(_store.State.lists)
  let lists = _store.State.lists;
  let listView = document.getElementById('lists-view');
  let template = '';

  lists.forEach(list => {
    template += list.Template
  })
  listView.innerHTML = template;
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

  removeList(id) {
      _listService.removeList(id);
      _drawLists();
  }

  addListItem(event, id) {
    event.preventDefault();
    _listService.addListItem(event, id);
    _drawLists();
  }

  removeListItem(item, id) {
      _listService.removeListItem(item, id);
      _drawLists();
  }

  //TODO: Your app will need the ability to create, and delete both lists and listItems
}
