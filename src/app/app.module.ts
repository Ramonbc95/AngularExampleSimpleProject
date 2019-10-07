import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './navigator-header/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { ClientComponent } from './client/client.component';
import { ClientService } from './client/client.service';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ClientFormComponent } from './forms/client/client-form.component';
import { FormsModule } from '@angular/forms';
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { DetailComponent } from './client/detail/detail.component';
registerLocaleData(localeES,'es');

const routes : Routes = [
  {path:'', redirectTo:'/clients', pathMatch: 'full'},
  {path:'character-list', component:CharacterListComponent},
  {path:'clients', component:ClientComponent},
  {path:'clients/page/:page', component:ClientComponent},
  {path:'clients/form', component:ClientFormComponent},
  {path:'clients/form/:id', component:ClientFormComponent},
  {path:'clients/show/:id', component:DetailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CharacterListComponent,
    ClientComponent,
    ClientFormComponent,
    PaginatorComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ClientService,
    {provide:LOCALE_ID, useValue:'en-UK'}
  ],
  bootstrap: [
    AppComponent,
    NavComponent,
    CharacterListComponent, 
    FooterComponent
  ]
})
export class AppModule { }