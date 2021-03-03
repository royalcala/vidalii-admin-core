import 'reflect-metadata';
import Application from './server';

(async () => {
    console.log('hellow')
    const application = new Application();
    await application.connect();
    await application.init();
})();
