import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
// import path from 'path';
import cors from 'cors';
// import Youch from 'youch';
// import * as Sentry from '@sentry/node';
import 'express-async-errors';
import io from 'socket.io';
import http from 'http';

import routes from './routes';
// import sentryConfig from './config/sentry';

// import './database';

import '@shared/infra/typeorm';
import '@shared/container';

class App {
  app: any;

  server: any;

  connectedUsers: {};

  io: io.Server;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);

    this.socket();

    this.middlewares();
    this.routes();
    this.exceptionHandler();

    this.connectedUsers = {};
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.connectedUsers[user_id] = socket.id;

      socket.on('disconnect', () => {
        delete this.connectedUsers[user_id];
      });
    });
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { user_id } = socket.handshake.query;
      this.connectedUsers[user_id] = socket.id;

      socket.on('disconnect', () => {
        delete this.connectedUsers[user_id];
      });
    });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(
      (
        req: { io: io.Server; connectedUsers: {} },
        res: any,
        next: () => void,
      ) => {
        req.io = this.io;
        req.connectedUsers = this.connectedUsers;

        next();
      },
    );
  }

  routes() {
    this.app.use(routes);
    // this.app.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.app.use(
      async (
        err: any,
        req: any,
        res: {
          status: (
            arg0: number,
          ) => {
            (): any;
            new (): any;
            json: { (arg0: { error: string }): any; new (): any };
          };
        },
      ) => {
        if (process.env.NODE_ENV === 'development') {
          // const errors = await new Youch(err, req).toJSON();

          return res.status(500);
        }

        return res.status(500).json({ error: 'Internal server error' });
      },
    );
  }
}

export default new App().server;
