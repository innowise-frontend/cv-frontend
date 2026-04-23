export const ROUTES = {
  ROOT: "/",
  AUTH: "/_public/auth",
  LOGIN: "/login",
  SIGNUP: "/signup",
  VERIFY_EMAIL: "/_public/verify-email",
  FORGOT_PASSWORD: "/_public/forgot-password",
  RESET_PASSWORD: "/_public/reset-password",
  CVS: "/cvs",
  DEPARTMENTS: "/departments",
  LANGUAGES: "/languages",
  POSITIONS: "/positions",
  PROFILE: "/profile",
  PROJECTS: "/projects",
  SETTINGS: "/settings",
  SKILLS: "/skills",
};

export type RouteKeys = keyof typeof ROUTES;
