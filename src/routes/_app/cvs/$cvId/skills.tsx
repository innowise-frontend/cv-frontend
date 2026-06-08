import { createFileRoute } from "@tanstack/react-router";
import { CvSkills } from "@pages/CvPage";
import { TabsContent } from "@root/components/shared";

export const Route = createFileRoute("/_app/cvs/$cvId/skills")({
  component: function CvSkillsRoute() {
    const { cvId } = Route.useParams();

    return (
      <TabsContent value="skills" className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <CvSkills key={cvId} />
      </TabsContent>
    );
  },
});
