import dotenv from 'dotenv';

dotenv.config();

export const env = {
  apiUrl: process.env.API_URL || 'http://localhost:8080',
  accessUrl: process.env.ACCESS_URL || 'http://localhost:3000',
  databaseUrl: process.env.DATABASE_URL || '',
  port: process.env.PORT || 8080,
  logEnabled: process.env.LOG_ENABLED || 'false',
  jwt: {
    refreshTokenSecret:
      process.env.JWT_REFRESH_TOKEN_SECRET || 'ASDg1@eff=13-5FASDA',
    refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '1d',
    accessTokenSecret:
      process.env.JWT_ACCESS_TOKEN_SECRET || 'asdon123-132dasda#12',
    accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1d',
  },
  mail: {
    from: process.env.MAIL_FROM || 'from@example.com',
    host: process.env.MAIL_HOST || '',
    port: Number(process.env.MAIL_PORT) || 2525,
    username: process.env.MAIL_USERNAME || '',
    password: process.env.MAIL_PASSWORD || '',
  },
  google: {
    userInfoUrl: process.env.GOOGLE_USER_INFO_URL || '',
  },
};
