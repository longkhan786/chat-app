import { useApi } from "./UseApi";

export const useUserService = () => {

  const API = new useApi();

  const getUsers = async () => {
    // Fetch users from API
  };

  const sendMessage = async (params: object) => {
    return await API.post('/user/sendMessage', params);
  };

  const fetchMessages = async () => {
    return await API.get('/user/fetchMessages')
    .then((response) => {
      return response.data
    })
  };


  return {
    getUsers,
    sendMessage,
    fetchMessages
  };
};
