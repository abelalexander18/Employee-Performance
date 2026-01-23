import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeDetail } from './components/employee-detail/employee-detail';
import { PerformanceReview } from './components/performance-review/performance-review';
import { authGuard, roleGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { 
    path: 'dashboard', 
    component: Dashboard,
    canActivate: [authGuard]
  },
  { 
    path: 'employees', 
    component: EmployeeList,
    canActivate: [authGuard]
  },
  { 
    path: 'employee-detail/:id', 
    component: EmployeeDetail,
    canActivate: [authGuard]
  },
  { 
    path: 'performance-review', 
    component: PerformanceReview,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin', 'manager'] }
  },
  { path: '**', redirectTo: '/login' }
];
