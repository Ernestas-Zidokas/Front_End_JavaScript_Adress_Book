let usersArray = [];

document.querySelector('#addAdress').addEventListener('click', event => {
  let name = userInput('#name');
  let lastname = userInput('#lastname');
  let phone = userInput('#phone');
  let userObject = {name: name, lastname: lastname, phone: phone, isEdit: false};
  usersArray.push(userObject);

  clearList();
  document.querySelector('#users').appendChild(createList());
  window.localStorage.setItem('users', JSON.stringify(usersArray));
});

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

    let edditButton = document.createElement('button');
    if(user.isEdit) {
      edditButton.textContent ='Save';
    } else {
      edditButton.textContent ='Edit';
    }
    edditButton.type = 'button';
    edditButton.id = 'edit';

    edditButton.addEventListener('click', event => {
      if (usersArray[index].isEdit) {
        usersArray[index].name = fieldName.value;
        usersArray[index].lastname = fieldLastName.value;
        usersArray[index].phone = fieldPhone.value;
      }

      usersArray[index].isEdit = !usersArray[index].isEdit;
      clearList();
      createList();
      console.log(`${index} Edit`);
      window.localStorage.setItem('users', JSON.stringify(usersArray));
    });

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.type = 'button';

    deleteButton.addEventListener('click', event => {
      usersArray.splice(index, 1);
      console.log(usersArray);
      clearList();
      createList();
      window.localStorage.setItem('users', JSON.stringify(usersArray));
    });

    list.appendChild(edditButton);
    list.appendChild(deleteButton);
    container.appendChild(list);
  });

  return document.querySelector('#users').appendChild(container);
};

const userInput = selector =>{
  return document.querySelector(selector).value;
}

function clearList() {
  document.querySelector('#users').innerHTML = '';
}
