import 'reflect-metadata';
import Vidalii from './vidaliiService';

(async () => {
    console.log('hellow')
    await Vidalii.start()    
    // const application = new Application();
    // await application.connect();
    // await application.init();
})();
