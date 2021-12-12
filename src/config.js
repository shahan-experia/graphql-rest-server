module.exports.APP_PORT = +process.env.APP_PORT || 4000;

module.exports.NODE_ENV = process.env.NODE_ENV;
module.exports.IN_PROD = process.env.NODE_ENV === 'production';

module.exports.APP_HTTP = process.env.APP_HTTP;
module.exports.APP_HOST = process.env.APP_HOST;
module.exports.BASE_URL = `${process.env.APP_HTTP}//${process.env.APP_HOST}`;

module.exports.REDIS_HOST = process.env.REDIS_HOST;
module.exports.REDIS_PASSWORD = process.env.REDIS_PASSWORD;
module.exports.REDIS_PORT = +process.env.REDIS_PORT || 6379;

module.exports.JWT_SECRET = process.env.JWT_SECRET;

module.exports.BCRYPT_SALT = +process.env.BCRYPT_SALT || 10;

module.exports.SMTP_HOST = process.env.SMTP_HOST;
module.exports.SMTP_USER = process.env.SMTP_USER;
module.exports.SMTP_PASS = process.env.SMTP_PASS;
module.exports.SMTP_PORT = +process.env.SMTP_PORT || 587;
module.exports.IS_NODEMAILER_SECURE = process.env.SMTP_PORT === 465;
