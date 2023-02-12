/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Context } from './app/game/game-state/context';
import * as express from 'express';
import { Server as WSServer } from 'socket.io';
import { BettingState } from './app/game/game-state/states/betting-state';
import { UserEntity } from './app/user/user.entity';
import { log } from 'console';

const app = express();

const bots: UserEntity[] = new Array(5).fill(0).map((v, i) => ({
  id: `id-${i}`,
  name: `bot ${i}`,
  balance: 100,
  plays: [],
  guessedNumber: Math.floor(Math.random() * 1000) / 100,
}));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, async () => {
  console.log(`Listening at http://localhost:${port}/api`);
  log(bots);
  const ctx = new Context();
  ctx.setState(new BettingState());
  await Promise.all(bots.map((v) => ctx.bet(v, (v as any).guessedNumber)));
  log(`done!`);
});
server.on('error', console.error);

// const wsServer = new WSServer(server);
// wsServer.on('connection', () => {});
