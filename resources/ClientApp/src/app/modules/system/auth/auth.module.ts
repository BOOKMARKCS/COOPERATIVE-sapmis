import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [AuthRoutingModule, HttpClientModule],
})
export class AuthModule {}
