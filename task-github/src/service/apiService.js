/* eslint-disable no-undef */
export class ApiService {
  _url = `https://api.github.com/search/users?q=`

  getUsers() {
    return fetch(`${this._url}${searchName}`).then((res) => res.json())
  }
  getUserId(id) {
    return fetch(`${value.url}`).then((res) => res.json())
  }
  getRepo() {
    // eslint-disable-next-line no-undef
    return fetch(`${value.repos_url}`).then((res) => res.json())
  }
}
