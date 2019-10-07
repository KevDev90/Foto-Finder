class Photo {
  constructor(title, caption, url, id, favorite) {
    this.title = title;
    this.id = id || Date.now();
    this.favorite = favorite || false;
    this.caption = caption;
    this.url = url;
  }

toggleFavorite() {
  this.favorite = !this.favorite;
}

saveToLocal(pants) {
    localStorage.setItem(JSON.stringify(this.id), JSON.stringify(this));
  }

  removeFromLocal(id) {
    localStorage.removeItem(id);
  }
}
