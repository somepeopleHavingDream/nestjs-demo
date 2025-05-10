import { AppFactory } from './app.factory';

let appFactory: AppFactory;

global.beforeEach(async () => {
  appFactory = await AppFactory.init();
  await appFactory.initDB();
});

global.afterEach(async () => {
  await appFactory.cleanup();
});
