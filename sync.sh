#!/bin/bash

# ScholarTrail GitHub Sync Script
# This script stages changes, commits with a message, updates the changelog, and pushes to GitHub

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Check for uncommitted changes
if [[ -z $(git status -s) ]]; then
    echo -e "${YELLOW}No changes to commit${NC}"
    exit 0
fi

# Default commit message
DEFAULT_MESSAGE="Update project files"

# Get commit message from user or use default
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}No commit message provided. Using default: '$DEFAULT_MESSAGE'${NC}"
    read -p "Enter commit message (or press Enter for default): " USER_MESSAGE
    COMMIT_MESSAGE=${USER_MESSAGE:-$DEFAULT_MESSAGE}
else
    COMMIT_MESSAGE="$*"
fi

echo -e "${GREEN}Starting sync process...${NC}"

# Stage all changes
echo "Staging all changes..."
git add -A

# Create the full commit message with Claude Code attribution
FULL_COMMIT_MESSAGE="$COMMIT_MESSAGE

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Commit changes
echo "Creating commit..."
git commit -m "$FULL_COMMIT_MESSAGE"

if [ $? -ne 0 ]; then
    echo -e "${RED}Commit failed${NC}"
    exit 1
fi

# Get the current date
CURRENT_DATE=$(date +%Y-%m-%d)

# Update CHANGELOG.md
echo "Updating CHANGELOG.md..."

# Create a temporary file with the new entry
TEMP_CHANGELOG=$(mktemp)

# Check if today's date already exists in the changelog
if grep -q "## \[$CURRENT_DATE\]" CHANGELOG.md 2>/dev/null; then
    # Add to existing date section
    awk -v date="## \[$CURRENT_DATE\]" -v msg="- $COMMIT_MESSAGE" '
        /^## \[/ && found {exit}
        $0 ~ date {found=1; print; getline; print; print msg; next}
        {print}
    ' CHANGELOG.md > "$TEMP_CHANGELOG"
else
    # Create new date section
    awk -v date="$CURRENT_DATE" -v msg="$COMMIT_MESSAGE" '
        /^## \[/ && !done {
            print "## [" date "]"
            print ""
            print "### Changed"
            print "- " msg
            print ""
            done=1
        }
        {print}
    ' CHANGELOG.md > "$TEMP_CHANGELOG"
fi

# If CHANGELOG.md doesn't exist or the update failed, create a basic entry
if [ ! -s "$TEMP_CHANGELOG" ]; then
    cat > "$TEMP_CHANGELOG" << EOF
# Changelog

All notable changes to ScholarTrail will be documented in this file.

## [$CURRENT_DATE]

### Changed
- $COMMIT_MESSAGE

EOF
fi

# Replace the original changelog
mv "$TEMP_CHANGELOG" CHANGELOG.md

# Stage the updated changelog
git add CHANGELOG.md

# Amend the commit to include the changelog update
git commit --amend --no-edit

echo -e "${GREEN}Changelog updated${NC}"

# Push to GitHub
echo "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Successfully synced to GitHub!${NC}"
    echo -e "${GREEN}✓ Changelog updated with: $COMMIT_MESSAGE${NC}"
else
    echo -e "${RED}Failed to push to GitHub${NC}"
    exit 1
fi