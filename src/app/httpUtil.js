import axios from "axios";

export function get(url, db) {
  //data tanne
  // let headers = {};
  // headers['schema'] = 'testdb';
  return axios({
    method: "GET",
    url: url,
    headers: { schema: db },
    responseType: "json"
  });
}

export function post(url, data) {
  // naya data create garne
  return axios({
    method: "POST",
    url: url,
    data: data
  });
}

export function put(url, data) {
  return axios({
    method: "PUT",
    url: url,
    data: data
  });
}

export function remove(url) {
  return axios({
    method: "DELETE",
    url: url
  });
}
