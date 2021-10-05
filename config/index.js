module.exports = {
  jwt: {
    privateKey: process.env.AUTH_PRIVATE_KEY || 'P01ikyf0wii9',
    options: {
      expiresIn: process.env.AUTH_EXPIRED_DATE || '36000s',
    },
  },
  bcrypt: {
    rounds: 10,
  },
  database: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
    synchronize: false,
    logging: false,
    entities: ['entities/*.{ts,js}'],
    migrations: ['src/migration/**/*.{ts,js}'],
    subscribers: ['src/subscriber/**/*.{ts,js}'],
    cli: {
      entitiesDir: 'src/model',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
};
