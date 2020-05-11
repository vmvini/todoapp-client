import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsViewComponent } from './projects-view.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { GuardsModule } from 'src/guards/guards.module';

const routes: Routes = [
  {
    path: '',
    component: ProjectsViewComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), GuardsModule],
  exports: [RouterModule],
  providers: [],
})
export class ProjectsViewRoutingModule {}
