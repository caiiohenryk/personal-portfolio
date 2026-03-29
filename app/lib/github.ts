type GithubPinnedNode = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  primaryLanguage: { name: string } | null;
};

type GithubGraphQLResponse = {
  data?: {
    user?: {
      pinnedItems?: {
        nodes?: GithubPinnedNode[];
      };
    };
  };
  errors?: Array<{ message: string }>;
};

export type PinnedProject = {
  id: string;
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  stars: number;
  language: string | null;
};

const PINNED_REPOS_QUERY = `
  query PinnedRepositories($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            id
            name
            description
            url
            homepageUrl
            stargazerCount
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

export async function getPinnedProjects(): Promise<PinnedProject[]> {
  const username = process.env.GITHUB_USERNAME || "caiiohenryk";
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return [];
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: PINNED_REPOS_QUERY,
        variables: { login: username },
      }),
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as GithubGraphQLResponse;

    if (payload.errors?.length) {
      return [];
    }

    const nodes = payload.data?.user?.pinnedItems?.nodes || [];

    return nodes
      .filter((project): project is GithubPinnedNode => Boolean(project?.id))
      .map((project) => ({
        id: project.id,
        name: project.name,
        description: project.description || "No description provided yet.",
        url: project.url,
        homepageUrl: project.homepageUrl,
        stars: project.stargazerCount,
        language: project.primaryLanguage?.name || null,
      }));
  } catch {
    return [];
  }
}
