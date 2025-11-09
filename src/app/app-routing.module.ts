// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // -----------------------------------------------------------------
  // Root redirect
  // -----------------------------------------------------------------
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

  // -----------------------------------------------------------------
  // Auth / On-boarding pages
  // -----------------------------------------------------------------
  {
    path: 'landing',
    loadChildren: () =>
      import('./pages/landing/landing.module').then(m => m.LandingPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then(m => m.SignupPageModule),
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('./pages/verify/verify.module').then(m => m.VerifyPageModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./pages/forgot-password/forgot-password.module').then(
        m => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'confirmation',
    loadChildren: () =>
      import('./pages/confirmation/confirmation.module').then(
        m => m.ConfirmationPageModule
      ),
  },

  // -----------------------------------------------------------------
  // Feature modules (lazy-loaded)
  // -----------------------------------------------------------------
  {
    path: 'register',
    loadChildren: () =>
      import('./features/register/register.module').then(
        m => m.RegisterPageModule
      ),
  },
  {
    path: 'income',
    loadChildren: () =>
      import('./features/income/income.module').then(
        m => m.IncomePageModule
      ),
  },
  {
    path: 'expense',
    loadChildren: () =>
      import('./features/expense/expense.module').then(
        m => m.ExpensePageModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardPageModule
      ),
  },
  {
    path: 'flow',
    loadChildren: () =>
      import('./features/flow/flow.module').then(
        m => m.FlowPageModule
      ),
  },

  // -----------------------------------------------------------------
  // 404 – any unknown route goes back to landing
  // -----------------------------------------------------------------
  { path: '**', redirectTo: 'landing' },
  {
    path: 'income',
    loadChildren: () => import('./features/income/income.module').then( m => m.IncomePageModule)
  },
  {
    path: 'expense',
    loadChildren: () => import('./features/expense/expense.module').then( m => m.ExpensePageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'flow',
    loadChildren: () => import('./features/flow/flow.module').then( m => m.FlowPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register.module').then( m => m.RegisterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
