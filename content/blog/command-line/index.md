---
title: Useful command line snippets
date: "2019-12-08T20:35:03.284Z"
description: "Useful command line stuff for myself"
---

**Yarn**

Interactively check all npm dependencies for updates

```bash
yarn upgrade-interactive --latest

```

**Prettier**

Format all `.json` and `.js` files with Prettier

```bash
prettier --parser flow --write --single-quote --no-bracket-spacing --trailing-comma es5 \"src/**/*.js\"
```
