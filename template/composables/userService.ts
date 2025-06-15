'use client' // ✅ This is also needed here!

import { ApiService } from "./apiService";
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/authSlice';

export const useUserService = () => {
    const api = new ApiService();
    const dispatch = useDispatch();

    const sendMessage = async (data: Object) => {
        return await api.post("user/sendMessage", data);
    };

    const getUsers = async () => {
        const response = await api.get("user/users");
        return response.data;
    };

    const signUp = async (data: object) => {
        return await api.post("user/signup", data);
    };

    const login = async (data: object) => {
        const response = await api.post("user/login", data);
        dispatch(setUser(response.data.user)); // Ensure correct key
        return response;
    };

    return {
        sendMessage,
        getUsers,
        signUp,
        login,
    };
};
