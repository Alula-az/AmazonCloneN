import axios from "axios";

const axiosInstance = axios.create({
  // firebase deployed
  // baseURL : "https://api-gzaowg74wq-uc.a.run.app"
  //  using render
  // baseURL :'https://amazone-api.onrender.com'
  
  baseURL: "http://127.0.0.1:5001/clone-f9d32/us-central1/api",
});

export { axiosInstance };
