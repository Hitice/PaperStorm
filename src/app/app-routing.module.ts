// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

// If user is not authenticated, send to landing
const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['landing']);

const routes: Routes = [
  // Root -> show landing page (explicit user action to go to login)
  { path: '', redirectTo: 'landing', pathMatch: 'full' },

  // Auth / Onboarding pages
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

  // Main App (Tabs layout) — protected: unauth users -> landing
  {
    path: 'tabs',
    loadChildren: () =>
      import('./features/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding },
  },

  // Extra modules (outside Tabs)
  {
    path: 'panel',
    loadChildren: () =>
      import('./features/panel/panel.module').then(m => m.PanelPageModule),
  },

  // Fallback – any unknown route redirects to landing
  { path: '**', redirectTo: 'landing' },
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
