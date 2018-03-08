async function createGitHubDeployment(context) {
  const octokit = context.github;
  const payload = context.payload;
  const pull_request = payload.pull_request;
  const pr_branch = pull_request.head.ref;

  context.log(`A PR was ${payload.action}. Branch: `, pr_branch);

  const result = await octokit.repos.createDeployment({
    owner: payload.repository.owner.login,
    ref: pr_branch,
    repo: payload.repository.name,
    auto_merge: false,
    environment: `${payload.sender.login}-pr-${pull_request.number}`,
    description: `Review app for '${pr_branch}' branch`,
    transient_environment: true,
    required_contexts: [],
    headers: {
      accept: 'application/vnd.github.ant-man-preview+json'
    }
  });
}

module.exports = (robot) => {
  robot.on(
    ['pull_request.opened', 'pull_request.reopened', 'pull_request.synchronize'],
    createGitHubDeployment
  );
};
