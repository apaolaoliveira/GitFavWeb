import { GithubUser } from "./GithubUser.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.loadFromLocalStorage();
  }

  loadFromLocalStorage(){
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
  }

  saveOnLocalStorage(){
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries));
  }

  async add(username){
    try {
      const user = await GithubUser.search(username);
      if(user.login === undefined) throw new Error('User not found, try another username');

      this.entries = [user, ...this.entries];
      this.updateTable();
      this.saveOnLocalStorage();
    } catch (err){
      alert(err.message);
    }
  }

  remove(user){
    this.entries = this.entries
      .filter((entry) => entry.login !== user.login);
    this.updateTable();
    this.saveOnLocalStorage();
  }
}