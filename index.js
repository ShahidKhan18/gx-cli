#!/usr/bin/env node

/**
 * gitx-cli
 * A global CLI wrapper for commit shortcuts, git aliases and helpers.
 * Uses commander and chalk for CLI and colored output.
 *
 * Developer: Shahid Khan
 * GitHub: https://github.com/shahidkhan18
 * Email: shahidseran786@gmail.com
 */

import { Command } from "commander";
import { execSync } from "child_process";
import chalk from "chalk";

const program = new Command();
program.name("gx").description("Git helper CLI with git emoji commit shortcuts and aliases").version("1.0.5");

// Developer metadata
const developer = {
    name: "Shahid Khan",
    github: "https://github.com/shahidkhan18",
    email: "shahidseran786@gmail.com",
    note: "For full project information and contributions, see the GitHub repository."
};

// Utility to run shell commands and print output (throws on error)
function run(cmd, inheritStdout = true) {
    try {
        if (inheritStdout) {
            execSync(cmd, { stdio: "inherit", shell: true });
        } else {
            return execSync(cmd, { encoding: "utf8", shell: true }).toString();
        }
    } catch (err) {
        console.error(chalk.red("Command failed:"), chalk.yellow(cmd));
        if (err && err.stdout) console.error(err.stdout.toString());
        if (err && err.stderr) console.error(chalk.red(err.stderr.toString()));
        process.exit((err && err.status) || 1);
    }
}

// commit types (emoji, label, description)
const commits = {
    init: { emoji: "🎉", code: ":tada:", label: "INIT", desc: "Initial project setup" },
    feature: { emoji: "✨", code: ":sparkles:", label: "FEATURE", desc: "New feature or enhancement" },
    fix: { emoji: "🐛", code: ":bug:", label: "FIX", desc: "Bug fix" },
    hotfix: { emoji: "🚑", code: ":ambulance:", label: "HOTFIX", desc: "Urgent production fix" },
    delete: { emoji: "🔥", code: ":fire:", label: "DELETE", desc: "Remove code/files" },
    refactor: { emoji: "🔨", code: ":hammer:", label: "REFACTOR", desc: "Code restructure (no behavior change)" },
    docs: { emoji: "📚", code: ":books:", label: "DOCS", desc: "Documentation updates" },
    style: { emoji: "💄", code: ":lipstick:", label: "STYLE", desc: "Formatting, styles, UI minor changes" },
    ui: { emoji: "🎨", code: ":art:", label: "UI", desc: "UI/UX improvements" },
    test: { emoji: "✅", code: ":white_check_mark:", label: "TEST", desc: "Add/update tests" },
    perf: { emoji: "⚡", code: ":zap:", label: "PERF", desc: "Performance improvements" },
    deploy: { emoji: "🚀", code: ":rocket:", label: "DEPLOY", desc: "Deployment / CI changes" },
    upgrade: { emoji: "⬆️", code: ":arrow_up:", label: "UPGRADE", desc: "Upgrade dependencies" },
    config: { emoji: "🔧", code: ":wrench:", label: "CONFIG", desc: "Config or environment changes" },
    ci: { emoji: "👷", code: ":construction_worker:", label: "CI", desc: "CI pipeline changes" },
    security: { emoji: "🔒", code: ":lock:", label: "SECURITY", desc: "Security related changes" },
    rollback: { emoji: "⏪", code: ":rewind:", label: "ROLLBACK", desc: "Rollback or revert" },
    release: { emoji: "🔖", code: ":bookmark:", label: "RELEASE", desc: "Release/Version tag" },
    seo: { emoji: "🔍", code: ":mag:", label: "SEO", desc: "Search engine optimization" },
    a11y: { emoji: "🦽", code: ":wheelchair:", label: "ACCESSIBILITY", desc: "Accessibility improvements" },
    merge: { emoji: "🔀", code: ":twisted_rightwards_arrows:", label: "MERGE", desc: "Merge branches" },
    chore: { emoji: "🗑️", code: ":wastebasket:", label: "CHORE", desc: "Routine chores/cleanup" }
};

// Create a command for each commit type
Object.entries(commits).forEach(([key, info]) => {
    program
        .command(key)
        .argument("<message...>", "Commit message")
        .description(`${info.emoji} ${info.label} — ${info.desc}`)
        .option("-a, --all", "git add . before committing")
        .option("-A, --amend", "amend last commit instead of new one")
        .action((messageParts, opts) => {
            const message = messageParts.join(" ");
            if (opts.all) {
                console.log(chalk.dim("Running: git add ."));
                run("git add .");
            }
            const commitMsg = `${info.code} ${info.label} : ${message}`;
            const cmd = opts.amend ? `git commit --amend -m "${commitMsg}"` : `git commit -m "${commitMsg}"`;
            console.log(chalk.green(`Committing: ${info.emoji} ${info.label}`));
            run(cmd);
        });
});

