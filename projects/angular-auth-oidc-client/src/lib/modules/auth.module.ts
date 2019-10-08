import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { OidcDataService } from '../data-services/oidc-data.service';
import { IFrameService } from '../services/existing-iframe.service';
import { EqualityHelperService } from '../services/oidc-equality-helper.service';
import { StateValidationService } from '../services/oidc-security-state-validation.service';
import { TokenHelperService } from '../services/oidc-token-helper.service';
import { LoggerService } from '../services/oidc.logger.service';
import { OidcSecurityCheckSession } from '../services/oidc.security.check-session';
import { OidcSecurityCommon } from '../services/oidc.security.common';
import { OidcConfigService } from '../services/oidc.security.config.service';
import { OidcSecurityService } from '../services/oidc.security.service';
import { OidcSecuritySilentRenew } from '../services/oidc.security.silent-renew';
import { BrowserStorage, OidcSecurityStorage } from '../services/oidc.security.storage';
import { OidcSecurityUserService } from '../services/oidc.security.user-service';
import { OidcSecurityValidation } from '../services/oidc.security.validation';

export const TOKEN_CONFIG = new InjectionToken<OidcSecurityStorage>('forRoot() configuration');

@NgModule()
export class AuthModule {
    static forRoot(token?: Token): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                OidcConfigService,
                OidcSecurityService,
                OidcSecurityValidation,
                OidcSecurityCheckSession,
                OidcSecuritySilentRenew,
                OidcSecurityUserService,
                OidcSecurityCommon,
                TokenHelperService,
                LoggerService,
                IFrameService,
                EqualityHelperService,
                OidcDataService,
                StateValidationService,
                {
                    provide: TOKEN_CONFIG,
                    useValue: token,
                },
                {
                    provide: OidcSecurityStorage,
                    useFactory: provideSecurityStorage,
                    deps: [TOKEN_CONFIG, BrowserStorage],
                },
            ],
        };
    }
}

export function provideSecurityStorage(defaultStorage: BrowserStorage, token: Token): OidcSecurityStorage {
    return token ? token.storage : defaultStorage;
}

export interface Type<T> extends Function {
    new(...args: any[]): T;
}

export interface Token {
    storage?: Type<any>;
}
