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
