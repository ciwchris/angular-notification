import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'hammerjs';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(() => {
//        registerServiceWorker('/angular-notification/worker-basic.min')
    });

function registerServiceWorker(swName: string) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register(`/${swName}.js`)
            .then(reg => {
                console.log('[App] Successful service worker registration', reg);
            })
            .catch(err =>
                console.error('[App] Service worker registration failed ' + swName, err)
            );
    } else {
        console.error('[App] Service Worker API is not supported in current browser');
    }
}
