class Photo {
  constructor(title, caption, url) {
    this.title = title;
    this.id = Date.now();
    this.favorite = false;
    this.caption = caption;
    this.url = url;
  }

toggleFavorite() {
  this.favorite = !this.favorite;
}

saveToLocal(photoArr) {
    localStorage.setItem(JSON.stringify(this.id), JSON.stringify(this));
  }

  removeFromLocal(id) {
    localStorage.removeItem(id);
  }
}

window.onbeforeunload = function reInstantiateLocal() {
  var photo = new Photo(titleInput.value,captionInput.value,urlInput.value);
  photoArr.push(photo);
  return photo;
    window.localStorage.setItem("Id", photo);
  }
    
