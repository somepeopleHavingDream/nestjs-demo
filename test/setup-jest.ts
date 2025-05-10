import { INestApplication } from '@nestjs/common';
import * as pactum from 'pactum';
import { AppFactory } from './app.factory';

let appFactory: AppFactory;
let app: INestApplication;

global.beforeEach(async () => {
  appFactory = await AppFactory.init();
  await appFactory.initDB();
  app = appFactory.instance;

  pactum.request.setBaseUrl(await app.getUrl());
  global.pactum = pactum.spec();
});

global.afterEach(async () => {
  await appFactory.cleanup();
  await app.close();
});
