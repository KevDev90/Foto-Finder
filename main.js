var photoArr = [];
var addButton = document.querySelector('.add-to-album')
var titleInput = document.querySelector('.title-input')
var captionInput = document.querySelector('.caption-input')
var urlInput = document.querySelector('.url-input')
var photoDisplay = document.querySelector('.main-2');
var inputs = document.querySelectorAll('input');

addButton.addEventListener('click', addNewPhoto);

inputs.forEach(function(input){
  console.log(input.name)
  return input.addEventListener('keydown', updateErrors);
})

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

// function updateErrors() {
//    if (titleInput.value === '' ||
//        captionInput.value === '' ||
//        urlInput.value === '') {
//       addButton.disabled = true;
// } else {
//     makeAlbumEnabled()
//     document.querySelector('.title-error').style.visibility = 'hidden';
//     document.querySelector('.caption-error').style.visibility = 'hidden';
//     document.querySelector('.URL-error').style.visibility = 'hidden';
//     // addNewPhoto();
//   }
// }

function updateErrors(e) {
  if (e.value === '') {
    document.querySelector(`.${e.target.name}-error`).style.visibility = 'visible';
    addButton.disabled = true;
  } else {
    console.log(`.${e.target.name}-error`);
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

// 1. create single setError function
// 1 var, pass it the input
// 2. space out the input slightly
// 3. append html into the document
// 4. use function argument to determine error message
// 5. create checkForErrors

// function setError() {
//   var setParagraph = document.createElement("P");
//   var errorMsg = document.createTextNode("Field Required!")
//   titleInput.appendChild(errorMsg);
//   captionInput.appendChild(errorMsg);
//   urlInput.appendChild(errorMsg);
// }
//
// function titleError() {
//    var titleInputError = document.querySelector('.title-error');
//    var titleInput = document.querySelector('.title-input');
//    titleInputError.style.visibility = 'visible';
//    document.querySelector('.title-error').innerHTML = "<img class='error' src='images/error-icon.svg'> Field Required";
//    titleInput.style.border = '1px solid #DD1972';
// }
//
// function captionError() {
//     var captionInput = document.querySelector('.caption-input');
//     document.querySelector('.caption-error').style.visibility = 'visible';
//     document.querySelector('.caption-error').innerHTML = "<img class='error' src='images/error-icon.svg'> Field Required!";
//     captionInput.style.border = '1px solid #DD1972';
// }
//
// function urlError() {
//     var urlInput = document.querySelector('.url-input');
//     document.querySelector('.URL-error').style.visibility = 'visible';
//     document.querySelector('.min-error').innerHTML = "<img class='error' src='images/error-icon.svg'> Field Required";
//     urlInput.style.border = '1px solid #DD1972';
// }
