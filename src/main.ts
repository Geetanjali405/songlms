import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  // if (window['ngRef']) {
  //   window['ngRef'].destroy();
  // }
  // window['ngRef'] = ref;
