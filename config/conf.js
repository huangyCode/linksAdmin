module.exports = {
  development: 'http://47.114.129.233:8090/alc-backend',
  production: 'http://47.114.129.233:8080/alc-backend',
}[process.env.NODE_ENV || 'development'];
