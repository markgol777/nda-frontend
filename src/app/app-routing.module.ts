import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandiesPageComponent } from './candies-page/candies-page.component';
import { CookiePageComponent } from './cookie-page/cookie-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AboutProductComponent } from './about-product/about-product.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'aboutcookie', component: CookiePageComponent},
  {path: 'aboutcandy', component: CandiesPageComponent},
  {path: 'admin', component: AdminPanelComponent},
  {path: 'aboutProduct/:id', component: AboutProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }