"use strict";

const appRootPath = require("app-root-path");
const helpers = require("./helpers");

const ETA = global.ETA || {};
const etaPrefix = "eta-";

// Path and url resolver
ETA.resolve_path = helpers.resolve_path;
ETA.resolve_uri = helpers.resolve_uri;

// Module loader
ETA.require_module = helpers.require_module;

// Paths
ETA.CONTENT_RELATIVE_PATH = "eta-content";

ETA.THEME_RELATIVE_PATH = ETA.CONTENT_RELATIVE_PATH + "/themes";
ETA.THEME_ROOT_PATH = ETA.resolve_path(ETA.THEME_RELATIVE_PATH);

ETA.PLUGIN_RELATIVE_PATH = ETA.CONTENT_RELATIVE_PATH + "/plugins";
ETA.PLUGIN_ROOT_PATH = ETA.resolve_path(ETA.PLUGIN_RELATIVE_PATH);

ETA.resolve_theme_path = (filePathStr = "") => ETA.resolve_path(ETA.THEME_RELATIVE_PATH, filePathStr);

const { name, version } = appRootPath.require("package.json");
ETA.appName = name;
ETA.appVersion = version;
ETA.appInstalled = false;
ETA.appIsInstalling = false;

/**
 * Configure the debug module
 *
 * @usage
 *  const debug = ETA.debugger('my-module');
 *  debug('This is a debug message')
 */
const _debug = require("debug")(ETA.appName);
ETA.debugger = namespace => {
    if (typeof namespace === "string" && namespace.trim() !== "") {
        return _debug.extend(namespace.trim());
    }
    return _debug;
};

const debug = ETA.debugger("settings");

// Load configs
ETA.configs = {};

try {
    debug("Try to load config file");
    let configs = ETA.require_module("eta-config.js");
    ETA.configs = { ...configs };
    debug("Settings loaded from configs file");
} catch (e) {
    debug(e.code + " - Now use environment variables if provided");
} finally {
    debug("DB Configs will be overwritten with environment variables if provided");
    ETA.configs.DB_HOST = process.env.DB_HOST || ETA.configs.DB_HOST;
    ETA.configs.DB_NAME = process.env.DB_NAME || ETA.configs.DB_NAME;
    ETA.configs.DB_USER = process.env.DB_USER || ETA.configs.DB_USER;
    ETA.configs.DB_PASSWORD = process.env.DB_PASSWORD || ETA.configs.DB_PASSWORD;
    ETA.configs.DB_TABLE_PREFIX = process.env.DB_TABLE_PREFIX || ETA.configs.DB_TABLE_PREFIX;
}

ETA.configs.LIMIT_INSTALL_MAX_TRIES = process.env.LIMIT_INSTALL_MAX_TRIES || 3;
ETA.configs.PORT = process.env.PORT || 8888;

// Check if the node environment is set to production
ETA.isProduction = app => {
    if (app && typeof app.get === "function") {
        return app.get("env") === "production";
    }
    return process.env.NODE_ENV === "production";
};
