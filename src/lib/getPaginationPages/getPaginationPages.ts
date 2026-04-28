export const getPaginationPages = (pagesCount: number, currentPage: number) => {
  if (pagesCount <= 7) {
    return Array.from({ length: pagesCount }, (_, index) => index + 1);
  }

  const visiblePages = new Set<number>([
    1,
    2,
    pagesCount - 1,
    pagesCount,
    currentPage - 1,
    currentPage,
    currentPage + 1,
  ]);

  const sortedPages = [...visiblePages]
    .filter((page) => page >= 1 && page <= pagesCount)
    .sort((a, b) => a - b);

  const pages: (number | string)[] = [];

  for (let i = 0; i < sortedPages.length; i++) {
    const page = sortedPages[i];
    const previousPage = sortedPages[i - 1];

    if (i > 0) {
      const gap = page - previousPage;

      if (gap === 2) {
        pages.push(previousPage + 1);
      } else if (gap > 2) {
        pages.push("ellipsis");
      }
    }

    pages.push(page);
  }

  return pages;
};
