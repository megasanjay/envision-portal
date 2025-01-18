// auth.d.ts
declare module "#auth-utils" {
  interface User {
    login: string;
  }

  interface UserSession {
    userSessionField: string;
  }

  interface SecureSessionData {
    secureSessionField: string;
  }
}

export {};
