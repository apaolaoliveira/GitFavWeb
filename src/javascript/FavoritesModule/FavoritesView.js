import { Favorites } from "./Favorites.js";

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector('table tbody');
    this.updateTable();
  }

  updateTable(){
    this.removeAllTableRows();

    this.entries.forEach(user => {
      const row = this.createRow();

      row.querySelector('.user #avatar').src = `https://github.com/${user.login}.png`;
      row.querySelector('.user #avatar').alt = `${user.name}'s profile picture`;
      row.querySelector('.user #github').href = `https://github.com/${user.login}`;
      row.querySelector('.user #name').textContent = user.name;
      row.querySelector('.user #username').textContent = user.login;
      row.querySelector('.github-info #repositories').textContent = user.public_repos;
      row.querySelector('.github-info #followers').textContent = user.followers;
      row.querySelector('.action #remove-btn').onclick = () => {
        const isOk = confirm('Are you sure about removing this favorite?');
        if (isOk) this.remove(user);        
      }

      this.tbody.append(row);
    });
  }

  createRow(){
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td>
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
      </td>`;
      
    return tableRow;
  }

  removeAllTableRows(){
    this.tbody.querySelectorAll('tr')
      .forEach((tableRow) => tableRow.remove());
  }
}