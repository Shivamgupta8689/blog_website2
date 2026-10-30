import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils.js';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 60000,
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

        // Timeout / cold-start — retry once automatically
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
        return { isSuccess: true, data: response.data };
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code,
        };
    }
};

// ── Status-code → user-friendly message map ───────────────────────
const statusMessages = {
    400: null,           // use backend message or fallback
    401: 'You are not authorized, please log in again.',
    403: 'You are not authorized, please log in again.',
    404: 'Server route not found.',
    409: 'This username already exists.',
    500: 'Something went wrong on the server, please try again later.',
};

const processError = (error) => {
    // Safe toJSON — only call if the method exists
    if (error?.toJSON) {
        // Do NOT log — could contain sensitive data
    }

    // ── Timeout / ECONNABORTED ────────────────────────────────────
    if (
        error.code === 'ECONNABORTED' ||
        error.code === 'ETIMEDOUT' ||
        error.message?.toLowerCase().includes('timeout')
    ) {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: 'TIMEOUT',
            serverMsg: 'The server is starting up, please try again in a minute.',
        };
    }

    // ── HTTP response received ────────────────────────────────────
    if (error.response) {
        const status = error.response.status;
        const backendMsg =
            error.response.data?.msg ||
            error.response.data?.message ||
            error.response.data?.error ||
            null;

        let serverMsg;
        if (status === 400) {
            serverMsg = backendMsg || 'Incorrect username or password.';
        } else if (statusMessages[status] !== undefined) {
            serverMsg = statusMessages[status];
        } else {
            serverMsg = backendMsg || API_NOTIFICATION_MESSAGES.responseFailure.message;
        }

        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: status,
            serverMsg,
        };
    }

    // ── Request was made but no response (Network/CORS) ───────────
    if (error.request) {
        return {
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: '',
            serverMsg: 'Cannot connect to the server. Please check your internet or the server status.',
        };
    }

    // ── Something else ────────────────────────────────────────────
    return {
        isError: true,
        msg: API_NOTIFICATION_MESSAGES.networkError,
        code: '',
        serverMsg: 'Cannot connect to the server. Please check your internet or the server status.',
    };
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: { Authorization: getAccessToken() },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let pct = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                    showUploadProgress(pct);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let pct = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                    showDownloadProgress(pct);
                }
            },
        });
}

export default API;