// Amend (gmr) - rename last commit with provided type + message
program
    .command("amend")
    .argument("<type>", "commit type (eg fix|feature|ui|perf|docs|... )")
    .argument("<message...>", "New commit message")
    .description("Amend last commit with a new type and message (like gmr)")
    .action((type, messageParts) => {
        const message = messageParts.join(" ");
        const info = commits[type];
        if (!info) {
            console.error(chalk.red("Invalid type. See `gx emoji-list` for supported types."));
            process.exit(1);
        }
        const commitMsg = `${info.code} ${info.label} : ${message}`;
        run(`git commit --amend -m "${commitMsg}"`);
    });

// Emoji / reference list with color
program
    .command("emoji-list")
    .description("Show gitmoji (emoji) reference table")
    .action(() => {
        console.log(chalk.bold("\nGitmoji Reference Table\n"));
        Object.values(commits).forEach((c) => {
            const emoji = chalk.yellow(c.emoji);
            const label = chalk.green(c.label.padEnd(12));
            const desc = chalk.cyan(c.desc);
            const code = chalk.magenta(c.code.padEnd(24));
            console.log(`${emoji}  ${label} ${code} ${desc}`);
        });
        console.log("");
    });

// Add git alias commands (wrap common git commands)
const gitAliases = {
    ga: { cmd: "git add .", desc: "Stage all changes (shortcut for `git add .`). Useful for quickly staging everything." },
    gs: { cmd: "git status", desc: "Show working tree status. See what’s modified, staged, or untracked." },
    gm: { cmd: "git commit", desc: "Create a commit with staged changes (opens editor for message)." },
    gp: { cmd: "git push", desc: "Push current branch to remote." },
    gpl: { cmd: "git pull", desc: "Pull latest changes from remote for current branch." },
    gco: { cmd: "git checkout", desc: "Switch branches or restore files." },
    gb: { cmd: "git branch", desc: "List, create, or delete local branches." },
    gcm: { cmd: "git checkout main", desc: "Quickly switch to the `main` branch." },
    gps: { cmd: "git push origin main", desc: "Push `main` branch to remote." },
    gplm: { cmd: "git pull origin main", desc: "Pull latest changes from `main` branch." },
    gld: { cmd: "git log --oneline --graph --decorate --all", desc: "Pretty git log. Shows history as a decorated graph." },
    "reset-hard": { cmd: "git reset --hard HEAD~1", desc: "Discard the last commit and changes permanently. ⚠️ Use with caution." },
    "reset-soft": { cmd: "git reset --soft HEAD~1", desc: "Undo last commit but keep changes staged. Useful for re-committing with fixes." },
    "delete-local-branch": { cmd: "git branch -d", desc: "Delete a local branch. Use when branch is already merged." },
    "delete-remote-branch": { cmd: "git push origin --delete", desc: "Delete a branch on remote (GitHub/GitLab). ⚠️ Be careful." },
    stash: { cmd: "git stash", desc: "Save uncommitted changes temporarily." },
    "stash-pop": { cmd: "git stash pop", desc: "Restore most recent stashed changes and remove from stash list." },
    cls: { cmd: "clear", desc: "Clear terminal screen." }
};

// Create alias subcommands
program
    .command("a")
    .description("Run git aliases (shortcut commands for frequent git ops)")
    .argument("<alias>", "alias name (or 'list' to see all aliases)")
    .argument("[arg...]", "optional arguments passed to the git command")
    .action((alias, args) => {
        if (alias === "list") {
            console.log(chalk.bold("\nGit Aliases Reference\n"));
            Object.entries(gitAliases).forEach(([key, val]) => {
                const aliasName = chalk.green(key.padEnd(22));
                const cmd = chalk.yellow(val.cmd.padEnd(45));
                const desc = chalk.cyan(val.desc);
                console.log(`${aliasName} ${cmd} ${desc}`);
            });
            console.log("");
            return;
        }

        const entry = gitAliases[alias];
        if (!entry) {
            console.error(chalk.red("❌ Unknown alias."));
            console.log(chalk.yellow("👉 Use `gx a list` to see all supported aliases."));
            process.exit(1);
        }

        let cmd = entry.cmd;
        if (args && args.length) {
            cmd = `${cmd} ${args.join(" ")}`;
        }
        console.log(chalk.blueBright(`> Running: ${cmd}`));
        run(cmd);
    });

// Extra: show help with examples
program
    .command("examples")
    .description("Show usage examples")
    .action(() => {
        console.log(chalk.bold("\nExamples:\n"));
        console.log(chalk.green("  gx feature \"added login form\""));
        console.log(chalk.green("  gx fix -a \"fixed crash on signup\""));
        console.log(chalk.green("  gx fix -a --amend \"tweak message\""));
        console.log(chalk.green("  gx amend fix \"updated commit message\""));
        console.log(chalk.green("  gx a ga"));
        console.log(chalk.green("  gx emoji-list"));
        console.log("");
    });

// Append developer info to help output (always visible in --help and default help)
program.addHelpText(
    "after",
    `\n${chalk.bold("Developer Info")}\n  ${chalk.green("Name:")} ${developer.name}\n  ${chalk.green("GitHub:")} ${chalk.underline(developer.github)}\n  ${chalk.green("Email:")} ${developer.email}\n  ${chalk.dim(developer.note)}\n`
);

// If no args, display help
if (process.argv.length <= 2) {
    program.help();
}

program.parse(process.argv);
