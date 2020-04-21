const sessionKey = 'habla_key';
const sessionSecret ='habla_secret';

module.exports = {  
    sessionKey: sessionKey,
    sessionSecret: sessionSecret,
    env: (process.env.NODE_ENV || 'development').trim(),
    mongodb:  {
        test: "mongodb://127.0.0.1:27017/habla_test",
        development: "mongodb://127.0.0.1:27017/habla"
    },
    mongoose : {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    forever: {
        max: 10,
        silent: true,
        killTree: true,
        logFile: 'logs/forever.log',
        outFile: 'logs/app.log',
        errFile: 'logs/error.log'
    },
    redis: {
        host: 'localhost',
        port: 6379
    },
    cache: {maxAge: 3600000}
};