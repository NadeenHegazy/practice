# Git Complete Cheat Sheet (init -> rebase, stash, restore, conflicts)

---

## 1. Setup (one time)

| Command | What it does |
|---|---|
| `git --version` | Check Git is installed |
| `git config --global user.name "Your Name"` | Set your name for commits |
| `git config --global user.email "you@email.com"` | Set your email for commits |
| `git config --global init.defaultBranch main` | New repos start with `main` instead of `master` |
| `git config --list` | Show all settings |

## 2. Start a repository

| Command | What it does |
|---|---|
| `git init` | Turn the current folder into a Git repo |
| `git clone <url>` | Download an existing repo from GitHub |
| `git remote add origin <url>` | Link your local repo to a GitHub repo |
| `git remote -v` | Show linked remotes |
| `git push -u origin main` | First push; links local `main` to `origin/main` |

## 3. Daily basics

| Command | What it does |
|---|---|
| `git status` | Show branch + changed/staged files (run it often) |
| `git add <file>` | Stage one file |
| `git add .` | Stage everything changed |
| `git commit -m "message"` | Save staged changes as a commit |
| `git commit -am "message"` | Stage tracked files + commit in one step (not new files) |
| `git diff` | Show unstaged changes |
| `git diff --staged` | Show staged changes (what will be committed) |
| `git log` | Full commit history |
| `git log --oneline` | One line per commit |
| `git log --oneline --graph --all -8` | Last 8 commits as a tree, all branches |
| `git show <commit-id>` | Show what one commit changed |

Flow: **edit -> `git add` -> `git commit`**

## 4. Branches

| Command | What it does |
|---|---|
| `git branch` | List local branches |
| `git branch -a` | List local + remote branches |
| `git switch <branch>` | Move to a branch |
| `git switch -c <new-branch>` | Create a branch and move to it |
| `git branch -m <new-name>` | Rename current branch |
| `git branch -d <branch>` | Delete a merged branch |
| `git branch -D <branch>` | Force delete a branch |
| `git push origin --delete <branch>` | Delete a branch on GitHub |

## 5. Merge

```bash
git switch main
git status
git merge feature/user-profile
git log --oneline --graph --all -6
git push
```

- Merge always goes **INTO the branch you are on**.
- **Fast-forward**: main didn't move, Git just moves the pointer.
- **Merge commit**: both branches moved, Git creates `Merge branch '...'`.
- `git merge --abort` - cancel a merge that has conflicts.

### Vim escape (merge message editor opens)
1. Press `Esc`
2. Type `:wq`
3. Press `Enter`

(`:q!` = quit without saving)

## 6. Resolving conflicts (merge or rebase)

A conflict happens when two branches changed the same lines.

Git marks the file like this:
```
<<<<<<< HEAD
your current branch's version
=======
the other branch's version
>>>>>>> feature/xyz
```

Steps:
1. `git status` - see which files are in conflict ("both modified")
2. Open the file, choose the right code (keep one, or combine both)
3. **Delete** the `<<<<<<<`, `=======`, `>>>>>>>` lines
4. `git add <file>` - mark it as resolved
5. Finish:
   - Merge: `git commit` (or `git merge --continue`)
   - Rebase: `git rebase --continue`
   - Cherry-pick: `git cherry-pick --continue`

| Shortcut command | What it does |
|---|---|
| `git checkout --ours <file>` | Keep the version from the current branch |
| `git checkout --theirs <file>` | Keep the version from the other branch |
| `git merge --abort` | Cancel the merge |
| `git rebase --abort` | Cancel the rebase |
| `git cherry-pick --abort` | Cancel the cherry-pick |

