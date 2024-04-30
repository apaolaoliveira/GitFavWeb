export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
  }

  remove(user){
    this.entries = this.entries
      .filter((entry) => entry.login !== user.login);
    this.update();
  }
}