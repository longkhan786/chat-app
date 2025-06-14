import { ApiService } from "./apiService"; // same folder, no lib
const api = new ApiService();

export const useUserService = () => {
    const sendMessage = async (data: Object) => {
        return await api.post("user/sendMessage",  data);
    };

    const getUsers = async () => {
        return await api.get("user/users")
        .then((response) => {
            return response.data
        })
    };

    return {
        sendMessage,
        getUsers
    };
};
