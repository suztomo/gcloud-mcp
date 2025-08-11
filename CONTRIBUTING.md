How to Contribute
=================

We'd love to accept your patches and contributions to this project. There are just a few small guidelines you need to follow.

Contributor License Agreement
-----------------------------

Contributions to this project must be accompanied by a Contributor License Agreement. You (or your employer) retain the copyright to your contribution; this simply gives us permission to use and redistribute your contributions as part of the project. Head over to https://cla.developers.google.com/ to see your current agreements on file or to sign a new one.

You generally only need to submit a CLA once, so if you've already submitted one (even if it was for a different project), you probably don't need to do it again.

Code Reviews
------------

All submissions, including submissions by project members, require review. We use GitHub pull requests for this purpose. Submissions by non-Googlers require two reviewers. Consult [GitHub Help](https://help.github.com/articles/about-pull-requests/) for more information on using pull requests.

### Multi-Approvers Check

Each pull request must be approved by two Googlers. This is enforced by an automated multi-approvers check. This check may not automatically re-run after the second approval is added. If it remains in a failed state, you can manually re-trigger it by:

1.	Clicking "View details" on the failed workflow to bring you to the "Actions" page.
2.	Clicking "Re-run failed jobs".

For more information, see [Re-running failed jobs in a workflow](https://docs.github.com/en/actions/how-tos/managing-workflow-runs-and-deployments/managing-workflow-runs/re-running-workflows-and-jobs#re-running-failed-jobs-in-a-workflow).

Community Guidelines
--------------------

This project follows [Google's Open Source Community Guidelines](https://opensource.google/conduct/).

---

The section above follows the standard googleapis organization’s CONTRIBUTING.md template. The section below is specific to the gcloud-mcp project. It explains how we work, how we use GitHub, and what contributors can expect when engaging with this repository.

---

How We Work
===========

The gcloud-mcp project is maintained primarily by the internal Cloud SDK team. While the repository is open source, we operate with a limited contribution model.

Becoming a contributor
----------------------

Review the guide for [Onboarding to gcloud-mcp](https://github.com/googleapis/gcloud-mcp/blob/main/doc/onboarding.md).

To contribute to this repository, ask a member of [gcloud-mcp-admin](https://github.com/orgs/googleapis/teams/gcloud-mcp-admin) to add you to the [gcloud-mcp-team](https://github.com/orgs/googleapis/teams/gcloud-mcp-team).

Before contributing code
------------------------

Before doing any significant work, open an issue to propose your idea and ensure alignment. You can either [file a new issue](https://github.com/googleapis/gcloud-mcp/issues/new/choose), or comment on an [existing one](https://github.com/googleapis/gcloud-mcp/issues).

A pull request (PR) that does not go through this coordination process may be closed to avoid wasted effort.

Make sure your code follows the guidelines at [How We Write Go](https://github.com/googleapis/gcloud-mcp/blob/main/doc/how-we-write-go.md).

Checking the issue tracker
--------------------------

We use GitHub issues to track tasks, bugs, and discussions.

> *If it didn’t happen in a GitHub issue, it never happened.*

Use the [issue tracker](https://github.com/googleapis/gcloud-mcp/issues) as your source of truth.

Every issue will also have an associated [milestone](https://github.com/googleapis/gcloud-mcp/milestones). If an issue is not our roadmap, it will be under [Unplanned](https://github.com/googleapis/gcloud-mcp/milestone/1).

Filing a new issue
------------------

All changes, except trivial ones, should start with a GitHub issue.

This process gives everyone a chance to validate the design, helps prevent duplication of effort, and ensures that the idea fits inside the goals for the language and tools. It also checks that the design is sound before code is written; the code review tool is not the place for high-level discussions.

Significant changes must go through a design review process before they are accepted.

All issues should have a path prefix to indicate the relevant domain. For issues related to the gcloud-mcp codebase, use the package name as a prefix (for example, `gcloud-mcp:` or `cli:`). For issues related to code outside this repository, use the repository name (for example, `google-cloud-python`).

Aside from proper nouns, issue titles should use lowercase.

Always include a clear description in the body of the issue. The description should provide enough context for any team member to understand the problem or request without needing to contact you directly for clarification.

Default to assigning the issue to someone if there’s a clear owner. Otherwise, leave it for triage.

Leaving a TODO
--------------

When adding a TODO to the codebase, always include a link to an issue, no matter how small the task.

Use the format:

```
// TODO(https://github.com/googleapis/gcloud-mcp/issues/<number>): explain what needs to be done
```

This helps provide context for future readers and keeps the TODO relevant and actionable as the project evolves.

Sending a pull request
----------------------

All code changes must go through a pull request. First-time contributors should review [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow).

Before sending a pull request, it should include tests if there are logic changes, copyright headers in every file, and a commit message following the conventions in "Commit messages" section below.

A pull request can be opened from a branch within the repository or from a fork. External contributors are only able to open pull requests from forks, but team members with write access can choose to open a pull request from a repository branch.

### Pull request from a fork

If you open a pull request from a personal fork, you should allow repository maintainers to make edits to your fork by turning on "Allow edits from maintainers".

Please see [creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork) in the official GitHub documentation for details.

### Pull request from a branch

If you are a team member with write access, you can create a branch within the repository with your changes and open a pull request from it. After the pull request is merged, the branch will be automatically deleted.

You should not have any long-lived branches within the repository without an open pull request. Such non-protected branches that don't have an associated open pull request, will be periodically cleaned up.

Please see [changing the branch range and destination repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request#changing-the-branch-range-and-destination-repository) in the official GitHub documentation for details.

### Pull requests with multiple commits

When opening a pull request, it can be helpful to structure the commits for review. If your pull request has multiple commits, note in the description whether reviewers should review them individually or just focus on the final result. (For example, if earlier commits are exploratory and only the end state matters, make that clear to avoid wasting reviewer time.)

### Keeping pull requests up to date with base branch

The repository is configured to not require branches to be up to date before merging. This means that you do not have to have the latest changes from the base branch integrated, unless GitHub detects merge conflicts.

To minimize the risk of the pull request getting out of date with the base branch, enable [auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request) so that the pull request submits as soon as it is approved and the checks pass.

Commit messages
---------------

Commit messages for gcloud-mcp follow the conventions below.

Here is an example:

```
feat(internal/gcloud-mcp): add version subcommand

A version subcommand is added to gcloud-mcp, which prints the current version of
the tool.

The version follows the versioning conventions described at
https://go.dev/ref/mod#versions.

Fixes https://github.com/googleapis/gcloud-mcp/issues/12345
```

### First line

The first line of the change description is a short one-line summary of the change, following the structure `<type>(<package>): <description>`:

#### type

A structural element defined by the conventions at https://www.conventionalcommits.org/en/v1.0.0/#summary.

#### package

The name of the package affected by the change, and should by provided in parentheses before the colon.

#### description

A short one-line summary of the change, that it should be written so to complete the sentence "This change modifies gcloud-mcp to ..." That means it does not start with a capital letter, is not a complete sentence, and actually summarizes the result of the change. Note that the verb after the colon is lowercase, and there is no trailing period

The first line should be kept as short as possible (many git viewing tools prefer under ~76 characters).

Follow the first line by a blank line.

### Main content

The rest of the commit message should provide context for the change and explain what it does. Write in complete sentences with correct punctuation. Don't use HTML, Markdown, or any other markup language.

Add any relevant information, such as benchmark data if the change affects performance. The benchstat tool is conventionally used to format benchmark data for change descriptions.

### Referencing issues

The special notation "Fixes #12345" associates the change with issue 12345 in the gcloud-mcp issue tracker. When this change is eventually applied, the issue tracker will automatically mark the issue as fixed.

If the change is a partial step towards the resolution of the issue, write "For #12345" instead. This will leave a comment in the issue linking back to the pull request, but it will not close the issue when the change is applied.

Please don’t use alternate GitHub-supported aliases like Close or Resolves instead of Fixes.

The review process
------------------

This section explains the review process in detail and how to approach reviews after a pull request has been sent for review.

### Getting a code review

Before creating a pull request, make sure that your commit message follows the suggested format. Otherwise, it can be common for the pull request to be sent back with that request without review.

After creating a pull request, request a specific reviewer if relevant, or leave it for the default group.

### Merging a pull request

Pull request titles and descriptions must follow the [commit messages](#commit-messages) conventions. This enables approvers to review the final commit message. Once the pull request has been approved and all checks have passed, click the [Squash and Merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-commits) button. The resulting commit message will be based on the pull request's title and description.

### Reverting a pull request

If a merged pull request needs to be undone, for reasons such as breaking the build, the standard process is to [revert it through the GitHub interface](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/reverting-a-pull-request).

To revert a pull request:

1.	Navigate to the merged pull request on GitHub.
2.	Click the **Revert** button. This action automatically creates a new branch and a pull request containing the revert commit.
3.	Edit the pull request title and description to comply with the [commit message guidelines](#commit-messages).
4.	The newly created revert pull request should be reviewed and merged following the same process as any other pull request.

Using the GitHub "Revert" button is the preferred method over manually creating a revert commit using `git revert`.

### Keeping the pull request dashboard clean

We aim to keep https://github.com/googleapis/gcloud-mcp/pulls clean so that we can quickly notice and review incoming changes that require attention.

Given that goal, please do not open a pull request unless you are ready for a code review. Draft pull requests and ones without author activity for more than one business day may be closed (they can always be reopened later).

If you're still working on something, continue iterating on your branch without creating a pull request until it’s ready for review.

### Addressing code review comments

Creating additional commits to address reviewer feedback is generally preferred over amending and force-pushing. This makes it easier for reviewers to see what has changed since their last review.

Pull requests are always squashed and merged. Before merging, please review and edit the resulting commit message to ensure it clearly describes the change.

After pushing, [click the button](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/requesting-a-pull-request-review#requesting-reviews-from-collaborators-and-organization-members) to ask a reviewer to re-request your review.

Language guidelines
-------------------

Unless there is a clear reason otherwise, all new code should be written in Go. Please avoid writing Bash scripts. If you believe non-Go code is necessary, file an issue following the guidelines above and include a clear justification.

See the guidelines for [How We Write Go](https://github.com/googleapis/gcloud-mcp/blob/main/doc/how-we-write-go.md).

Expectations for the team
-------------------------

A lot of our communication will happen on GitHub issues. Team members are expected to configure their inboxes to receive GitHub notifications alerts for all issues and pull requests to ensure effective communication.

If a pull request becomes inactive or misaligned with current priorities, we may close it to respect contributor and reviewer time. If you’d like to revisit it, just comment and reopen the conversation.

If your pull request or issue is stuck, feel free to follow up over chat. We encourage it!

### Reviewing a pull request

While we don’t have strict SLOs, we aim to review pull requests within **4 business hours**.

When reviewing a pull request:

-	Start by reading the PR description to understand the purpose and context. If the commit message doesn’t follow the[commit message guidelines](https://github.com/googleapis/gcloud-mcp/blob/main/CONTRIBUTING.md#commit-messages), request changes.
-	Use `Approve` or `Request changes` explicitly. Avoid leaving ambiguous feedback.
-	Focus on what is in scope. If unrelated issues arise, suggest filing a separate PR or issue.
-	If you’ve requested changes, approve the PR once the updates are satisfactory, even if the author forgot to click the re-request review.
-	If a review has stalled or the context has shifted, leave a comment to clarify expectations, or close the PR. Keeping the[dashboard clean](https://github.com/googleapis/gcloud-mcp/blob/main/CONTRIBUTING.md#keeping-the-pull-request-dashboard-clean) is encouraged, and new PRs are easy to open.
-	The[user-review-requested:@me](https://github.com/googleapis/gcloud-mcp/pulls?q=is%3Apr+is%3Aopen+user-review-requested%3A%40me) search view is helpful for tracking PRs awaiting your review.
