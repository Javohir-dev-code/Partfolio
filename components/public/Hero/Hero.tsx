import { getExperiences, getSkills, getProjects } from "@/lib/data";
import { ProfileCard } from "@/components/public/ProfileCard";
import { WorkExperience } from "@/components/public/WorkExperience";
import { ExpertArea } from "@/components/public/ExpertArea";
import { RecentProjects } from "@/components/public/RecentProjects";
import { Stats } from "@/components/public/Stats/Stats";

async function getData() {
  const [experiences, skills, projects] = await Promise.all([
    getExperiences(),
    getSkills(),
    getProjects(),
  ]);

  return { experiences, skills, projects };
}

export async function Hero() {
  const { experiences, skills, projects } = await getData();

  return (
    <section className="py-10">
      <div className="max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Chap — Profile Card */}
          <div className="lg:self-start lg:sticky lg:top-[104px]">
            <ProfileCard />
          </div>

          {/* O'rta — Work Experience + Expert Area */}
          <div className="flex flex-col gap-6">
            <WorkExperience experiences={experiences ?? []} />
            <ExpertArea
              skills={
                skills
                  ? skills
                      .filter((s) => s.id !== "18" && s.id !== "19")
                      .slice(0, 6)
                  : []
              }
            />
          </div>

          {/* O'ng — Recent Projects */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1">
            <RecentProjects projects={projects ?? []} />
          </div>
        </div>

        {/* Statistika */}
        <div className="mt-6">
          <Stats />
        </div>
      </div>
    </section>
  );
}
