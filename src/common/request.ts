import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
};

class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  private handleError(error: AxiosResponse): Promise<AxiosResponse> {
    const { status } = error;

    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        break;
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        break;
      }
      default: {
        break;
      }
    }

    return Promise.reject(error);
  }

  private handleResponse(response: AxiosResponse) {
    // * 只返回响应体
    return response.data;
  }

  initHttp() {
    const http = axios.create({
      baseURL: "https://api.finmindtrade.com/api/v4",
      headers,
    });

    // * 请求过滤器
    http.interceptors.request.use(
      (config) => {
        // * 统一处理
        config.params.token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wMi0yNSAxNTo1Nzo1OSIsInVzZXJfaWQiOiJpc2VuIiwiaXAiOiIxMDMuMTkyLjIyNS4xOCJ9.MlGWbxJVLufeM2ID8GFUlt3FSsq94bZ1IkMvpM8fnbs";

        return config;
      },
      (error) => Promise.reject(error)
    );

    // * 响应过滤器
    http.interceptors.response.use(
      (response) => this.handleResponse(response),
      (error) => this.handleError(error)
    );

    this.instance = http;
    return http;
  }

  get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }
}

// * 导出
const http = new Http();
export default http;
