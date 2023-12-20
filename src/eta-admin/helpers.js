"use strict";

import buffer from "node:buffer";
import crypto from "node:crypto";
import intval from "intval";
import real_typeof from "@kdts/real-typeof";

const etaPrefix = "eta-";

const helpers = {};

/**
 *
 * @param {string} dirname_str
 * @returns {string}
 */
const ensure_eta_directory = dirname_str => {
    if (!/^eta\-/.test(dirname_str)) {
        dirname_str = `${etaPrefix}${dirname_str}`;
    }
    return dirname_str;
};

// Set some constants
helpers.SEC_IN_MS = 1000;
helpers.MIN_IN_MS = 60 * helpers.SEC_IN_MS;
helpers.HOUR_IN_MS = 60 * helpers.MIN_IN_MS;
helpers.DAY_IN_MS = 24 * helpers.HOUR_IN_MS;
helpers.WEEK_IN_MS = 7 * helpers.DAY_IN_MS;

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

/**
 * Remove whitespaces from a given text. Can be used to pretify template strings
 *
 * @param  {string} text
 * @return {string}
 */
helpers.rmWhitespace = text => {
    // Have to use two separate replace here as `^` and `$` operators don't
    // work well with `\r` and empty lines don't work well with the `m` flag.
    return typeof text !== "string" ? "" : text.replace(/[\r\n]+/g, "\n").replace(/^\s+|\s+$/gm, "");
};

/**
 * Remove the character from the beginning of a string
 * @param {string} str The string to operate on
 * @param {string} char Character(s) to remove
 * @returns {string} The timmed string
 */
helpers.trimLChar = (str, char) => {
    if (typeof str !== "string" || typeof char !== "string") {
        // throw new Error("Expecting two strings");
        return str;
    }

    //if (char === undefined) char = "\s";

    return str.replace(new RegExp("^[" + char + "]+"), "");
};

/**
 * Remove the character from the end of a string
 * @param {string} str The string to operate on
 * @param {string} char Character(s) to remove
 * @returns {string} The timmed string
 */
helpers.trimRChar = (str, char) => {
    if (typeof str !== "string" || typeof char !== "string") {
        // throw new Error("Expecting two strings");
        return str;
    }

    //if (char === undefined) char = "\s";

    return str.replace(new RegExp("[" + char + "]+$"), "");
};

/**
 * Slugify a given string
 * @see https://developer.wordpress.org/reference/functions/remove_accents/
 *
 * @param {string} str The string to slugify
 * @param {boolean} [uri]
 * @returns {string}
 */
helpers.slugify = (str, uri = false) => {
    str = str ?? "";

    if (typeof str != "string") {
        return str;
    }
    str = str.trim().toLowerCase();
    if (str == "") {
        return "";
    }

    /*
    if ( ! preg_match( '/[\x80-\xff]/', $string ) ) {
       return $string;
    }
    */

    // Assuming locale de_DE, de_CH, ..
    str = str.replace(/ö/g, "oe").replace(/ä/g, "ae").replace(/ü/g, "ue").replace(/ß/g, "ss");

    if (uri === true) {
        // do something different
    }

    str = buffer
        .transcode(Buffer.from(str), "utf8", "ascii") // convert to ASCII removing accents
        .toString("ascii")
        // remove everything except for charactes: word, digit, - .
        .replace(/[^a-z0-9\-]/g, "")
        // replace whitespaces
        .replace(/\s+/g, "-")
        // replace underscore
        .replace(/\_/g, "-")
        // replace multiple dashed
        .replace(/\-+/g, "-")
        // replace trailing whitespaces
        .replace(/^\s+|\s+$/g, "")
        // replace trailing dashes
        .replace(/^\-|\-$/g, "");

    return str;
};

/**
 * Slugify a filename.
 * @param {string} filename A filename
 * @returns {string} The slugified filename
 */
helpers.slugify_filename = filename => {
    if (real_typeof(filename) !== "string") {
        return "";
    }
    // Split and remove all dots by splitting at '.'
    let nameArray = filename.split(".");
    let extension = helpers.slugify(nameArray.pop() ?? "");
    let name = helpers.slugify(nameArray.join("-"));

    return `${name}.${extension}`;
};

