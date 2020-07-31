#!/usr/bin/env node

import yargs from 'yargs';
import {Model} from 'objection';
import Knex from 'knex';
import _ from 'lodash';

import {dbCofig} from '../../src/db-config';
// import PingClient from '../ping/client';
// import {alice} from '../../src/wallet/__test__/fixtures/signing-wallets';

const {db, channels} = yargs.options({
  db: {type: 'string', demandOption: true, choices: ['ping', 'pong']},
  channels: {type: 'string', demandOption: true},
}).argv;

const knex = Knex(_.merge(dbCofig, {connection: {database: db}}));
Model.knex(knex);

(async (): Promise<any> => {
  // const pingClient = new PingClient(alice().privateKey, `http://127.0.0.1:65535`);
  console.info({channels}, 'I would have pinged these');
  // await Promise.all(channels.map(async channelId => pingClient.ping(channelId.toString())));
})();
