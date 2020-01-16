import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/";

export default {
  sendCSV: ({ file }) =>
    axios.post("", file, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }),
  getDatasets: () => axios.get("/dataset"),
  getErrors: id => axios.get(`/dataset/${id}/errors`)
};
