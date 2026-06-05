import { CvPreviewSummaryProps } from "./types";
import { getUniqueDomains } from "../../utils";

const labelClass = "mb-1 font-bold text-gray-2 dark:text-gray-8";

export const CvPreviewSummary = ({ cv, skillGroups, labels }: CvPreviewSummaryProps) => {
  const domains = getUniqueDomains(cv.projects ?? []);

  return (
    <section className="text-left text-gray-2 dark:text-gray-8">
      <div className="flex gap-7">
        <div className="flex w-[220px] shrink-0 flex-col gap-4 text-sm">
          {cv?.education && (
            <div>
              <p className={labelClass}>{labels.education}</p>
              <p>{cv?.education}</p>
            </div>
          )}

          {cv?.languages?.length > 0 && (
            <div>
              <p className={labelClass}>{labels.languageProficiency}</p>
              {cv?.languages?.map((language) => (
                <p key={language.name}>
                  {language.name} — {language.proficiency}
                </p>
              ))}
            </div>
          )}

          <div>
            <p className={labelClass}>{labels.domains}</p>
            {domains?.length > 0 ? domains.map((domain) => <p key={domain}>{domain}</p>) : "-"}
          </div>
        </div>

        <div className="w-px shrink-0 self-stretch bg-red" aria-hidden />

        <div className="flex min-w-0 flex-1 flex-col gap-4 text-sm leading-normal">
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-bold leading-snug text-gray-2 dark:text-gray-8">
              {cv.name}
            </h2>
            <p className="whitespace-pre-wrap">{cv.description}</p>
          </div>

          {skillGroups?.length > 0 ? (
            <div className="flex flex-col gap-2">
              {skillGroups.map((group) => {
                const skillNames = group.skills.map((skill) => skill.name).join(", ");

                if (!skillNames) return null;

                return (
                  <div key={group.categoryId ?? "uncategorized"}>
                    <p className="font-bold text-gray-2 dark:text-gray-8">{group.categoryName}</p>
                    <p className="mt-1">{skillNames}.</p>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
