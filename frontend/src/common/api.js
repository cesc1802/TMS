import axios from "axios";

const baseURL = "http://10.0.16.58:1802/api";

const request = axios.create({
    baseURL
});

const _request = method => (url, payload, options = {}) => {
    return request({
        method,
        url,
        headers: "",
        data: payload,
        ...options
    });
};

const methods = {
    get: (url, options) => _request("get")(url, null, options),
    post: (url, payload, options) => _request("post")(url, payload, options),
    put: (url, payload, options) => _request("put")(url, payload, options),
    patch: (url, payload, options) => _request("patch")(url, payload, options),
    delete: (url, options) => _request("delete")(url, null, options)
};

export default methods;
