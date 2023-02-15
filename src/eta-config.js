const configs = (module.exports = {});

configs.DB_HOST = process.env.DB_HOST || "127.0.0.1";

configs.DB_NAME = process.env.DB_NAME || "eta";

configs.DB_USER = process.env.DB_USER || "admin";

configs.DB_PASSWORD = process.env.DB_PASSWORD || "password";

configs.DB_TABLE_PREFIX = process.env.DB_TABLE_PREFIX || "eta_";
