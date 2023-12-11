import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

import { Capacitor } from '@capacitor/core';
import { defineCustomElements as jeepSqlite} from 'jeep-sqlite/loader';
import { APP_INITIALIZER } from '@angular/core';
import { SqliteService } from './app/services/sqlite.service';
import { DataBaseService } from './app/services/data-base.service';
import { InitializeAppService } from './app/services/initialize-app.service';
import { AuthService } from './app/services/auth.service';
import { Storage } from '@ionic/storage-angular';
import { ApiClientService } from './app/services/api-client.service';
import { HttpClientModule } from '@angular/common/http';
import { provideIonicAngular } from '@ionic/angular/standalone';

if (environment.production) {
  enableProdMode();
}

const platform = Capacitor.getPlatform();
if(platform === "web") {
  jeepSqlite(window);
  window.addEventListener('DOMContentLoaded', async () => {
      const jeepEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepEl);
      jeepEl.autoSave = true;
  });
}

export function initializeFactory(init: InitializeAppService) {
  return () => init.inicializarAplicacion();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes),
    provideAnimations(),
    // CGV-INI-3: En esta sección se agregan los servicios que hemos implementado.
    provideIonicAngular(),
    importProvidersFrom(IonicModule.forRoot({ innerHTMLTemplatesEnabled: true })),
    importProvidersFrom(HttpClientModule),
    InitializeAppService,
    SqliteService,
    DataBaseService,
    AuthService,
    Storage,
    ApiClientService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [InitializeAppService],
      multi: true
    }
  ],
});

