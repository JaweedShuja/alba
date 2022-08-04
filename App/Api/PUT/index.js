import axios from '../axiosConfig';

const updatePassword = async (data) =>
  axios
    .put('/user/v1/updatePassword', {...data})
    .then((res) => res)
    .catch((err) => err);

const deleteExam = async (examId) =>
  axios
    .put('/exam/v1/deleteExam', {examId})
    .then((res) => res)
    .catch((err) => err);

const deleteFile = async (fileId) => {
  console.log('deleteFile', {fileId});
  return axios
    .put('/upload/v1/deleteFile', {fileId})
    .then((res) => res)
    .catch((err) => err);
};

const updateToken = async (params) => {
  console.log('updateToken', {params});
  return axios
    .put('/user/v1/updateToken', params)
    .then((res) => res)
    .catch((err) => err);
};

export default {
  updatePassword,
  deleteFile,
  deleteExam,
  updateToken,
};
