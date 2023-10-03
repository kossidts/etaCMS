const configs = {};

configs.DB_HOST = process.env.DB_HOST;

configs.DB_NAME = process.env.DB_NAME;

configs.DB_USER = process.env.DB_USER;

configs.DB_PASSWORD = process.env.DB_PASSWORD;

configs.DB_TABLE_PREFIX = process.env.DB_TABLE_PREFIX;

configs.AppRoot = import.meta.resolve(".");

export default Object.freeze(configs);
