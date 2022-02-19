import { BaseResponse } from "types";
import axios, { AxiosRequestConfig, CancelToken } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACK_URL;
const baseLocalURL = process.env.NEXT_PUBLIC_LOCAL_URL;

export interface IParams {
  [key: string]: string;
}

export interface IHeader {
  [key: string]: any;
}

export interface IBody {
  [key: string]: any;
}

export interface IOption {
  body?: IBody;
  hasAuth?: boolean;
  headers?: IHeader;
  params?: IParams;
  cancelToken?: CancelToken;
  isLocal?: boolean;
}

const getToken = () => localStorage.getItem("jwt_token");
const getAuth = (hasAuth = false) =>
  hasAuth && getToken()
    ? {
        Authorization: `Bearer ${getToken()}`,
      }
    : {};

const genHeader = (hasAuth = false, headers = {}) =>
  Object.assign(headers, getAuth(hasAuth));

const handleError = (err: any, reject: any) => {
  if (err && err?.response?.status === 401) {
    ///TODO reset user information status code 401
    return reject(err.response?.data || "Нэвтрэх эрхийн хугацаа дууссан");
  }

  if (err && err.response && err.response.data) {
    return reject(err.response.data);
  }
  return reject({ message: "Сүлжээний алдаа дахин оролдоно уу" });
};

const request = async <T>(options: AxiosRequestConfig, isLocal = false) => {
  return new Promise<BaseResponse<T>>((resolve, reject) => {
    axios
      .request<BaseResponse<T>>({
        baseURL: isLocal ? baseLocalURL : baseURL,
        ...options,
      })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => handleError(err, reject));
  });
};

const http = {
  get: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: "GET",
        url,
        headers: genHeader(options?.hasAuth, options?.headers) as any,
        params: options?.params,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false
    ).then((data) => data.data);
  },
  post: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: "POST",
        url,
        headers: genHeader(options?.hasAuth, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false
    ).then((data) => data.data);
  },
  put: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: "PUT",
        url,
        headers: genHeader(options?.hasAuth, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false
    ).then((data) => data.data);
  },
  del: async <T>(url: string, options?: IOption): Promise<T> => {
    return request<T>(
      {
        method: "DELETE",
        url,
        headers: genHeader(options?.hasAuth, options?.headers) as any,
        data: options?.body,
        cancelToken: options?.cancelToken,
      },
      options?.isLocal || false
    ).then((data) => data.data);
  },
  cancelToken: axios.CancelToken.source(),
};

export default http;
