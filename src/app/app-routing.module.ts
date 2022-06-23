import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/auth/login/login.component';

// no layouts views
import {AuthGuard} from './shared/auth.guard';
import {NewDealComponent} from './views/new-deal/new-deal.component';
import {ListComponent} from './views/list/list.component';
import {DealComponent} from './views/deal/deal.component';
import {RegisterComponent} from './views/auth/register/register.component';

const routes: Routes = [
  // no layout views
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/register', component: RegisterComponent},
  { path: 'new-deal', component: NewDealComponent, canActivate: [AuthGuard] },
  { path: 'new-deal/:id', component: NewDealComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'deal/:id', component: DealComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
