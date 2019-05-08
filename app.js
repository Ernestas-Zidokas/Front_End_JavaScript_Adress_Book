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
    document.querySelector('#users').appendChild(createList());
  }
});

function createList() {
  let container = document.createElement('ul');

  usersArray.forEach((user, index)=>{
    let list = document.createElement('li');
    console.log(1);

    let fieldName = document.createElement(user.isEdit ? 'input' : 'span');
    let fieldLastName = document.createElement(user.isEdit ? 'input' : 'span');
    let fieldPhone = document.createElement(user.isEdit ? 'input' : 'span');
    console.log(2, fieldLastName);

    if(user.isEdit){
      fieldName.type= "text";
      fieldLastName.type= "text";
      fieldPhone.type= "number";
    }

    // fieldName[user.isEdit ? 'value' : 'textContent'] = user.name;
    if(user.isEdit){
      fieldName.value = user.name;
    } else {
      fieldName.textContent = user.name;
    }
    list.appendChild(fieldName);
    console.log(3);

    fieldLastName[user.isEdit ? 'value' : 'textContent'] = user.lastname;
    list.appendChild(fieldLastName);

    // fieldPhone[user.isEdit ? 'value' : 'textContent'] = `Nr. ${user.phone}`;
    list.appendChild(fieldPhone);

    console.log(4);

    let edditButton = document.createElement('button');
    edditButton.textContent = 'Edit';
    edditButton.type = 'button';
    edditButton.id = 'edit';
    console.log(5);
    edditButton.addEventListener('click', event => {
      usersArray[index].isEdit = true;
      createList();
      console.log(`${index} Edit`);
    });

    console.log(6);
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.type = 'button';
    console.log(7);
    deleteButton.addEventListener('click', event => {
      console.log('Delete');
      usersArray[index].name = '';
      usersArray[index].lastname = '';
      usersArray[index].phone = '';
    });
    console.log(8);
    list.appendChild(edditButton);
    console.log(9);
    list.appendChild(deleteButton);
    console.log(10, list);
    container.appendChild(list);
    console.log(11);
  });
  console.log(container);
  return container;
};

const userInput = selector =>{
  return document.querySelector(selector).value;
}

function clearList() {
  document.querySelector('#users').innerHTML = '';
}
