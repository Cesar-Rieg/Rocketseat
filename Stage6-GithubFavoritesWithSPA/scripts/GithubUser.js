import * as CONSTANTS from './constants.js';

export class GithubUser {
    static fetchUserOnGithub(username){
        let url = `${CONSTANTS.GITHUB_API_ENDPOINT}${username}`;
        return fetch(url)
                .then(data => data.json())
                .then(data => {
                    return {
                       login: data.login,
                       name: data.name,
                       public_repos: data.public_repos,
                       followers: data.followers 
                    }
                })
    }
}