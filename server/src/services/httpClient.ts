import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import moment from "moment";
import {createMessage, Logger} from "../helpers/logger";

const MAX_CONTENT_SIZE_IN_BYTES = 100 * 1024 * 1024;

class HttpClient {
  instance: any;
  context: any;
  requestStartTime: any;
  patchedConfig: any;

  constructor(config: any) {
    this.instance = axios.create({
      ...config,
      maxContentLength: MAX_CONTENT_SIZE_IN_BYTES,
      timeout: 30000
    });

    this.instance.interceptors.request.use(
        (request: AxiosRequestConfig) => {
          const {data, url, method, headers} = request;
          const {requestId, user, operationName} = this.context;
          Logger.log(
              'info',
              `BE Request (${createMessage({
                requestId, user, method, url,
              }, data)})`,
              {operationName},
          );
          this.requestStartTime = moment().utc();
          request.headers = {...headers};
          return request;
        }
    );

    this.instance.interceptors.response.use(
        (response: AxiosResponse) => {
          const {statusText, data} = response;
          const {requestId, user, operationName} = this.context;
          const requestEndTime = moment.utc();
          const requestTime = `${requestEndTime.diff(this.requestStartTime, 'milliseconds')} ms`;
          Logger.log(
              'info',
              `BE Response (${createMessage({
                requestId, user, statusText, requestTime,
              }, data)})`,
              {operationName},
          );
          return response;
        },
        (error: any) => {
          if (error.response) {
            const {response} = error;
            const {status, statusText, data} = response;
            const {requestId, user, operationName} = this.context;
            Logger.log(
                'error',
                `BE Error (${createMessage({
                  requestId, user, status, statusText,
                }, data)})`,
                {operationName},
            );
          }
          return Promise.reject(error);
        },
    );

  }

  get(context: any, path: string, config: any) {
    this.patchedConfig = this.patchConfig(context, config);
    this.context = this.patchContext(context);
    return this.instance.get(path, this.patchedConfig);
  }

  post(context: any, path: string, body: any, config?: any) {
    this.patchedConfig = this.patchConfig(context, config);
    this.context = this.patchContext(context);
    return this.instance.post(path, body, this.patchedConfig);
  }

  patchContext(context: any) {
    return context || {};
  }

  patchConfig(rawContext: any, rawConfig: {}) {
    return rawConfig || {};
  }
}

export default HttpClient;
