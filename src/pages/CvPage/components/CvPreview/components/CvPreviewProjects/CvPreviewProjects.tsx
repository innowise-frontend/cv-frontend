import { CvPreviewProjectsProps } from "./types";
import { formatCvPreviewPeriod } from "../../utils";

export const CvPreviewProjects = ({
  projects,
  tillNowLabel,
  emptyMessage,
  labels,
}: CvPreviewProjectsProps) => (
  <section className="py-8 text-left">
    <h2 className="mb-8 text-2xl font-normal text-gray-2">{labels.title}</h2>

    {projects.length === 0 ? (
      <p className="text-sm text-gray-3">{emptyMessage}</p>
    ) : (
      <div className="flex flex-col gap-10">
        {projects.map((project) => (
          <article key={project.id} className="flex gap-7">
            <div className="flex min-w-0 flex-1 flex-col gap-3 text-sm leading-normal">
              <h3 className="text-sm font-bold uppercase tracking-wide text-red">{project.name}</h3>
              <p className="text-gray-2">{project.description}</p>
            </div>

            <div className="w-px shrink-0 self-stretch bg-red" aria-hidden />

            <div className="flex min-w-0 flex-2 flex-col gap-3 text-sm text-gray-2">
              <div>
                <p className="mb-1 font-bold">{labels.projectRoles}</p>
                <p>{project.roles.join(", ") || "—"}</p>
              </div>
              <div>
                <p className="mb-1 font-bold">{labels.period}</p>
                <p>{formatCvPreviewPeriod(project.start_date, project.end_date, tillNowLabel)}</p>
              </div>
              <div>
                <p className="mb-1 font-bold">{labels.responsibilities}</p>
                {project.responsibilities.length > 0 ? (
                  <ul className="list-none space-y-1">
                    {project.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden>●</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>—</p>
                )}
              </div>
              <div>
                <p className="mb-1 font-bold">{labels.environment}</p>
                <p>{project.environment.join(", ") || "—"}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    )}
  </section>
);
