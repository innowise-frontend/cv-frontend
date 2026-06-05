import { CvPreviewSkillsTableProps } from "./types";
import { formatSkillMetric } from "../../utils";

export const CvPreviewSkillsTable = ({
  groups,
  emptyMessage,
  labels,
}: CvPreviewSkillsTableProps) => (
  <section className="py-8 text-left">
    <h2 className="mb-6 text-2xl font-normal text-gray-2">{labels.title}</h2>

    {groups.length === 0 ? (
      <p className="text-sm text-gray-3">{emptyMessage}</p>
    ) : (
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-red text-xs font-semibold uppercase tracking-wide text-gray-3">
            <th className="w-[200px] pb-3 pr-4 text-left font-semibold" aria-hidden />
            <th className="pb-3 pr-4 text-left font-semibold">{labels.skills}</th>
            <th className="w-[160px] pb-3 pr-4 text-center font-semibold">{labels.experience}</th>
            <th className="w-[120px] pb-3 text-center font-semibold">{labels.lastUsed}</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group, groupIndex) =>
            group.skills.map((skill, skillIndex) => {
              const isLastGroup = groupIndex === groups.length - 1;
              const isLastSkillInGroup = skillIndex === group.skills.length - 1;
              const isFirstSkillInGroup = skillIndex === 0;
              const showGroupBorder = isLastSkillInGroup && !isLastGroup;

              const rowPadding = [
                isFirstSkillInGroup ? "pt-4" : "pt-1",
                isLastSkillInGroup ? "pb-4" : "pb-1",
              ].join(" ");

              return (
                <tr
                  key={`${group.categoryId ?? "uncategorized"}-${skill.name}`}
                  className={`align-top text-gray-2 ${showGroupBorder ? "border-b border-gray-7" : ""}`}
                >
                  {skillIndex === 0 ? (
                    <td
                      rowSpan={group.skills.length}
                      className="py-4 pr-4 align-top font-bold text-red"
                    >
                      {group.categoryName}
                    </td>
                  ) : null}
                  <td className={`pr-4 ${rowPadding}`}>{skill.name}</td>
                  <td className={`pr-4 text-center ${rowPadding}`}>
                    {formatSkillMetric(skill.years)}
                  </td>
                  <td className={`text-center ${rowPadding}`}>
                    {formatSkillMetric(skill.lastUsed)}
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    )}
  </section>
);
