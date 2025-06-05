import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { registerLocaleData } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import es from "@angular/common/locales/es";
import { FormsModule } from "@angular/forms";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import player from "lottie-web";
import { es_ES, provideNzI18n } from "ng-zorro-antd/i18n";
import { provideLottieOptions } from "ngx-lottie";
import { routes } from "./app.routes";

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNzI18n(es_ES),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideLottieOptions({
      player: () => player,
    }),
  ],
};
