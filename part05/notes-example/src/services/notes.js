import axios from "axios";
const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);
  // const nonExisting = {
  //   id: 10000,
  //   content: 'This note is not saved to server',
  //   important: true,
  // }
  // return request.then(res => res.data.concat(nonExisting));
  return request.then(res => res.data);

}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(res => res.data);
}

const deleteNote = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(res => res.data);
}

export default { getAll, create, update, deleteNote, setToken }
