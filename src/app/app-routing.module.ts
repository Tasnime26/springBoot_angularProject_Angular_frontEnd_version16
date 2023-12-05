import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FreelancersComponent } from './freelancers/freelancers.component';
import { AddFreelancerComponent } from './add-freelancer/add-freelancer.component';
import { UpdateFreelancerComponent } from './update-freelancer/update-freelancer.component';
import { RechercheParDomaineComponent } from './recherche-par-domaine/recherche-par-domaine.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeDomainesComponent } from './liste-domaines/liste-domaines.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FreelancerGuard } from './freelancer.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';
import { ListeUserComponent } from './liste-user/liste-user.component';
import { UserRoleComponent } from './user-role/user-role.component';
const routes: Routes = [
{path:"freelancers", component: FreelancersComponent},
{path:"add-freelancer", component: AddFreelancerComponent,  canActivate:[FreelancerGuard]},
{path: "updateFreelancer/:id", component: UpdateFreelancerComponent},
{path: "rechercheParDomaine", component : RechercheParDomaineComponent},
{path: "rechercheParNom", component : RechercheParNomComponent},
{path: "ListeDomaines", component : ListeDomainesComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'app-forbidden', component: ForbiddenComponent},
{ path: "", redirectTo: "freelancers", pathMatch: "full" },
{ path: 'verifEmail', component: VerifEmailComponent },
{ path: 'listeUsers' , component:ListeUserComponent, canActivate: [FreelancerGuard]},
{ path: 'add-role-user/:id', component: UserRoleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
