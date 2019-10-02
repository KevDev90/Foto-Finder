var photoArr = [];
var addButton = document.querySelector('.add-to-album')
var titleInput = document.querySelector('.title-input')
var captionInput = document.querySelector('.caption-input')
var urlInput = document.querySelector('.url-input')
var photoDisplay = document.querySelector('.main-2');

addButton.addEventListener('click', addNewPhoto);

function addNewPhoto() {
  var newPhoto = makeInstance();
  createCard(newPhoto,photoDisplay);
  newPhoto.saveToLocal(photoArr);
 }

 function makeInstance() {
   var photo = new Photo(titleInput.value,captionInput.value,urlInput.value);
   photoArr.push(photo);
   return photo;
 }

 function createCard(newPhoto,photoDisplay) {
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
