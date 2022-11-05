import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { InformationPageComponent } from './information-page/information-page.component';
import { LoginComponent } from './login/login.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'info', component: InformationPageComponent},
  { path: 'result', component: ResultComponent },
  { path: 'image-upload', component: ImageUploadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
