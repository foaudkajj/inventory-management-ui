import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
} from './layouts';
import {
  FooterModule,
  ResetPasswordFormModule,
  CreateAccountFormModule,
  ChangePasswordFormModule,
  LoginFormModule,
} from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { MasterDataComponent } from './pages/master-data/master-data.component';
import { TranslateModule } from '@ngx-translate/core';
import { DevExtremeModule } from 'devextreme-angular';
import {
  AuthHttpService,
  BranchService,
  CityService,
  ColorService,
  CountryService,
  DxStoreService,
  GetService,
  PaymentMethodService,
  ProductPropertyService,
  ProductTypeService,
  RoleService,
  UserService,
} from './services';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './services/httprequest.interceptor';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [AppComponent, MasterDataComponent, UsersComponent],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    TranslateModule.forRoot(),
    DevExtremeModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
    GetService,
    DxStoreService,
    ColorService,
    BranchService,
    PaymentMethodService,
    ProductPropertyService,
    ProductTypeService,
    CountryService,
    CityService,
    RoleService,
    AuthHttpService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
