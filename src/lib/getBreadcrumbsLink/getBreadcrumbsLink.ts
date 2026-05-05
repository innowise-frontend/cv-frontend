export const getBreadcrumbsLink = (pathname: string) => {
  if (pathname === "/") {
    return { label: "Employess", href: pathname };
  }

  const firstLetter = pathname.charAt(1).toUpperCase();
  const rest = pathname.slice(2);

  return {
    label: firstLetter + rest,
    href: pathname,
  };
};
