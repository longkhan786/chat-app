import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';

export class useApi {
  
  private responseHandler = (response: AxiosResponse) => {
    if(response.status >= 200 && response.status < 300) {
      return response.data;
    }
  }

  private errorHandler = async (error: AxiosError) => {
  };



  private initAxiosService = async (with_token: Boolean) => {

    let options:{
      baseURL: String,
    } = {
        baseURL:`http://localhost:8000/api/`,
    };

    const service = axios.create(options)
  
    return service; 
  }

  public get = async (url:string, options:Object = {}, with_token:Boolean = true) => {
    try
    {
      const service  = await this.initAxiosService(with_token)
      return this.responseHandler(await service.get(url, options))
    }
    catch(error)
    {
      return Promise.reject( await this.errorHandler(error as AxiosError));
    }
  }

  public put = async (url:string, data:Object, options:Object = {}, with_token:Boolean = true) => {
    try
    {
      const service  = await this.initAxiosService(with_token)
      return this.responseHandler(await service.put(url, data, options))
    }
    catch(error)
    {
      return Promise.reject( await this.errorHandler(error as AxiosError));
    }
  }

  public post = async (url: string, data:Object, options:Object = {}, with_token:Boolean = true) => {
    try
    {
      const service  = await this.initAxiosService(with_token)
      return this.responseHandler(await service.post(url, data, options))
    }
    catch(error)
    { 
      return Promise.reject( await this.errorHandler(error as AxiosError));
    }
  }

  public delete = async (url: string, options:Object, with_token:Boolean = true) => {
    try
    {
      const service  = await this.initAxiosService(with_token)
      return this.responseHandler(await service.delete(url, options))
    }
    catch(error)
    {
      return Promise.reject( await this.errorHandler(error as AxiosError));
    }
  }
}

export const API = new useApi();
