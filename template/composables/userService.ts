import { ApiService } from "./apiService"; // same folder, no lib
const api = new ApiService();

export const useUserService = () => {
    const sendMessage = async (data: Object) => {
        return await api.post("user/sendMessage",  data);
    };

    return {
        sendMessage,
    };
};
