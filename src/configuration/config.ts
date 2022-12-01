export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    name: process.env.DB_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    url: process.env.DATABASE_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || 10,
});
