import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { AddFreelancerComponent } from './add-freelancer/add-freelancer.component';
import { UpdateFreelancerComponent } from './update-freelancer/update-freelancer.component';
import { HttpClientModule ,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RechercheParDomaineComponent } from './recherche-par-domaine/recherche-par-domaine.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ListeDomainesComponent } from './liste-domaines/liste-domaines.component';
import { UpdateDomaineComponent } from './update-domaine/update-domaine.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TokenInterceptor } from './services/token.interceptor';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListeUserComponent } from './liste-user/liste-user.component';
import { UserRoleComponent } from './user-role/user-role.component';
@NgModule({
  declarations: [
    AppComponent,
    FreelancersComponent,
    AddFreelancerComponent,
    UpdateFreelancerComponent,
    RechercheParDomaineComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeDomainesComponent,
    UpdateDomaineComponent,
    LoginComponent,
    ForbiddenComponent,
    RegisterComponent,
    VerifEmailComponent,
    ListeUserComponent,
    UserRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, //deja ista3mltou min 9bal il va faire le controle de valideter de donner en temps reel 
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptor,//la classe qui va servir comme un interceptor
      multi : true//je peut utiliser plusieurs fois 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
