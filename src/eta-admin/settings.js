"use strict";

const appRootPath = require("app-root-path");

const ETA = global.ETA || {};

const { name, version } = appRootPath.require("package.json");
ETA.appName = name;
ETA.appVersion = version;
ETA.appInstalled = false;
ETA.appIsInstalling = false;

console.log(ETA);
