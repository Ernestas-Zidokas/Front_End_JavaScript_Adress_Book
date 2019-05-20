let usersArray = [];

document.querySelector('#addAdress').addEventListener('click', event => {
  let name = userInput('#name');
  let lastname = userInput('#lastname');
  let phone = userInput('#phone');
  let userObject = {name: name, lastname: lastname, phone: phone,
    isEdit: false, isFavourite: false, isChecked: false};
    usersArray.push(userObject);

    clearList();
    document.querySelector('#users').appendChild(createList());
    window.localStorage.setItem('users', JSON.stringify(usersArray));
  });

  document.querySelector('#search').addEventListener('input', event => {
    let userSearch = userInput('#search');
    searchInput(userSearch);

    document.querySelector('#search').addEventListener('keydown', event => {
      let backspaceSearch = userInput('#search');
      if(event.key == "Backspace"){
        searchInput(backspaceSearch);
      }
    })
  })

  function searchInput(search) {
    clearList();
    let data = window.localStorage.getItem('users');
    if(data != null) {
      data = JSON.parse(data)
    }
    usersArray = data.filter((person, index) => person.name.toLowerCase().includes(search));
    return createList();
  }

  window.addEventListener('load', (event)=>{
    let data = window.localStorage.getItem('users');
    if(data != null) {
      data = JSON.parse(data)
      usersArray = data;
      createList();
    }
  });

  function createList() {
    let container = document.createElement('ul');

    usersArray.forEach((user, index)=>{
      let list = document.createElement('li');

      let fieldName = document.createElement(user.isEdit ? 'input' : 'span');
      let fieldLastName = document.createElement(user.isEdit ? 'input' : 'span');
      let fieldPhone = document.createElement(user.isEdit ? 'input' : 'span');

      if(user.isEdit){
        fieldName.type= "text";
        fieldLastName.type= "text";
        fieldPhone.type= "number";
      }

      fieldName[user.isEdit ? 'value' : 'textContent'] = user.name;
      list.appendChild(fieldName);

      fieldLastName[user.isEdit ? 'value' : 'textContent'] = user.lastname;
      list.appendChild(fieldLastName);

      fieldPhone[user.isEdit ? 'value' : 'textContent'] = user.phone;
      list.appendChild(fieldPhone);

      let favouriteButton = document.createElement('button');
      favouriteButton.textContent = usersArray[index].isFavourite ? '❤️' : '🖤';
      favouriteButton.type = 'button';
      favouriteButton.classList.add('favourite');

      favouriteButton.addEventListener('click', event => {
        usersArray[index].isFavourite = !usersArray[index].isFavourite;
        clearList();
        createList();
        window.localStorage.setItem('users', JSON.stringify(usersArray));
      });

      let checkbox = document.createElement('button');
      checkbox.textContent = usersArray[index].isChecked ? '🗹' : '☐';
      checkbox.type = 'button';
      checkbox.classList.add('favourite');

      checkbox.addEventListener('click', event => {
        usersArray[index].isChecked = !usersArray[index].isChecked;
        clearList();
        createList();
        window.localStorage.setItem('users', JSON.stringify(usersArray));
      });

      let edditButton = document.createElement('button');
      if(user.isEdit) {
        edditButton.textContent ='Save';
      } else {
        edditButton.textContent ='Edit';
      }
      edditButton.type = 'button';

      edditButton.addEventListener('click', event => {
        if (usersArray[index].isEdit) {
          usersArray[index].name = fieldName.value;
          usersArray[index].lastname = fieldLastName.value;
          usersArray[index].phone = fieldPhone.value;
        }

        usersArray[index].isEdit = !usersArray[index].isEdit;
        clearList();
        createList();
        window.localStorage.setItem('users', JSON.stringify(usersArray));
      });

      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.type = 'button';

      deleteButton.addEventListener('click', event => {
        usersArray.splice(index, 1);
        clearList();
        createList();
        window.localStorage.setItem('users', JSON.stringify(usersArray));
      });

      list.appendChild(checkbox);
      list.appendChild(favouriteButton);
      list.appendChild(edditButton);
      list.appendChild(deleteButton);
      container.appendChild(list);
    });

    let checked = usersArray.some(user => user.isChecked);

    if(checked) {
      let deleteChecked = document.createElement('button');
      deleteChecked.textContent = 'Delete checked';
      deleteChecked.type = 'button';

      deleteChecked.addEventListener('click', event => {
        usersArray.forEach((user, index) => {
          if(user.isChecked){
            console.log(usersArray);
            usersArray.splice(index, 1);
            console.log(usersArray);
          }
        });

        clearList();
        createList();
        window.localStorage.setItem('users', JSON.stringify(usersArray));
      });

      container.appendChild(deleteChecked);
    }

    return document.querySelector('#users').appendChild(container);
  };

  const userInput = selector => {
    return document.querySelector(selector).value;
  }

  function clearList() {
    document.querySelector('#users').innerHTML = '';
  }
