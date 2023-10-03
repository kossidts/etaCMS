"use strict";

import path from "node:path";

// const appRootPath = require("app-root-path");
import helpers from "./helpers.js";

const settings = {};
const etaPrefix = "eta-";

// ETA.resolve_path = helpers.resolve_path;
// ETA.require_module = helpers.require_module;

// Paths
settings.CONTENT_RELATIVE_PATH = "eta-content";
settings.THEME_RELATIVE_PATH = path.join(settings.CONTENT_RELATIVE_PATH, "themes");

/*
ETA.THEME_ROOT_PATH = ETA.resolve_path(ETA.THEME_RELATIVE_PATH);

ETA.PLUGIN_RELATIVE_PATH = ETA.CONTENT_RELATIVE_PATH + "/plugins";
ETA.PLUGIN_ROOT_PATH = ETA.resolve_path(ETA.PLUGIN_RELATIVE_PATH);

ETA.resolve_theme_path = (filePathStr = "") => ETA.resolve_path(ETA.THEME_RELATIVE_PATH, filePathStr);

// Password hash and verify
// CMS.hash_password = helpers.hash_password;
// CMS.verify_password = helpers.verify_password;

// CMS.make_slug = helpers.slugify;
// CMS.sanitize_filename = helpers.slugify_filename;

const { name, version } = appRootPath.require("package.json");
ETA.appName = name;
ETA.appVersion = version;
ETA.appInstalled = false;
ETA.appIsInstalling = false;
*/

/**
 * Configure the debug module
 *
 * @usage
 *  const debug = ETA.debugger('my-module');
 *  debug('This is a debug message')
 */
/*
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
// CMS.configs.COOKIE_SECRET = helpers.generate_salt(41, false);
// CMS.configs.COOKIE_SECRET = helpers.generate_simple_key(41, false);

// Set some constants
// CMS.SEC_IN_MS = 1000;
// CMS.MIN_IN_MS = 60 * CMS.SEC_IN_MS;
// CMS.HOUR_IN_MS = 60 * CMS.MIN_IN_MS;
// CMS.DAY_IN_MS = 24 * CMS.HOUR_IN_MS;
// CMS.WEEK_IN_MS = 7 * CMS.DAY_IN_MS;

// Logger
// CMS.logger = appRootPath.require("cms-libs/cms-logger.js").logger;

// Check if the node environment is set to production
ETA.isProduction = app => {
    if (app && typeof app.get === "function") {
        return app.get("env") === "production";
    }
    return process.env.NODE_ENV === "production";
};

// const bodyParser = require("body-parser");
// CMS.middlewares = {
//     jsonParser: bodyParser.json(),
//     urlencodedParser: bodyParser.urlencoded({ extended: true }),
// };

// CMS.renderer = require('ejs');
// CMS.template_extension = 'ejs';

// CMS.mkdir = helpers.mkdir;
// CMS.trimLChar = helpers.trimLChar;
// CMS.trimRChar = helpers.trimRChar;

// console.log(ETA);
*/

export default Object.freeze(settings);
