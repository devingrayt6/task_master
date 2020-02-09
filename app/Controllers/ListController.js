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
    this.confirmDelete('list', '', id)
  }

  addListItem(event, id) {
    event.preventDefault();
    _listService.addListItem(event, id);
    _drawLists();
  }

  removeListItem(item, id) {
    this.confirmDelete('listItem', item, id);
      // _listService.removeListItem(item, id);
      // _drawLists();
  }




  confirmDelete(type, item, id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        if(type == 'list'){
          _listService.removeList(id);
          _drawLists();
        }
        if(type == 'listItem'){
          _listService.removeListItem(item, id);
          _drawLists();
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
      console.log(result.value)
    })
  }

  //TODO: Your app will need the ability to create, and delete both lists and listItems
}