/**
 * Resolve site urls
 * @param {string} mountPoint
 * @param {string} endPoint
 * @param {boolean} [addSlashes=true]
 * @returns
 */
helpers.resolve_uri = (mountPoint, endPoint = "", addSlashes = true) => {
    let url_path = "";
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
    arg.min = arg.min || 0;
    arg.max = arg.max || 100;
    return Math.floor(arg.max * Math.random() + arg.min);
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

    salt_length = intval(salt_length, 10, 64);

    let key = "";
    for (let i = 0; i < salt_length; i++) {
        key += chars.charAt(helpers.random_number({ min: 0, max: max }));
    }

    return key;
};

helpers.generate_simple_key = () => helpers.generate_salt(16, false);

// https://stackoverflow.com/a/21196961/10908205
// helpers.mkdir = (path, options, callback) => {
//     if (typeof options === "function") {
//         callback = options;
//         options = {};
//     }
//     fs.mkdir(path, options, err => {
//         if (err && err.code !== "EEXIST") {
//             return callback(err);
//         }
//         return callback(null);
//     });
// };

/**
 * Hash a given password using the nodejs built in crypto.pbkdf2
 * @see https://nodejs.org/api/crypto.html
 *
 * The returned hash has the format (without the whitespaces):
 *  algorithm $ power_of_iterations $ keylength $ salt $ hash
 *
 * @param  {string} pwd the password to be hashed
 * @return {PromiseLike<[Error|null, string]>} return a promise that resolves to [err, hash]
 */
helpers.hash_password = pwd => {
    // the salt should be at least 16 bytes long
    const salt = helpers.generate_salt(16, false);
    const iteration_power = 6; // 1e6
    const iterations = Math.pow(10, iteration_power); //Number(`1e${iteration_power}`);
    const keylen = 64; // 128
    const algo = "sha512"; // in crypto.getHashes()
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(pwd, salt, iterations, keylen, algo, (err, derivedKey) => {
            let hash = "";
            if (!err) {
                hash = `${algo}$${iteration_power}$${keylen}$${salt}$${derivedKey.toString("hex")}`;
            }
            resolve([err, hash]);
        });
    });
};

/**
 * Verify if the hash of a given password matches the given hashstring
 * The hashstring muss have the format returned by helpers.password_hash
 * @param  {string} password
 * @param  {string} hash
 * @return {PromiseLike<[Error|null, boolean]>} Promise that resolves to [err, hash]
 */
helpers.verify_password = (password, hash) => {
    if (typeof password !== "string" || typeof hash !== "string") {
        return Promise.resolve([new Error("The password and hashstring must be string"), false]);
    }

    let hashparts = hash.split("$");

    return new Promise((resolve, reject) => {
        if (hashparts.length != 5) {
            return resolve([new Error("Wrong hash"), false]);
        }
        const algo = hashparts[0];
        const iterations = Number(`1e${hashparts[1]}`); //1eX
        const keylen = ~~hashparts[2];
        const salt = hashparts[3];
        const hashStr = hashparts[4];

        crypto.pbkdf2(password, salt, iterations, keylen, algo, (err, derivedKey) => {
            let match = false;
            if (!err) {
                match = hashStr === derivedKey.toString("hex");
            }
            resolve([err, !err && match]);
        });
    });
};

// bcrypt only takes the first 72 bytes of a string into account
// import bcrypt from 'bcrypt';
// const password_hash = (pwd) => {
//     const saltRounds = 13;
//     return new Promise((resolve, reject) => {
//         bcrypt.hash(pwd, saltRounds, function(error, hash) {
//             resolve([error, hash])
//         })
//     })

// }

// const password_verify = (pwd, hash) => {
//     return new Promise((resolve, reject) => {
//         bcrypt.compare(pwd, hash, function(error, result) {
//             resolve([error, result])
//         })
//     })
// }

export default Object.freeze(helpers);
