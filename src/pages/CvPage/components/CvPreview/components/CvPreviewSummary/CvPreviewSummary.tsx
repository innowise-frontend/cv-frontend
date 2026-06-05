import { CvPreviewSummaryProps } from "./types";
import { getUniqueDomains } from "../../utils";

export const CvPreviewSummary = ({ cv, skillGroups, labels }: CvPreviewSummaryProps) => {
  const domains = getUniqueDomains(cv.projects ?? []);

  return (
    <section className="text-left">
      <div className="flex gap-7">
        <div className="flex w-[220px] shrink-0 flex-col gap-4 text-sm">
          <div>
            <p className="mb-1 font-bold text-gray-2">{labels.education}</p>
            <p className="text-gray-2">{cv.education || "—"}</p>
          </div>

          <div>
            <p className="mb-1 font-bold text-gray-2">{labels.languageProficiency}</p>
            {cv.languages.length > 0 ? (
              cv.languages.map((language) => (
                <p key={language.name} className="text-gray-2">
                  {language.name} — {language.proficiency}
                </p>
              ))
            ) : (
              <p className="text-gray-2">—</p>
            )}
          </div>

          <div>
            <p className="mb-1 font-bold text-gray-2">{labels.domains}</p>
            {domains.length > 0 ? (
              domains.map((domain) => (
                <p key={domain} className="text-gray-2">
                  {domain}
                </p>
              ))
            ) : (
              <p className="text-gray-2">—</p>
            )}
          </div>
        </div>

        <div className="w-px shrink-0 self-stretch bg-red" aria-hidden />

        <div className="flex min-w-0 flex-1 flex-col gap-4 text-sm leading-normal text-gray-2">
          <div className="flex flex-col gap-2">
            <h2 className="text-base font-bold leading-snug text-gray-2">{cv.name}</h2>
            <p className="whitespace-pre-wrap">{cv.description}</p>
          </div>

          {skillGroups.length > 0 ? (
            <div className="flex flex-col gap-2">
              {skillGroups.map((group) => {
                const skillNames = group.skills.map((skill) => skill.name).join(", ");

                if (!skillNames) return null;

                return (
                  <div key={group.categoryId ?? "uncategorized"}>
                    <p className="font-bold text-gray-2">{group.categoryName}</p>
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
