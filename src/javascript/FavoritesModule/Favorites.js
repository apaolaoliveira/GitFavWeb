export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load(){
    this.entries = [
      {
        login: 'apaolaoliveira',
        name: 'Paola Oliveira',
        public_repos: '50',
        followers: '20'
      }
    ];
  }
}