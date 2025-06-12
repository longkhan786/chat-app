import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

export class ApiService {
    private responseHandler = (response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
    };

    private initAxiosService = async (with_token: boolean) => {
        const options = {
            baseURL: `http://localhost:8000/api/`,
            withCredentials: true,
        };
        return axios.create(options);
    };

    public get = async (url: string, options: Object = {}, with_token: boolean = true) => {
        const service = await this.initAxiosService(with_token);
        return this.responseHandler(await service.get(url, options));
    };

    public post = async (url: string, data: Object, options: Object = {}, with_token: boolean = true) => {
        const service = await this.initAxiosService(with_token);
        return this.responseHandler(await service.post(url, data, options));
    };

    public put = async (url: string, data: Object, options: Object = {}, with_token: boolean = true) => {
        const service = await this.initAxiosService(with_token);
        return this.responseHandler(await service.put(url, data, options));
    };

    public delete = async (url: string, options: Object = {}, with_token: boolean = true) => {
        const service = await this.initAxiosService(with_token);
        return this.responseHandler(await service.delete(url, options));
    };
}
