import type { ProjectsTableRow } from "@pages/ProjectsPage/components/ProjectsTable/types";
import type { Row } from "@tanstack/react-table";

export type CvProjectsSubRowData = ProjectsTableRow & {
  responsibilities?: string[];
};

export const Responsibilities = (row: Row<ProjectsTableRow>) => {
  const { description, responsibilities = [] } = row.original as CvProjectsSubRowData;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-base text-gray-5">{description}</p>
      {responsibilities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {responsibilities.map((item) => (
            <span
              key={item}
              className="inline-flex h-6 items-center rounded-[16px] bg-gray-7 px-4 text-sm text-gray-2 hover:underline dark:bg-gray-3 dark:text-gray-8"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
