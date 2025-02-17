# Contributing to design-system

As a contributor, here are the guidelines we would like you to follow:

 - [Submission Guidelines](#submit)
 - [Coding Rules](#rules)
 - [Commit Message Guidelines](#commit)

## <a name="submit"></a> Submission Guidelines

### <a name="submit-pr"></a> Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

* Use `alpha` branch as a base for new changes
* Make your changes in a new git branch:

     ```shell
     git checkout -b githubUserId@my-fix-branch alpha
     ```

* Create your patch, **including appropriate test cases**.
* Follow our [Coding Rules](#rules).
* Run the full test suite, as described in the developer documentation,
  and ensure that all tests pass.
* Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit). Adherence to these conventions
  is necessary because release notes are automatically generated from these messages.

     ```shell
     git commit -a
     ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.
* Squash commits if the PR is small and its content is just about one thing it doesn’t make much sense to have more than one commit. Also every commit that starts with `feat` or `fix` will appear in the Change log and it probably doesn’t make sense to have in changelog something like:

    ```
    Component: fix styling of component
    Component: fix code review comments
    Component: fix another code review comments
    ```
    But on the other hand if you have two unrelated things in PR and each of them is in its own commit it’s fine to not squash.
* Push your branch to GitHub:

    ```shell
    git push origin githubUserId@my-fix-branch
    ```

* In GitHub, send a pull request to `alpha`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run the test suites to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase alpha -i
    git push -f
    ```

That's it!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the `alpha` (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete githubUserId@my-fix-branch
    ```

* Check out the `alpha` branch:

    ```shell
    git checkout alpha -f
    ```

* Delete the local branch:

    ```shell
    git branch -D githubUserId@my-fix-branch
    ```

* Update your `alpha` with the latest upstream version:

    ```shell
    git pull
    ```

## <a name="rules"></a> Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs (unit-tests, visual regression).
* Every cryptic code block **must be documented**.
* We follow [Airbnb JavaScript Style Guide][js-style-guide], with some custom rules.
* We use ESlint, Prettier and Stylelint to enforce the codestyle.

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the design-system change log**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

Footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples:

```
docs(changelog): update change log to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```
```
refactor(login): make the login form validators more functional

Closes FEP-1000
```

If you want to reference an issue, but the commit doesn't close one use `Ref` keyword.

```
style(router): fix linting errors

Ref FEP-1000
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests or correcting existing tests
* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **chore**: Other changes that don't modify `src` or `test` files

### Scope
The scope could be anything specifying place of the commit change. For example
`DevicesRoute`, `logging`, etc.

### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document][commit-message-format].

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
[js-style-guide]: https://github.com/airbnb/javascript
