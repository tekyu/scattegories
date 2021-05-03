import express from 'express';
import config from './config';
import Logger from './loaders/logger';
import cluster from 'cluster';
import { cpus } from 'os';
const totalCPUs = cpus().length;

async function startServer() {

  if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Forking another another worker!");
      cluster.fork();
    });
  } else {
    const app = express();
    await require('./loaders').default({ expressApp: app, logger: Logger });
    app.listen(config.ports.app, (err) => {
      if (err) {
        Logger.error(err);
        process.exit(1);
        return;
      }
      Logger.info(`###### Server listening on port ${config.ports.app} ######`);
    });
  }


}

startServer();
