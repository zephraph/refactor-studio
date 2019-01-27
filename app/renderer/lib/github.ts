// tslint:disable:no-console

import Octokit from "@octokit/rest";
import throttle from "@octokit/plugin-throttling";
import retry from "@octokit/plugin-retry";

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

const normalizeRepo = (repo: string) => {
  const splitRepo = repo.split("/");
  return splitRepo.length > 1
    ? `user:${splitRepo[0]} ${splitRepo[1]}`
    : splitRepo[0];
};

export const searchForRepo = async (searchTerm: string) =>
  ((await github.search.repos({
    q: `in:name ${normalizeRepo(searchTerm)}`,
    per_page: 5
  })) as unknown) as Promise<
    Octokit.Response<ListResponse<Octokit.ReposGetResponse>>
  >;
