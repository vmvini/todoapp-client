import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () =>
      import('../screens/projects/projects.module').then(
        (m) => m.ProjectsModule
      ),
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../screens/login/login.module').then((m) => m.LoginViewModule),
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../screens/register/register.module').then(
        (m) => m.RegisterModule
      ),
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
