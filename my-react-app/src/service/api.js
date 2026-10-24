import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils.js';

const API_URL = 'https://blog-website2-s64y.onrender.com';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 60000, // Render free tier cold start ke liye 60 sec
});

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE?.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE?.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    async function (error) {
        const config = error.config;

        // Timeout / cold start par ek baar auto-retry
        if (
            config &&
            !config._retried &&
            (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT')
        ) {
            config._retried = true;
            return axiosInstance(config);
        }

        return Promise.reject(processError(error));
    }
);

const processResponse = (response) => {
    if (response?.status >= 200 && response?.status < 300) {
        return {
            isSuccess: true,
            data: response.data,
        };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code,
        };
    }
};

const processError = (error) => {
    const log = error?.toJSON ? error.toJSON() : error;

    if (error.response) {
        console.log('Error in Response:', log);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status,
        };
    } else if (error.request) {
        console.log('Error in request:', log);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: '',
        };
    } else {
        console.log('Error in network:', log);
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: '',
        };
    }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                Authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            },
        });
}

export default API;
