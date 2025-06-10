import { useApi } from "./UseApi";

export const useUserService = () => {

  const API = new useApi();

  const getUsers = async () => {
    // Fetch users from API
  };

  const sendMessage = async (params: object) => {
    // Send a message to the API
    return await API.post('/user/sendMessage', params);
  };

  return {
    getUsers,
    sendMessage,
  };
};
