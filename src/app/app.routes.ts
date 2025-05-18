import { Routes } from '@angular/router';
import { BalanceComponent } from './components/balance/balance.component';
import { IngresoFormComponent } from './components/ingreso-form/ingreso-form.component';

export const routes: Routes = [
    { path: '', component: BalanceComponent },
    { path: 'ingresar', component: IngresoFormComponent },
];
