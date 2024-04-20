import { NgModule } from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AuthRoutingModule } from './auth-routing.module';
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../shared/components/button/button.component";

@NgModule({
  declarations: [SignInComponent],
  imports: [AuthRoutingModule, HttpClientModule, AngularSvgIconModule.forRoot(), NgClass, FormsModule, NgIf, ReactiveFormsModule, ButtonComponent],
})
export class AuthModule {}
