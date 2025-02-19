import axios from "axios";

const axiosInstance = axios.create({
  // firebase deployed
  // baseURL : "https://api-gzaowg74wq-uc.a.run.app"
  //  using render
    baseURL :'https://amazone-api.onrender.com'
});

export { axiosInstance };
