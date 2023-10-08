// const appRootPath = require("app-root-path");

const etaPrefix = "eta-";

const helpers = {};

const ensure_eta_directory = dirname_str => {
    if (!/^eta\-/.test(dirname_str)) {
        dirname_str = `${etaPrefix}${dirname_str}`;
    }
    return dirname_str;
};

// Set some constants
helpers.SEC_IN_MS = 1000;
helpers.MIN_IN_MS = 60 * CMS.SEC_IN_MS;
helpers.HOUR_IN_MS = 60 * CMS.MIN_IN_MS;
helpers.DAY_IN_MS = 24 * CMS.HOUR_IN_MS;
helpers.WEEK_IN_MS = 7 * CMS.DAY_IN_MS;

// CMS.mkdir = helpers.mkdir;
// CMS.trimLChar = helpers.trimLChar;
// CMS.trimRChar = helpers.trimRChar;

// Check if the node environment is set to production
// ETA.isProduction = app => {
//     if (app && typeof app.get === "function") {
//         return app.get("env") === "production";
//     }
//     return process.env.NODE_ENV === "production";
// };

/**
 * Helper for retrieving paths and urls
 * Make it easier for other modules to retrieve the right paths and urls
 */
// Require modules
// helpers.require_module = (locationStr, filePathStr) => {
//     if (filePathStr === undefined) {
//         return appRootPath.require(`src/${locationStr}`);
//     }

//     locationStr = ensure_eta_directory(locationStr);
//     return appRootPath.require(`src/${locationStr}/${filePathStr}`);
// };

// Resolve path for a file or a directory
// helpers.resolve_path = (locationStr, filePathStr) => {
//     if (filePathStr === undefined) {
//         return appRootPath.resolve(`src/${locationStr}`);
//     }

//     locationStr = ensure_eta_directory(locationStr);
//     return appRootPath.resolve(`src/${locationStr}/${filePathStr}`);
// };

// Resolve site urls
helpers.resolve_uri = (mountPoint, endPoint = "", addSlashes = true) => {
    url_path = "";
    switch (mountPoint) {
        case "admin":
        case "dashboard":
            url_path = `${etaPrefix}admin`;
            break;
        case "admin-assets":
            url_path = `${etaPrefix}admin/assets`;
            break;
        case "uploads":
        case `${etaPrefix}uploads`:
        case "content-uploads":
            url_path = `${etaPrefix}content/uploads`;
            break;
        case "login":
            url_path = "login";
            break;
        //case 'static':
        //    url_path = 'static';
        //    break;
        case "home":
        default:
            url_path = "/";
    }

    if (addSlashes && url_path !== "/") {
        url_path = `/${url_path}/`;
    }

    return url_path + endPoint;
};

/**
 * Generate a random number between min and max
 *
 * @param  {{min?: number, max?: number}} [arg] - Defaults min=0, max=100
 * @return {number}    the generated random number
 */
helpers.random_number = arg => {
    arg = arg || {};
    min = arg.min || 0;
    max = arg.max || 100;
    return Math.floor(max * Math.random() + min);
};

/**
 * Generate salt
 *
 * Inspired by the wordpress default salt generator
 * @see https://api.wordpress.org/secret-key/1.1/salt/
 *
 * @param  {number} salt_length Defaults to 64.
 * @param  {boolean} use_special_char
 *
 * @return {string}
 */
helpers.generate_salt = (salt_length, use_special_char) => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let specialChars = "!@#$%^&*()-_ []{}<>~`+=,.;:/?|";

    if (use_special_char !== false) {
        chars += specialChars;
    }
    const max = chars.length - 1;

    // salt_length = Math.abs(~~salt_length) || 64;
    salt_length = typeof salt_length === "number" ? parseInt(salt_length, 10) : 64;
    let key = "";
    for (let i = 0; i < salt_length; i++) {
        key += chars.charAt(helpers.random_number({ min: 0, max: max }));
    }

    return key;
};

helpers.generate_simple_key = () => helpers.generate_salt(16, false);

export default Object.freeze(helpers);
