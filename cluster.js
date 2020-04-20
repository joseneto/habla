const cluster = require('cluster');
const cpus = require('os').cpus();

if(cluster.isMaster){
    cpus.forEach(() => cluster.fork());
    cluster.on('listening', (worker) => {
        console.log(`Cluster ${worker.process.pid} connected`);
    });
    cluster.on('disconnect', (worker) => {
        console.log(`Cluster ${worker.process.pid} disconnected`);
    });
    cluster.on('exit', (worker) => {
        console.log(`Cluster ${worker.process.pid} finished`);
    });

}else{
    require('./app');
}