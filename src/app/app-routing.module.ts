import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate } from './auth-guard.guard'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard-guardia',
    loadChildren: () => import('./pages/dashboard-guardia/dashboard-guardia.module').then( m => m.DashboardGuardiaPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'dashboard-profesor',
    loadChildren: () => import('./pages/dashboard-profesor/dashboard-profesor.module').then( m => m.DashboardProfesorPageModule),
    canActivate: [canActivate]
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'qrpage',
    loadChildren: () => import('./pages/qrpage/qrpage.module').then( m => m.QrpagePageModule),
    canActivate: [canActivate]
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then( m => m.AjustesPageModule),
    canActivate: [canActivate]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
