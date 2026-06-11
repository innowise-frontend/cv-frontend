import type { ProjectsTableRow } from "@pages/ProjectsPage/components/ProjectsTable/types";
import type { CvProjectsSubRowData } from "./types";
import type { Row } from "@tanstack/react-table";

export const Responsibilities = (row: Row<ProjectsTableRow>) => {
  const { description, responsibilities = [] } = row.original as CvProjectsSubRowData;

  return (
    <div className="flex flex-col gap-3">
      <p className="line-clamp-4 wrap-break-word text-base text-gray-5">{description}</p>
      {responsibilities.length > 0 && (
        <div className="flex max-h-[6rem] flex-wrap gap-2 overflow-hidden">
          {responsibilities.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="inline-flex h-6 items-center rounded-[16px] bg-gray-7 px-4 text-sm text-gray-2 dark:bg-gray-3 dark:text-gray-8"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
