"use strict";

import path from "node:path";
import { readFile } from "node:fs/promises";
import debug from "debug";

import config from "../eta-config.js";
// import helpers from "./helpers.js";
// const appRootPath = require("app-root-path");

// const { default: pkg } = await import(path.join(config.AppRoot, "../package.json"), { assert: { type: "json" } });
const pkg = JSON.parse(await readFile(new URL("../package.json", config.AppRoot), { encoding: "utf8" }));

/** @type {string} */
const CONTENT_RELATIVE_PATH = "eta-content";

/** @type {string} */
const THEME_RELATIVE_PATH = path.join(CONTENT_RELATIVE_PATH, "themes");

/**
 * Configure the debug module
 *
 * @usage
 *  const debug = ETA.debugger('my-module');
 *  debug('This is a debug message')
 */
const _debug = debug(pkg.name);

/**
 * @typedef {function} DebuggerFunction
 * @param {string} namespace - The namespace for debugging.
 * @returns {function} The debug function.
 */
const _debugger = namespace => {
    if (typeof namespace === "string" && namespace.trim() !== "") {
        return _debug.extend(namespace.trim());
    }
    return _debug;
};

/**
 * @typedef {Object} ETA
 * @property {string} appRoot
 * @property {string} appName
 * @property {string} appVersion
 * @property {boolean} appInstalled
 * @property {boolean} appIsInstalling
 * @property {string} CONTENT_RELATIVE_PATH
 * @property {string} THEME_RELATIVE_PATH
 * @property {boolean} isProduction
 * @property {DebuggerFunction} debugger
 */

/** @type {ETA} */
const ETA = {
    appRoot: config.AppRoot,
    appName: pkg.name,
    appVersion: pkg.version,
    appInstalled: false,
    appIsInstalling: false,
    CONTENT_RELATIVE_PATH,
    THEME_RELATIVE_PATH,
    isProduction: config.IS_PRODUCTION,
    debugger: _debugger,
};

/*
ETA.resolve_path = helpers.resolve_path;
ETA.require_module = helpers.require_module;
ETA.THEME_ROOT_PATH = ETA.resolve_path(ETA.THEME_RELATIVE_PATH);

ETA.PLUGIN_RELATIVE_PATH = ETA.CONTENT_RELATIVE_PATH + "/plugins";
ETA.PLUGIN_ROOT_PATH = ETA.resolve_path(ETA.PLUGIN_RELATIVE_PATH);

ETA.resolve_theme_path = (filePathStr = "") => ETA.resolve_path(ETA.THEME_RELATIVE_PATH, filePathStr);
*/

/*
// CMS.configs.COOKIE_SECRET = helpers.generate_salt(41, false);
// CMS.configs.COOKIE_SECRET = helpers.generate_simple_key(41, false);

// Logger
// CMS.logger = appRootPath.require("cms-libs/cms-logger.js").logger;

// const bodyParser = require("body-parser");
// CMS.middlewares = {
//     jsonParser: bodyParser.json(),
//     urlencodedParser: bodyParser.urlencoded({ extended: true }),
// };

// CMS.renderer = require('ejs');
// CMS.template_extension = 'ejs';

// Password hash and verify
// CMS.hash_password = helpers.hash_password;
// CMS.verify_password = helpers.verify_password;

// CMS.make_slug = helpers.slugify;
// CMS.sanitize_filename = helpers.slugify_filename;
*/

export default Object.freeze(ETA);
