---
title: Useful Git Commands
date: "2019-12-07T20:35:03.284Z"
description: "Useful things to do with GIT"
---

**Git**

Temporarily go back to a commit

```git
# This will detach your HEAD, that is, leave you with no branch checked out:
git checkout 0d1d7fc32
```

If you want to make commits while you're there, go ahead and make a new branch while you're at it:

```git
git checkout -b old-state 0d1d7fc32
```

Revert to previous commit

```git
git reset --hard HEAD
```

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

Branch off a branch and how to rebase/land without messing up commit history

```bash
git checkout branch1
git add .
git commit -m "first commit"
git push...
git checkout -b branch2
git add .
git commit -m "first commit, branch 2"
git checkout branch1
arc land
git checkout branch2
git reset HEAD~3 (however many commits until back to inline with branch1)
git checkout master
git checkout -b newBranch
git add .
git commit -m "Now were back to where we were in branch2 work with aligned commit history!"
```

When receiving error message:

```bash
Usage Exception: There are multiple revisions on feature branch 'newbranch' which are not present on 'devel': -D newbranch1 -D othernew branch
```

Solution:

```bash
arc land --revision D123 --onto devel
```
