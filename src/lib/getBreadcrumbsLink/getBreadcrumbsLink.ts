const BREADCRUMB_TRANSLATION_KEYS: Record<string, string> = {
  "": "page.sidebar.employees",
  languages: "page.sidebar.languages",
  settings: "page.sidebar.settings",
  skills: "page.sidebar.skills",
  departments: "page.sidebar.departments",
  positions: "page.sidebar.positions",
  projects: "page.sidebar.projects",
  cvs: "page.sidebar.cvs",
};

export const getBreadcrumbsLink = (pathname: string, t: (key: string) => string) => {
  const rootSegment = pathname.split("/")[1] ?? "";
  const translationKey = BREADCRUMB_TRANSLATION_KEYS[rootSegment];

  if (translationKey) {
    return { label: t(translationKey), href: pathname };
  }

  const firstLetter = rootSegment.charAt(0).toUpperCase();
  const rest = rootSegment.slice(1);

  return {
    label: firstLetter + rest,
    href: pathname,
  };
};
