import List from "../Models/List.js";
import _store from "../store.js";


let _listState = _store.State.lists;

//Public
class ListService {
  //TODO  Here is where we handle all of our business logic,
  //given the information you need in the controller,
  //what methods will you need to do when this class is first 'constructed'?
  //NOTE You will need this code to persist your data into local storage, be sure to call the store method to save after each change

  addList(newList) {
    newList = new List(newList);
    _store.State.lists.push(newList);
    console.log('Service recieving List...')
    _store.saveState();
  }

  removeList(id) {
    _store.State.lists = _store.State.lists.filter(list => list.id != id);
    _store.saveState();
  }

  addListItem(event, id) {
    let listNum = _listState.find(list => list.id == id);
    listNum.items.push(event.target.listItemName.value);
    _store.saveState();
  }

}

const SERVICE = new ListService();
export default SERVICE;
