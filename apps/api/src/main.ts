/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import { Server as WSServer } from 'socket.io';
import { Context } from './app/game/game-state/context';
import { BettingState } from './app/game/game-state/states/betting-state';
import { GameProvider } from './app/game/provider';
import { onConnection } from './app/ws';
import { ds } from './ds';

ds.initialize()
  .then(() => {
    const app = express();

    app.get('/api', (req, res) => {
      res.send({ message: 'Welcome to api!' });
    });

    const port = process.env.port || 3333;
    const server = app.listen(port, async () => {
      console.log(`Listening at http://localhost:${port}/api`);
      const ctx = new Context();
      await ctx.setState(new BettingState());
      const wsServer = new WSServer(server, {
        cors: { origin: 'http://localhost:4200' },
      });
      wsServer.on('connection', (s) => onConnection(s, new GameProvider(ctx)));
    });
    server.on('error', console.error);
  })
  .catch((e) => console.error(e));
