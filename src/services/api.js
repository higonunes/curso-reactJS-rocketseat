import axios from 'axios';

const api = axios.create({
  baseURL: "https://hero-back.herokuapp.com/"
})

export default api;