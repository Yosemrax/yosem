import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/auth.guard';
import { DataListComponent } from './data/data-list/data-list.component';
import { DataCreateComponent } from './data/data-create/data-create.component';
import { DataEditComponent } from './data/data-edit/data-edit.component';
// Importa el componente del dashboard o home
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'data', component: DataListComponent, canActivate: [AuthGuard] },
  { path: 'data/create', component: DataCreateComponent, canActivate: [AuthGuard] },
  { path: 'data/edit/:id', component: DataEditComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' } // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }