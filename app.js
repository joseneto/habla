const	express	=	require('express');
const	path	=	require('path');
const	consign	=	require('consign');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session  = require('express-session');
const methodOverride = require('method-override');
const error = require('./middlewares/error');
const	app	=	express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine',	'ejs');

app.use(cookieParser('habla'));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '2134023174784027502170275092',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,	'public')));

consign({})
  .include('models')
  .then('controllers')
  .then('routes')
  .into(app);


//middlewares de error
app.use(error.notFound);
app.use(error.serverError);

app.listen(3000,	()	=>	{
  console.log('Habla running!');
});