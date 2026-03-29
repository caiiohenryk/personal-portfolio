import { getPinnedProjects } from "@/app/lib/github";
import PortfolioPage from "@/app/components/portfolio-page";

export default async function Home() {
  const pinnedProjects = await getPinnedProjects();
  const year = new Date().getFullYear();

  return <PortfolioPage pinnedProjects={pinnedProjects} year={year} />;
}
