import axios from "axios";

const instance = axios.create({

  baseURL: "https://kefbackend.herokuapp.com"
});

export default instance;