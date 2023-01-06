#! /bin/bash

# Install node_modules
npm install

# Set the GitHub repo name and build the app
GITHUB_REPO="snippet-copier" npm run build &&

# Create a branch `gh-pages` inside the folder
git worktree add gh-pages

# Delete all files inside `gh-pages` folder, except the `.git` (to preserve the worktree)
find gh-pages/ -mindepth 1 -not -name '.git' -delete

# Create `.nojekyll` file inside `gh-pages` folder (to make undersore folders like `_next` work)
touch gh-pages/.nojekyll &&

# Copy all files from the `dist` to `gh-pages` folder
cp -r dist/* gh-pages/ &&

# Commit changes inside `gh-pages` folder/branch and push them to GitHub
cd gh-pages &&
git add . &&
git commit -m 'Deploy' &&
git push --set-upstream origin gh-pages
