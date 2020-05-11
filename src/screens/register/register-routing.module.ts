import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterViewComponent } from './register-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterViewComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RegisterRoutingModule {}
