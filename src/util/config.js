module.exports = {
    dbCreds: {
        uri: process.env.DB_URI,
    },
    allowedOrigins: typeof process.env.ALLOWED_ORIGINS === "string" ? JSON.parse(process.env.ALLOWED_ORIGINS) : process.env.ALLOWED_ORIGINS,
};