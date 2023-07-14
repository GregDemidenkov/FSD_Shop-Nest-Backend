export default () => ({
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    dbBasePrefix: process.env.DB_BASE_PREFIX
})