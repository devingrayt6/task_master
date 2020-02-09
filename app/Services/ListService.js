import List from "../Models/List.js";
import _store from "../store.js";




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
    let listNum = _store.State.lists.findIndex(l => l.id == id);
    console.log(listNum)
    _store.State.lists[listNum].items.push(event.target.listItemName.value);
    _store.saveState();
  }

  removeListItem(item, id){
    let list = _store.State.lists.find(l => l.id == id);
    list.items = list.items.filter(i => i != item.toString());
    _store.saveState();
  }

}

const SERVICE = new ListService();
export default SERVICE;
