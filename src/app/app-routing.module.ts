import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthCallbackComponent} from "./auth/auth-callback/auth-callback.component";
import {AuthorizeGuard} from "./auth/authorize.guard";
import {LoginComponent} from "./auth/login/login.component";

const routes: Routes = [
  { title: 'Dashboard', path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [ AuthorizeGuard ] },
  { title: 'Authorization', path: 'auth', component: LoginComponent, pathMatch: 'full' },
  { path: 'auth/callback', component: AuthCallbackComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
