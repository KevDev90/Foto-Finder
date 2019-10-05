var photoArr = [];
var addButton = document.querySelector('.add-to-album')
var titleInput = document.querySelector('.title-input')
var captionInput = document.querySelector('.caption-input')
var urlInput = document.querySelector('.url-input')
var photoDisplay = document.querySelector('.main-2');
var inputs = document.querySelectorAll('input');

addButton.addEventListener('click', addNewPhoto);

inputs.forEach(function(input){
  console.log(input.name);
  return input.addEventListener('keyup', updateErrors);
})

window.onload = function checkStorage() {
  console.log('Loaded')
  if (localStorage) {
    for (var i=0; i < localStorage.length; i++) {
      var id = localStorage.key(i);
      var item = JSON.parse(localStorage.getItem(id));
      createCard(item)
      photoArr.push(item);
    }
  }
}

function addNewPhoto() {
  var newPhoto = makeInstance();
  createCard(newPhoto);
  newPhoto.saveToLocal(photoArr);
 }

 function makeInstance() {
   var photo = new Photo(titleInput.value,captionInput.value,urlInput.value);
   photoArr.push(photo);
   return photo;
 }

 function createCard(newPhoto) {
   photoDisplay.insertAdjacentHTML('beforeend', `<div id= "${newPhoto.id}" class= "card-div">
     <p class= "img-title">${newPhoto.title}</p>
     <img class="insert-photo" src=${newPhoto.url}>
     <p class="img-caption">${newPhoto.caption}</p>
     <div class= "button-section">
     <button class="delete-card" type="button"onclick= "deleteCard(event)"></button>
     <button class="favorite-card" type="button" onclick= "favoriteButton(event)"></button>
     </div>
     </div>`);
   }

 function favoriteButton(event) {
  var hiddenId = event.target.closest('.card-div').id;
  var favButton = document.querySelector('favorite-card')
  var instance = photoArr.find(function(photo){
    return photo.id === Number(hiddenId);
  })
  instance.toggleFavorite();
  if (!instance.favorite) {
    event.target.classList.remove('favorite');
  } else {
    event.target.classList.add('favorite');
  }
}

function deleteCard(event) {
  var hiddenId = event.target.closest('.card-div').id;
  var deleteBtn = document.querySelector('.delete-card');
    removeCardObj(deleteBtn, hiddenId);
    event.target.closest('.card-div').remove();
    var instance = photoArr.find(function(photo){
      return photo.id === Number(hiddenId);
    })
    instance.removeFromLocal(hiddenId);
    }

    function removeCardObj(photoArr, id) {
  for (var i = 0; i < photoArr.length; i++)
    if (photoArr[i].id === Number(id)) {
        photoArr.splice(i, 1);
        break;
    }
}

function updateErrors(e) {
    if (e.target.value === '') {
      document.querySelector(`.${e.target.name}-error`).style.visibility = 'visible';
      addButton.disabled = true;
    } else {
      document.querySelector(`.${e.target.name}-error`).style.visibility = 'hidden';
    }
   if (titleInput.value !== '' &&
          captionInput.value !== '' &&
          urlInput.value !== '') {
        makeAlbumEnabled();
          }
  }

function makeAlbumEnabled() {
  addButton.disabled = false;
}