> Careful: during a **rebase**, "ours" and "theirs" are swapped
> (ours = the branch you're rebasing onto, theirs = your commit being replayed).

## 7. Push, fetch, pull

| Command | What it does |
|---|---|
| `git push` | Upload commits to GitHub |
| `git push -u origin <branch>` | Push a new branch and link it |
| `git fetch` | Download updates, **doesn't touch your files** (safe) |
| `git fetch --prune` | Fetch + remove references to deleted remote branches |
| `git pull` | Fetch + merge |
| `git pull --rebase` | Fetch + rebase (cleaner history) |
| `git push --force-with-lease` | Safe force push (needed after rebasing a pushed branch) |

After fetch, compare:
```bash
git log --oneline main..origin/main    # commits on GitHub you don't have
git diff main origin/main              # the actual changes
```

Team workflow:
```
branch -> commit -> push -> GitHub -> fetch -> review -> merge -> main -> push
```

## 8. Undo things (restore, reset, revert)

| Situation | Command | What it does |
|---|---|---|
| Discard changes in a file (not staged) | `git restore <file>` | Put the file back to the last commit |
| Discard ALL unstaged changes | `git restore .` | Same, for everything |
| Unstage a file (keep your edits) | `git restore --staged <file>` | Undo `git add` |
| Get a file from another commit | `git restore --source=<commit-id> <file>` | Bring back an old version of a file |
| Fix last commit message | `git commit --amend -m "new message"` | Rewrite the last commit's message |
| Add a forgotten file to last commit | `git add <file>` then `git commit --amend --no-edit` | Adds it to the last commit |
| Undo last commit, keep changes staged | `git reset --soft HEAD~1` | Commit removed, work still staged |
| Undo last commit, keep changes unstaged | `git reset HEAD~1` (or `--mixed`) | Commit removed, work kept in files |
| Undo last commit, DELETE changes | `git reset --hard HEAD~1` | Dangerous: work is gone |
| Undo a commit safely (already pushed) | `git revert <commit-id>` | Makes a NEW commit that cancels the old one |
| Find lost commits | `git reflog` | History of where HEAD has been (rescue tool) |
| Recover after a bad reset | `git reset --hard <id-from-reflog>` | Go back to that point |
| Delete untracked files | `git clean -fd` | Dangerous: removes new files (use `git clean -nd` to preview) |

Rule: **`restore` = files, `reset` = local commits, `revert` = pushed commits.**

## 9. Stash (save unfinished work temporarily)

Use it when you need to switch branches but aren't ready to commit.

| Command | What it does |
|---|---|
| `git stash` | Save changes away and get a clean working tree |
| `git stash push -m "message"` | Stash with a name |
| `git stash -u` | Also stash new (untracked) files |
| `git stash list` | Show all stashes |
| `git stash show -p stash@{0}` | Show what's in a stash |
| `git stash pop` | Re-apply the latest stash AND delete it |
| `git stash apply` | Re-apply the latest stash but KEEP it |
| `git stash apply stash@{1}` | Apply a specific stash |
| `git stash drop stash@{0}` | Delete one stash |
| `git stash clear` | Delete ALL stashes |
| `git stash branch <new-branch>` | Create a branch from a stash |

Typical flow:
```bash
git stash                 # save half-done work
git switch other-branch   # do something else
git switch -                # come back (- = previous branch)
git stash pop             # continue where you left off
```

## 10. Rebase

**Idea:** Move your branch's commits so they start from the newest `main`. History becomes a straight line.

Before (main moved ahead while you worked):
```
main:     o --- o --- M
               \
feature:        A --- B
```
After `git rebase main`:
```
main:     o --- o --- M
                       \
feature:                A' --- B'
```
(A' and B' are copies with new commit IDs.)

### Practice flow
```bash
git switch -c feature/rebase-practice
# edit app.js
git add app.js
git commit -m "Add user email helper"
git add app.js
git commit -m "Add user name helper"

git switch main                         # simulate a teammate changing main
# edit app.js
git add app.js
git commit -m "Update developer role"

git switch feature/rebase-practice
git rebase main                         # replay your commits on top of main
git log --oneline --graph --all -8      # check the straight line
```

| Command | What it does |
|---|---|
| `git rebase main` | Replay your commits on top of the latest main |
| `git rebase origin/main` | Same, but onto the GitHub version of main |
| `git rebase --continue` | After resolving a conflict + `git add`, keep going |
| `git rebase --abort` | Cancel and return to how things were |
| `git rebase --skip` | Drop the commit that's conflicting |

### Rebase with a conflict
1. `git rebase main` -> `CONFLICT` message, rebase pauses
2. `git status` -> see the conflicted file
3. Fix the file, remove `<<<<<<<` markers
4. `git add <file>`
5. `git rebase --continue`
6. Repeat if more conflicts. Stuck? `git rebase --abort`

### After rebasing a branch that is already pushed
```bash
git push --force-with-lease
```

**Golden rule:** never rebase `main` or branches other people are using.

### Merge vs Rebase
- **merge** = joins histories, keeps a merge commit, doesn't rewrite history
- **rebase** = moves your commits, straight history, rewrites your commits

## 11. Cherry-pick

**Idea:** Copy ONE specific commit onto your current branch.

```bash
git log --oneline --all            # find the commit ID
git switch main                    # go to the branch that should receive it
git cherry-pick b60552b            # apply that commit here
```

| Command | What it does |
|---|---|
| `git cherry-pick <id>` | Apply that commit here |
| `git cherry-pick <id1> <id2>` | Apply several commits |
| `git cherry-pick --continue` | Continue after fixing a conflict |
| `git cherry-pick --abort` | Cancel |

## 12. Interactive rebase (clean up your commits)

```bash
git rebase -i HEAD~3      # edit the last 3 commits
```

Change the word at the start of each line:

| Word | What it does |
|---|---|
| `pick` | Keep the commit as is |
| `reword` | Keep the commit, change its message |
| `squash` | Merge into the previous commit (keep both messages) |
| `fixup` | Merge into the previous commit (discard this message) |
| `drop` | Delete the commit |
| (reorder lines) | Changes the commit order |

Save and close: `Esc`, `:wq`, `Enter`.

## 13. Tags (optional, handy)

| Command | What it does |
|---|---|
| `git tag v1.0` | Mark the current commit with a version name |
| `git tag` | List tags |
| `git push origin v1.0` | Push a tag to GitHub |

## 14. Pull Request workflow

1. `git switch -c feature/my-feature`
2. Edit, `git add`, `git commit`
3. `git push -u origin feature/my-feature`
4. Open a Pull Request on GitHub
5. Review -> requested changes -> commit + `git push` again
6. Merge the PR on GitHub
7. Locally: `git switch main` then `git pull`
8. Clean up: `git branch -d feature/my-feature`

## 15. Full team simulation (everything together)

```bash
git switch main
git pull                               # start from the latest main
git switch -c feature/my-feature       # create branch
# make changes
git add .
git commit -m "Describe the change"
git push -u origin feature/my-feature  # push
git fetch                              # see what changed on GitHub
git rebase origin/main                 # put your work on top of latest main
# conflict? fix file -> git add <file> -> git rebase --continue
git push --force-with-lease            # update the branch after rebase
# open PR -> review -> merge on GitHub
git switch main
git pull                               # get the merged result
```

---

## Quick memory tricks

- **fetch** = look, **pull** = look + merge
- **merge** = join, **rebase** = move your commits, **cherry-pick** = copy one commit
- **restore** = undo file changes, **reset** = undo local commits, **revert** = undo pushed commits
- **stash** = put work in a drawer, **pop** = take it back out
- Run `git status` before and after anything important
- Stuck in the middle of something? Try `--abort`
