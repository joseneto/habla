# Habla: A NodeJS Chat

Habla is a opensource project to management of contacts. you can save your contacts, see if anyone is online and start chatting. This projects was built using express, mongodb, redis and socket.io. There is a lot of others libraries like forever and csurf to make this project elegible to production ready!


## Setup

You need first install nodejs, redis and mongodb, after that just go to project folder and run **npm install** to installer all dependencies of the project.
You can change any settings of the project just editing the config.js file 

```
const  sessionKey = 'habla_key';
const  sessionSecret ='habla_secret';

module.exports = {
	sessionKey:  sessionKey,
	sessionSecret:  sessionSecret,
	env: (process.env.NODE_ENV || 'development').trim(),
	mongodb: {
		test:  "mongodb://127.0.0.1:27017/habla_test",
		development:  "mongodb://127.0.0.1:27017/habla"
	},
	mongoose : {
		useNewUrlParser:  true,
		useUnifiedTopology:  true,
		useCreateIndex:  true,
		useFindAndModify:  false
	},
	forever: {
		max:  10,
		silent:  true,
		killTree:  true,
		logFile:  'logs/forever.log',
		outFile:  'logs/app.log',
		errFile:  'logs/error.log'
	},
	redis: {
		host:  'localhost',
		port:  6379
	},
	cache: {maxAge:  3600000}
};
```

## Running

You can run the project in standalone or in cluster mode:

* Standalone mode
	
		npm run app
* Cluster mode			

		npm start

For cluster mode Habla uses redis to handle all session, this is a stateless project, that should handle thousands of concurrents requests.

## Tests

Habla uses Mocha, Supertest and Should to write the tests, you can easily run just calling the **npm test** 

## Opensource

Habla is opensource and you can use to learn or to create a commecial product.
