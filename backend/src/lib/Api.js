"use strict";

const express = require("express");
const auth = require("./auth");

const ACTION_MAP = {
    get: "read",
    post: "create",
    put: "update",
    patch: "update",
    delete: "delete"
};

module.exports = ({ name, prefix, option = {} }) => {
    const router = express.Router();
    const route = verb => {
        return (path, handler, config = {}) => {
            config = {
                ...option,
                ...config
            };
            config.action = config.action || ACTION_MAP[verb];
            config.resource = name;
            router[verb](prefix + path, [auth(config), handler]);
        };
    };
    const getRouter = () => {
        return router;
    };
    return {
        get: route("get"),
        post: route("post"),
        put: route("put"),
        delete: route("delete"),
        del: route("delete"),
        patch: route("patch"),
        getRouter
    };
};
