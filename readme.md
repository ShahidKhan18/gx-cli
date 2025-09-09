# gex-cli

A **global Git helper CLI** built with [commander.js](https://www.npmjs.com/package/commander) and [chalk](https://www.npmjs.com/package/chalk).

It provides:

- **Commit shortcuts** with [gitmoji](https://gitmoji.dev/)
- **Amend support** for editing last commits
- **Git aliases** for frequent commands
- **Emoji and alias reference tables** in colorful output

## Installation

### Install globally from npm (once published)

```bash
npm install -g gex-cli
```

This makes the `gex` command available system-wide.

## Usage

### Commit Shortcuts

Each commit type has an associated emoji + label:

```bash
gex feature "add login form"
gex fix "resolved signup crash"
gex docs "update API documentation"
gex ui "improve dashboard UI"
gex perf "optimize query execution"
```

**Options:**

- `-a, --all` &rarr; Run `git add .` before committing
- `-A, --amend` &rarr; Amend last commit instead of creating a new one

**Example:**

```bash
gex fix -a "fixed null pointer issue"
gex feature -a -A "add OTP validation"
```

### Amend Last Commit

Rename/relabel your last commit with a new type and message:

```bash
gex amend fix "better error handling"
gex amend docs "typo fix in README"
```

### Emoji Reference

See all supported commit types, emojis, and meanings:

```bash
gex emoji-list
```

| Emoji | Type          | Description                           |
| :---- | :------------ | :------------------------------------ |
| 🎉    | INIT          | Initial project setup                 |
| ✨    | FEATURE       | New feature or enhancement            |
| 🐛    | FIX           | Bug fix                               |
| 🚑    | HOTFIX        | Urgent production fix                 |
| 🔥    | DELETE        | Remove code/files                     |
| 🔨    | REFACTOR      | Code restructure (no behavior change) |
| 📚    | DOCS          | Documentation updates                 |
| 💄    | STYLE         | Formatting, styles, UI minor changes  |
| 🎨    | UI            | UI/UX improvements                    |
| ✅    | TEST          | Add/update tests                      |
| ⚡️   | PERF          | Performance improvements              |
| 🚀    | DEPLOY        | Deployment / CI changes               |
| ⬆️    | UPGRADE       | Upgrade dependencies                  |
| 🔧    | CONFIG        | Config or environment changes         |
| 👷    | CI            | CI pipeline changes                   |
| 🔒    | SECURITY      | Security related changes              |
| ⏪    | ROLLBACK      | Rollback or revert                    |
| 🔖    | RELEASE       | Release/Version tag                   |
| 🔍    | SEO           | Search engine optimization            |
| ♿️   | ACCESSIBILITY | Accessibility improvements            |
| 🔀    | MERGE         | Merge branches                        |
| 🗑️    | CHORE         | Routine chores/cleanup                |

### Git Aliases

Run frequent Git commands via short aliases:

```bash
gex a <alias> [args...]
```

Show all aliases:

```bash
gex a list
```

#### Available Aliases

| Alias                  | Command                                      | Description                                           |
| :--------------------- | :------------------------------------------- | :---------------------------------------------------- |
| `ga`                   | `git add .`                                  | Stage all changes (quickly stage everything).         |
| `gs`                   | `git status`                                 | Show working tree status.                             |
| `gm`                   | `git commit`                                 | Create a commit with staged changes.                  |
| `gp`                   | `git push`                                   | Push current branch to remote.                        |
| `gpl`                  | `git pull`                                   | Pull latest changes from remote.                      |
| `gco`                  | `git checkout`                               | Switch branches or restore files.                     |
| `gb`                   | `git branch`                                 | List, create, or delete local branches.               |
| `gcm`                  | `git checkout main`                          | Quickly switch to main.                               |
| `gps`                  | `git push origin main`                       | Push main to remote.                                  |
| `gplm`                 | `git pull origin main`                       | Pull latest changes from main.                        |
| `gld`                  | `git log --oneline --graph --decorate --all` | Pretty git log as a decorated graph.                  |
| `reset-hard`           | `git reset --hard HEAD~1`                    | Rollback last commit and discard changes permanently. |
| `reset-soft`           | `git reset --soft HEAD~1`                    | Undo last commit but keep changes staged.             |
| `delete-local-branch`  | `git branch -d <branch>`                     | Delete a local branch.                                |
| `delete-remote-branch` | `git push origin --delete <branch>`          | Delete a remote branch (destructive).                 |
| `stash`                | `git stash`                                  | Save uncommitted changes temporarily.                 |
| `stash-pop`            | `git stash pop`                              | Reapply most recent stashed changes.                  |
| `cls`                  | `clear`                                      | Clear terminal screen.                                |

**Examples:**

```bash
gex a ga
gex a gs
gex a gco feature-branch
gex a delete-local-branch old-branch
gex a list
```

## Examples

```bash
gex feature "added login form"
gex fix -a "resolved crash on signup"
gex fix -a --amend "tweak message"
gex amend fix "updated commit message"
gex a ga
gex a gs
gex emoji-list
gex a list
```

## Why Use gex-cli?

- Faster commits with standardized messages (great for teams).
- Gitmoji support makes commit logs more visual.
- Built-in git aliases save keystrokes.
- Colorful CLI output via chalk.
- Easy to extend - just add more commit types or aliases in code.

## Contributing

1.  Fork the repo
2.  Create a feature branch
3.  Add/update commit shortcuts or aliases
4.  Submit a PR

## License

MIT License 2025 Shahid Khan
