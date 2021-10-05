export const jwtConfig = {
  jwt: {
    privateKey: process.env.AUTH_PRIVATE_KEY || 'P01ikyf0wii9',
    options: {
      expiresIn: process.env.AUTH_EXPIRED_DATE || '36000s',
    },
  },
};
