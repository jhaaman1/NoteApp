import axios from "axios";
const API_HOST = "http://localhost:8080";

class NoteServices {
  postNotesData(data) {
    return axios({
      method: "POST",
      url: API_HOST + "/api/users",
      data: data,
    });
  }

  getAllNotes(page, name, totalEntries, searchText) {
    return axios({
      method: "get",
      url: `${API_HOST}/api/getUser?page=${page}&searchName=${searchText}&pageSize=${totalEntries}`,
    });
  }

  IsDeleteNotes(_id) {
    return axios({
      method: "delete",
      url: `${API_HOST}/delete/${_id}`,
    });
  }

  IsEditNotes(_id, data) {
    return axios({
      method: "patch",
      url: `${API_HOST}/edit/${_id}`,
      data: data,
    });
  }

  IsCloneNotes(_id, data) {
    return axios({
      method: "post",
      url: `${API_HOST}/api/clone/${_id}`,
      data: data,
    });
  }
}

export default new NoteServices();
