Contributing guidelines
=======================

<!-- vim-markdown-toc GitLab -->

* [Branching](#branching)
  * [Naming Conventions](#naming-conventions)
    * [Features](#features)
    * [Bugs](#bugs)
    * [Refactoring](#refactoring)
    * [Releases](#releases)
* [Pull requests](#pull-requests)

<!-- vim-markdown-toc -->

## Branching

Development in this project is following the git-flow development pattern.

When starting a new project feature you should create a new branch named in the correct format for what you are working on (see below for naming conventions)

### Naming conventions

#### Features

Feature branches should be named using the following pattern 'feature/`ticket-id`-`branch-name`'

#### Bugs

Bug fix branches should be named using the following pattern 'bug/`ticket-id`-`branch-name`'

#### Refactoring

Refactoring branches should be named using the following pattern 'refactor/`ticket-id (if exists)`-`branch-name`'

#### Releases

Release branches should be named using the following pattern 'release/v`release-number`'

## Pull Requests

Once development on a branch is complete, the branch should be pushed to the Github repository and a pull request should be opened against the develop branch.

The pull request must be reviewed by at least one of the other developers on the project team. In order for the request to be accepted:
- the branch should contain logical atomic commits before sending a pull request - follow the [alphagov Git styleguide](https://github.com/alphagov/styleguides/blob/master/git.md)
- there must contain a succinct, clear summary of what the user need is driving this feature change
- there must be unit tests in place for the new code in the feature
- the CI pipeline must have passed
- the new code must pass a code quality review.

You may rebase your branch after feedback if it's to include relevant updates from the develop branch. It is preferable to rebase here then a merge commit as a clean and straight history on develop with discrete merge commits for features is preferred
