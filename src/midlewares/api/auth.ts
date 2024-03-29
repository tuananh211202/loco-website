import axios from "axios"
import { BASE_URL } from "../../utils/constants";

type LoginData = {
  email: string;
  password: string;
}

type SignupData = {
  email: string;
  password: string;
  name: string;
  description: string;
}

export const signIn = async (loginData: LoginData) => {
  const response = await axios.post(`${BASE_URL}/auth/login`, loginData);
  return response.data;
}

export const signUp = async (signupData: SignupData) => {
  const response = await axios.post(`${BASE_URL}/auth/signup`, {
    ...signupData,
    description: signupData.description ? signupData.description : '',
  });
  return response.data;
}