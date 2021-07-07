import axios from "axios";

const instance = axios.create({

  baseURL: "https://backend-kef.herokuapp.com/"

});

export default instance;