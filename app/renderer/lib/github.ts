// tslint:disable:no-console

import Octokit from "@octokit/rest";
import throttle from "@octokit/plugin-throttling";
import retry from "@octokit/plugin-retry";
import { chain, zip } from "lodash";

const GithubAPI = Octokit.plugin(throttle).plugin(retry);

export const github = new GithubAPI({
  auth: `token ${process.env.GH_TOKEN}`,
  throttle: {
    onRateLimit: (retryAfter, options) => {
      console.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );

      if (options.request.retryCount === 3) {
        // only retries once
        console.log(`Retrying after ${retryAfter} seconds!`);
        return true;
      }
    },
    onAbuseLimit: (retryAfter, options) => {
      // does not retry, only logs a warning
      console.warn(
        `Abuse detected for request ${options.method} ${options.url}`
      );
    }
  }
});

interface ListResponse<T> {
  items: T[];
  incomplete_results: boolean;
  total_count: number;
}

const normalizeRepoSearchTerm = (repo: string) => {
  const splitRepo = repo.split("/");
  return splitRepo.length > 1
    ? `user:${splitRepo[0]} ${splitRepo[1]}`
    : splitRepo[0];
};

export const searchForRepo = async (searchTerm: string) =>
  ((await github.search.repos({
    q: `in:name ${normalizeRepoSearchTerm(searchTerm)}`,
    per_page: 5
  })) as unknown) as Promise<
    Octokit.Response<ListResponse<Octokit.ReposGetResponse>>
  >;

interface GitGetTreeResponse extends Octokit.GitCreateTreeResponse {
  truncated: boolean;
}

const filterFile = filename => (
  gitTreeResponse: Octokit.Response<GitGetTreeResponse>
) => gitTreeResponse.data.tree.filter(({ path }) => path === filename);

type RepoFileResults = [string, Octokit.GitCreateTreeResponseTreeItem[]];

export const searchForFileInRepos = async (
  repos: string[],
  filename: string
): Promise<RepoFileResults[]> => {
  const responses = await chain(repos)
    .map(r => r.split("/"))
    .map(
      ([owner, repo]) =>
        github.git.getTree({
          owner,
          repo,
          tree_sha: "master",
          recursive: 1
        }) as Promise<Octokit.Response<GitGetTreeResponse>>
    )
    .thru(pending => Promise.all(pending))
    .value();

  return chain(responses)
    .tap(r => console.log(r))
    .map(filterFile(filename))
    .thru(repoFiles => zip(repos, repoFiles))
    .value();
};
