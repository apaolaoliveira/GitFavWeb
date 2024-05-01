import { Favorites } from "./Favorites.js";

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector('table tbody');
    this.updateTable();
    this.onSearchClick();
  }

  onSearchClick(){
    const searchButton = this.root.querySelector('#search-button');
    searchButton.onclick = () => {
      const { value } = this.root.querySelector('#search-input');
      this.add(value);
    }
  }

  updateTable(){
    this.removeAllTableRows();

    this.entries.forEach(user => {
      const row = this.createRow();

      const selectorsMap = {
        name: '.user #name',
        login: '.user #username',
        githubLink: '.user #github',
        avatar: '.user #avatar',
        public_repos: '.github-info #repositories',
        followers: '.github-info #followers',
        removeBtn: '.action #remove-btn'
      };

      Object.entries(selectorsMap).forEach(([key, selector]) => {
        const element = row.querySelector(selector);
        switch (key) {
          case 'avatar':
            element.src = `https://github.com/${user.login}.png`;
            element.alt = `${user.name}'s profile picture`;
            break;
          case 'githubLink':
            element.href = `https://github.com/${user.login}`; 
            break;
          case 'removeBtn':
            element.onclick = () => {
              if (confirm('Are you sure about removing this favorite user?')) 
                this.remove(user);
            };
            break;
          default:
            element.textContent = user[key];
            break;
        }
      });

      this.tbody.append(row);
    });
  }

  createRow(){
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = 
    ` <td>
        <div class="user">
          <img id="avatar" src="" alt="">
          <a id="github" href="" target="_blank">
            <p id="name"></p>
            <span id="username"></span>
          </a>
        </div>
      </td>
      <td class="github-info">
        <span id="repositories"></span>
      </td>
      <td class="github-info">
        <span id="followers"></span>
      </td>
      <td class="action">
        <button id="remove-btn">&times;</button>
      </td> `;
      
    return tableRow;
  }

  removeAllTableRows(){
    this.tbody.querySelectorAll('tr')
      .forEach((tableRow) => tableRow.remove());
  }
}