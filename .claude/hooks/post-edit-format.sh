#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR" || exit 0

# Format
if [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx|mjs|json|css|md|mdx)$ ]]; then
  npx prettier --write "$FILE_PATH" 2>/dev/null
fi

# Lint fix
if [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx|mjs)$ ]]; then
  npx eslint --fix "$FILE_PATH" 2>/dev/null
fi

exit 0
