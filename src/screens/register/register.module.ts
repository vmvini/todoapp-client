import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterViewComponent } from './register-view.component';
import { RegisterRoutingModule } from './register-routing.module';
import { UserCreateFormModule } from 'src/components/user-create-form/user-create-form.module';
import { UserServiceToken, UserHttpService } from './services/user-http.service';
import { HttpClient } from '@angular/common/http';
import { UserMainService } from 'src/shared/core/user/user-main.service';

@NgModule({
  declarations: [RegisterViewComponent],
  imports: [CommonModule, RegisterRoutingModule, UserCreateFormModule],
  exports: [],
  providers: [
    {
      provide: UserServiceToken,
      useFactory: getUserService,
      deps: [
        HttpClient
      ]
    },
  ],
})
export class RegisterModule {}

function getUserService(httpClient: HttpClient) {
  const httpService = new UserHttpService(httpClient);
  const mainService = new UserMainService(httpService);
  return mainService;
}
