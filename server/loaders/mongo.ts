// @ts-nocheck
import mongoose from 'mongoose';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config/index';
import { Db } from 'mongodb';

const MongoStoreSession = MongoStore(session);

export default async ({
  app,
  logger,
}: {
  app: express.Application;
  logger: any;
}): Promise<Db> => {
  const mongoConnection = await mongoose.connect(config.db.databaseCON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.use(
    session({
      store: new MongoStoreSession({
        mongooseConnection: mongoConnection.connection,
      }),
      secret: config.db.databaseSecret,
    })
  );

  // CONNECTION EVENTS
  // When successfully
  mongoConnection.connection.on('connected', function () {
    logger.info(`Mongoose default connection open to ${config.db.databaseURL}`);
  });
  return mongoConnection.connection.db;
};
