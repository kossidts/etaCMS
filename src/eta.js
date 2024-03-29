"use strict";

import "dotenv/config.js";

import ETA from "./eta-admin/settings.js";
import ETAServer from "./eta-server.js";

// Debugger for this module
const debug = ETA.debugger("app");

// Main app
const ETApp = {};

ETApp.init = () => {
    let userAgent = process.env.npm_config_user_agent;
    if (typeof userAgent === "string" && typeof process.release.lts === "string" && process.release.lts.length) {
        let searchStr = `node/${process.version}`;
        userAgent = userAgent.replace(searchStr, `${searchStr} (lts/${process.release.lts})`);
    } else {
        userAgent = `${process.release.name}/${process.version} ${process.platform} ${process.arch}`;
    }

    // Display some information about the application on start
    debug(`Initializing ETA [${process.env.npm_package_name}]`);
    debug(`-------------------------------------------------`);
    debug(`\tUser Agent: ${userAgent}`);
    debug(`\tUser: ${process.env.USER || "anonymous"}(${process.env.npm_config_user})`);
    debug(`\tPID: ${process.pid}`);
    debug(`\tPPID: ${process.ppid}`);
    debug(`\tDebug Port: ${process.debugPort}`);
    // debug(`\tExecPath: ${process.execPath}`);
    // debug(`\tINIT_CWD: ${process.env.INIT_CWD}`);
    // debug(`\tTMPDIR: ${process.env.TMPDIR}`);
    // debug(`\tPWD: ${process.env.PWD}`);
    debug(`\tApp license: ${process.env.npm_config_init_license}`);
    debug(`-------------------------------------------------`);

    // Invoke the web server
    ETAServer.init();
    // console.log(ETA);
};

/**
 * Only invoke the init function if this module is call directly (node eta.js).
 * So init function will not run if this module is required from another module
 */
// if (require.main === module) {
//     ETApp.init();
// }

ETApp.init();
