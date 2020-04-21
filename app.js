const	express	=	require('express');
const	path	=	require('path');
const http = require('http');
const socketIO = require('socket.io');
const	consign	=	require('consign');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const cookie = require('cookie');
const session  = require('express-session');
const compression = require('compression');
const methodOverride = require('method-override');
const config = require('./config');
const error = require('./middlewares/error');
const redis = require('redis')
const redisAdapter = require('socket.io-redis');

let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient(config.redis);

const	app	=	express();
app.disable('x-powered-by');
const server = http.Server(app);
const io = socketIO(server);
//const store = new session.MemoryStore();
const store = new RedisStore({client: redisClient, prefix: config.sessionKey});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine',	'ejs');

app.set('trust proxy', 1) // trust first proxy

app.use(compression());
app.use(session({
  store: store,
  name: config.sessionKey,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,	'public'), {maxAge: 3600000}));

app.use(csurf());
app.use((req, res, next) => {
  res.locals._csrf = req.csrfToken();
  next();
});

io.adapter(redisAdapter());
//handle session in socket
io.use((socket,	next)	=>	{
  const	cookieData = socket.request.headers.cookie;
  const	cookieObj	=	cookie.parse(cookieData);
  const	sessionHash	=	cookieObj[config.sessionKey] || '';
  const	sessionID	=	sessionHash.split('.')[0].slice(2);

    //With memory management was store.all
  store.get((err, sessions) => {
    const	currentSession = sessions[sessionID];
    if (err || !currentSession) {
      
      return next(new Error('access denied!'));
    }
    socket.handshake.session = currentSession;
    return next();
  });
});

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .then('events')
  .into(app, io);
//middlewares de error
app.use(error.notFound);
app.use(error.serverError);


server.listen(3000,	()	=>	{
  console.log('Habla running!');
});

module.exports = app;