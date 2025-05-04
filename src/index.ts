// src/main.ts

import * as core from "@actions/core";
import * as github from "@actions/github";

async function run(): Promise<void> {
  console.log("XXXXXXXX");
  const token: string = core.getInput("github-token");
  const label: string = core.getInput("label");

  const octokit = github.getOctokit(token);
  const pullRequest = github.context.payload.pull_request;

  try {
    if (!pullRequest) {
      core.setFailed("This action can only run on Pull Requests.");
      return;
    }

    await octokit.rest.issues.addLabels({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: pullRequest.number,
      labels: [label],
    });
  } catch (error) {
    core.setFailed((error as Error)?.message ?? "Unknown error");
  }
}

export default run;

if (require.main === module) {
  run();
}
