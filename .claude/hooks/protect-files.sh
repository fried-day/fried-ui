#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
FILE_NAME=$(basename "$FILE_PATH")

PROTECTED_FILES="pnpm-lock.yaml .env .env.production .env.local firebase.json"

for f in $PROTECTED_FILES; do
  if [ "$FILE_NAME" = "$f" ]; then
    echo "Cannot edit protected file: $FILE_NAME" >&2
    exit 2
  fi
done

exit 0
