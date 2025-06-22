import axios from 'axios';

const API_URL = 'http://localhost:5000/api/files';

export const getFiles = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const downloadFile = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    responseType: 'blob',
  });
  return res;
}; 