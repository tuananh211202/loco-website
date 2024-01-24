import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Cookies from "js-cookie";

export const getListUser = async (filterOptions: { name: string }) => {
  const query = `page=1&pageSize=100000&name=${filterOptions.name}`;
  const response = await axios.get(`${BASE_URL}/user/list?${query}`);
  return response.data;
}

export const getUserById = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/user/id/${userId}`);
  return response.data;
}

export const updateUser = async (userData: any) => {
  const accessToken = Cookies.get('accessToken');
  return axios.post(`${BASE_URL}/user`, userData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export const getInfo = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/user/info/${userId}`);
  return response.data;
}

export const updatePassword = async (updateData: { oldPassword: string, newPassword: string }) => {
  const accessToken = Cookies.get('accessToken');
  return axios.post(`${BASE_URL}/user/updatePassword`, updateData, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}