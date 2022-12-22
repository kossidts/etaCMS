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
