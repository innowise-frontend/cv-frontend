export const ROUTES = {
  ROOT: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
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
