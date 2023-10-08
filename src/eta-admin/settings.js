"use strict";

import path from "node:path";
import { readFile } from "node:fs/promises";
import debug from "debug";

import config from "../eta-config.js";
import helpers from "./helpers.js";
// const appRootPath = require("app-root-path");

// const { default: pkg } = await import(path.join(config.AppRoot, "../package.json"), { assert: { type: "json" } });
const pkg = JSON.parse(await readFile(new URL("../package.json", config.AppRoot)));

// context
const ETA = {
    appRoot: config.AppRoot,
    appName: pkg.name,
    appVersion: pkg.version,
    appInstalled: false,
    appIsInstalling: false,
};

ETA.CONTENT_RELATIVE_PATH = "eta-content";
ETA.THEME_RELATIVE_PATH = path.join(ETA.CONTENT_RELATIVE_PATH, "themes");

/*
ETA.resolve_path = helpers.resolve_path;
ETA.require_module = helpers.require_module;
ETA.THEME_ROOT_PATH = ETA.resolve_path(ETA.THEME_RELATIVE_PATH);

ETA.PLUGIN_RELATIVE_PATH = ETA.CONTENT_RELATIVE_PATH + "/plugins";
ETA.PLUGIN_ROOT_PATH = ETA.resolve_path(ETA.PLUGIN_RELATIVE_PATH);

ETA.resolve_theme_path = (filePathStr = "") => ETA.resolve_path(ETA.THEME_RELATIVE_PATH, filePathStr);
*/

/**
 * Configure the debug module
 *
 * @usage
 *  const debug = ETA.debugger('my-module');
 *  debug('This is a debug message')
 */
const _debug = debug(ETA.appName);
ETA.debugger = namespace => {
    if (typeof namespace === "string" && namespace.trim() !== "") {
        return _debug.extend(namespace.trim());
    }
    return _debug;
};

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

debug(ETA);

export default Object.freeze(ETA);
