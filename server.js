const {Monitor} = require('forever-monitor');
const config = require('./config');

const child = new Monitor('cluster.js', config.forever);

child.on('exit', () => console.log('Shutdown server'));

child.start();