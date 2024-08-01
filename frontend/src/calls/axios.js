import axios from "axios";

export let BASE = "http://localhost:8000";
// export let BASE  = "https://habiapi.rapidcrewtech.com";

axios.defaults.baseURL  = BASE + "/api";

export default axios;