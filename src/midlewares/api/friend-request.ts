import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import Cookies from "js-cookie";

export enum Relation {
  none = 'None',
  friend = 'Friend',
  sender = 'Sender',
  receiver = 'Receiver',
}

export const getRelation = async (userId: number) => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.get(`${BASE_URL}/friend-request/relation/${userId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}

export const getListFriend = async () => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.get(`${BASE_URL}/friend-request/list-friend`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}

export const getListFriendAndUnreadMessage = async () => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.get(`${BASE_URL}/friend-request/list-friend-and-unread`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}

export const actionRequest = async (payload: {userId: number, type: string}) => {
  const { userId, type } = payload;
  const currentUser = JSON.parse(Cookies.get('user') ?? '');
  if(type === 'addfriend') {
    createFriendRequest(currentUser.userId, userId);
    return;
  }
  if(type === 'unfriend') {
    deleteFriendRequest(currentUser.userId, userId);
    deleteFriendRequest(userId, currentUser.userId);
    return;
  }
  if(type === 'accept') {
    createFriendRequest(currentUser.userId, userId);
    return;
  }
  if(type === 'cancel') {
    deleteFriendRequest(currentUser.userId, userId);
    return;
  }
  if(type === 'decline') {
    deleteFriendRequest(userId, currentUser.userId);
    return;
  }

  return;
}

const createFriendRequest = async (senderId: number, receiverId: number) => {
  const response = await axios.post(`${BASE_URL}/friend-request/add/${senderId}/${receiverId}`);
  return response.data; 
}

const deleteFriendRequest = async (senderId: number, receiverId: number) => {
  const response = await axios.post(`${BASE_URL}/friend-request/remove/${senderId}/${receiverId}`);
  return response.data; 
}

export const getListRequest = async () => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.get(`${BASE_URL}/friend-request/request`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}

export const getReceiverRequests = async () => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.get(`${BASE_URL}/friend-request/receiver`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return response.data;
}