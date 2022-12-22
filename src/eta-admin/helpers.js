const appRootPath = require("app-root-path");

const helpers = (module.exports = {});
const etaPrefix = "eta-";

const ensure_eta_directory = dirname_str => {
    if (!/^eta\-/.test(dirname_str)) {
        dirname_str = `${etaPrefix}${dirname_str}`;
    }
    return dirname_str;
};

/**
 * Helper for retrieving paths and urls
 * Make it easier for other modules to retrieve the right paths and urls
 */
// Require modules
helpers.require_module = (locationStr, filePathStr) => {
    if (filePathStr === undefined) {
        return appRootPath.require(locationStr);
    }

    locationStr = ensure_eta_directory(locationStr);
    return appRootPath.require(`${locationStr}/${filePathStr}`);
};

// Resolve path for a file or a directory
helpers.resolve_path = (locationStr, filePathStr) => {
    if (filePathStr === undefined) {
        return appRootPath.resolve(locationStr);
    }

    locationStr = ensure_eta_directory(locationStr);
    return appRootPath.resolve(`${locationStr}/${filePathStr}`);
};

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
