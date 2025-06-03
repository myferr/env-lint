#!/bin/bash
set -e

# Read version from package.json using node
version=$(node -p "require('./package.json').version")

if [ -z "$version" ]; then
  echo "Could not read version from package.json"
  exit 1
fi

tag="v$version"

# Check if tag already exists
if git rev-parse "$tag" >/dev/null 2>&1; then
  echo "Tag $tag already exists."
  exit 1
fi

echo "Creating git tag $tag"
git tag "$tag"

echo "Pushing tag $tag to origin"
git push origin "$tag"

echo "Done!"
