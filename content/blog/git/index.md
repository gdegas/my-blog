---
title: Useful Git Commands
date: "2019-12-07T20:35:03.284Z"
description: "Useful things to do with GIT"
---

**Git**

Tell git to skip tracking changes on updates of a file
```bash
git update-index --skip-worktree {filepath here}

```

Ignoring a previously committed file

```bash
$ echo debug.log >> .gitignore
$ git rm --cached debug.log
rm 'debug.log'
\$ git commit -m "Start ignoring debug.log"
```

Reverting a rebase

```bash
git reflog
git reset —hard HEAD@{2}
```

Remove all your local git branches but keep master

```bash
git branch | grep -v "master" | xargs git branch -D
```

Undo a commit that has already been pushed to the remote repository

```bash
git revert c011d0f
```

Temporarily store some work in progress because I have to jump to another branch

```bash
git stash
git stash list
git stash pop
git stash apply
```

To find commits of the author
```bash
git log --author=Oguzhan

# Check commit with message
git show --color --pretty=format:%b c2b88ed806fb5728a376bddab0c0e6d13d1ee15a

```
