import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Cookies from "js-cookie";

export const getChat = async (userId: number) => {
  if(userId === 0) return [];
  const accessToken = Cookies.get('accessToken');
  const response = await axios.get(`${BASE_URL}/message/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}

export const sendMessage = async (payload: { userId: number, message: string }) => {
  if(payload.userId === 0) return;
  const accessToken = Cookies.get('accessToken');
  await axios.post(`${BASE_URL}/message/${payload.userId}`, { message: payload.message }, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return;
}