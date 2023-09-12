import * as CONSTANTS from './constants.js';
import { GithubUser } from './GithubUser.js';
import { NotificationManager } from './NotificationManager.js';


export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root);
        this.load();
    }

    load() {
        const entities = this.getEntitiesFromLocalStorage();
        this.entities = entities;
    }

    delete(entity) {
        const filteredEntities = this.entities.filter(e => e.login != entity.login);
        this.entities = filteredEntities;

        this.update();
        this.setEntityToLocalStorage();
        NotificationManager.showNotification(true, `O usuário ${entity.login} foi removido com sucesso!`);
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root);

        this.tBody = this.root.querySelector("tbody");

        this.update();
        this.onClickAddGithubUser();
    }

    addEventListenerOnButtonRemoveEntity(tableRow, entity){
        tableRow.querySelector('#btn-remove-entity').addEventListener('click', () => {
            if (confirm(`Tem certeza que deseja remover o perfil de ${entity.name}?`)) {
                this.delete(entity);
            }
        })
    }

    createTableRow(entity) {
        const tr = document.createElement('tr');

        tr.innerHTML = this.getTableRowElement(entity);

        this.addEventListenerOnButtonRemoveEntity(tr, entity);

        return tr;
    }

    exists(login){
        let entities = this.getEntitiesFromLocalStorage();
        return entities.find(e => e.login.toLowerCase() === login.toLowerCase());
    }

    getEntitiesFromLocalStorage() {
        return JSON.parse(localStorage.getItem(CONSTANTS.GITHUB_FAVORITES_KEY)) || [];
    }

    setEntityToLocalStorage(){
        let jsonEntities = JSON.stringify(this.entities);
        localStorage.setItem(CONSTANTS.GITHUB_FAVORITES_KEY, jsonEntities);
    }

    getTableRowElement(entity) {
        return `<tr>
                    <td class="td user">
                        <img class="user-image" src="https://github.com/${entity.login}.png" alt="Imagem de capa do usuário ${entity.name}">
                        <a class="user-link" href="https://github.com/${entity.login}" target="_blank">
                            <p class="username">${entity.name}</p>
                            <span>${entity.login}</span>
                        </a>
                    </td>
                    <td class="td repositories">
                        ${entity.public_repos}
                    </td>
                    <td class="td followers">
                        ${entity.followers}
                    </td>
                    <td class="td">
                        <button id="btn-remove-entity" class="btn-remove">&times;</button>
                    </td>
                </tr>`;
    }

    onClickAddGithubUser() {
        const btnAdd = this.root.querySelector('#btn-search');
        btnAdd.addEventListener('click', () => {
            let { value } = this.root.querySelector('#github-user');
            this.add(value);
        });
    }

    async add(username){
        let githubUser = null;

        try {
            if (username === ""){
                throw new Error("É necessário informar um nome válido para realizar a busca.");
            }

            if (this.exists(username)){
                throw new Error(`O usuário "${username}" já está cadastrado.`);
            }

            githubUser = await GithubUser.fetchUserOnGithub(username);

            if (githubUser?.login === undefined ?? true){
                throw new Error(`Usuário "${username}" não encontrado.`);
            }

            // spread operator ...this.entities => vai pegar os itens contidos no array, e vai espalhar dentro de um novo array.
            this.entities = [githubUser, ...this.entities];

            this.update();
            this.setEntityToLocalStorage();
            NotificationManager.showNotification(true, `O usuário ${username} foi adicionado com sucesso!`);
        }
        catch(error) {
            NotificationManager.showNotification(false, error.message);
        }
    }

    update() {
        this.removeAllTableRow();

        this.entities.forEach((entity) => {
            const row = this.createTableRow(entity);
            this.tBody.append(row);
        })

    }

    removeAllTableRow(){
        this.tBody.querySelectorAll("tr")
            .forEach((tr) => {
                tr.remove();
            });
    }
}
