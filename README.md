# PaperStorm – Hybrid Expense Control Application

## Overview
PaperStorm is a professional, hybrid expense tracking application built with Angular 13, Ionic 7, and Firebase. It supports web and mobile (Android/iOS) deployment with offline-first capabilities via Firestore.

Users can:
- Register income and expenses
- View real-time financial dashboard
- Track transaction flow
- Securely authenticate with email/password

The application is designed for professionals and small businesses requiring reliable, structured financial control.

(O PaperStorm é um aplicativo híbrido profissional para controle de despesas e receitas, desenvolvido com Angular 13, Ionic 7 e Firebase. Compatível com web e dispositivos móveis (Android/iOS), oferece funcionamento offline-first através do Firestore.
Principais recursos:
- Cadastro de entradas e saídas
- Painel financeiro em tempo real
- Acompanhamento do fluxo de transações
- Autenticação segura por e-mail e senha
Voltado para profissionais e pequenas empresas que buscam um controle financeiro confiável e estruturado.)

## Technologies
- Angular 13 (NgModules)
- Ionic 7 (Capacitor)
- Firebase Authentication
- Firebase Firestore
- TypeScript
- Lazy-loaded feature modules

## Project Structure
```
src/
└── app/
    ├── core/
    │   ├── guards/          ← Route protection
    │   ├── models/          ← TypeScript interfaces
    │   ├── services/        ← Auth and business logic
    │   └── utils/           ← Formatters and helpers
    ├── features/
    │   ├── dashboard/       ← Financial overview
    │   ├── expense/         ← Expense entry
    │   ├── flow/            ← Transaction timeline
    │   ├── income/          ← Income entry
    │   └── register/        ← Transaction registration
    ├── pages/
    │   ├── confirmation/    ← Post-action confirmation
    │   ├── forgot-password/ ← Password recovery
    │   ├── landing/         ← Public landing page
    │   ├── login/           ← User login
    │   ├── signup/          ← User registration
    │   └── verify/          ← Email verification
    ├── shared/              ← Reusable components, pipes, directives
    ├── app.component.*
    ├── app.module.ts
    └── app-routing.module.ts
```

## Setup
1. Clone the repository  
   ```bash
   git clone https://github.com/Hitice/PaperStorm.git
   cd PaperStorm
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Configure Firebase  
   Copy `src/environments/environment.ts.example` to `src/environments/environment.ts` and add your Firebase config.

4. Run locally  
   ```bash
   ionic serve
   ```

## Build & Deploy
- **Web**:  
  ```bash
  ng build --prod
  firebase deploy --only hosting
  ```

- **Android**:  
  ```bash
  ionic cap build android
  ```

## Scripts
```json
"scripts": {
  "start": "ionic serve",
  "build": "ng build --prod",
  "android": "ionic cap build android",
  "lint": "ng lint"
}
```

## Security
Firebase configuration is excluded from version control via `.gitignore`.  
Never commit `environment.ts` or `environment.prod.ts`.

## License
MIT License – see `LICENSE` file.

---
Maintained by Hitice  
Last updated: November 2025
