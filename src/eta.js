"use strict";

// Set a globally available Object for all sub module
const ETA = (global.ETA = {});

// Main app
const ETApp = (module.exports = {});

ETApp.init = () => {};

/**
 * Only invoke the init function if this module is call directly (node eta.js).
 * So init function will not run if this module is required from another module
 */
if (require.main === module) {
    ETApp.init();
}
