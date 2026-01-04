#!/usr/bin/env bash
set -e
# Simple launcher for the built Vite app. Prefers Chromium/Chrome and falls back to xdg-open.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DIST="$DIR/dist/index.html"
if [ ! -f "$DIST" ]; then
  echo "Build not found in $DIST — running npm run build"
  (cd "$DIR" && npm run build)
fi
FILE_URL="file://$DIST"
# Try known chromium-like browsers with app mode
for BROWSER in chromium google-chrome-stable google-chrome chromium-browser brave-browser; do
  if command -v "$BROWSER" >/dev/null 2>&1; then
    # Use a persistent profile dir so the app opens in a standalone window
    PROFILE_DIR="$HOME/.cache/ev-predictor-profile"
    mkdir -p "$PROFILE_DIR"
    "$BROWSER" --user-data-dir="$PROFILE_DIR" --app="$FILE_URL" "$@" &
    exit 0
  fi
done
# Fallback: open in default browser
xdg-open "$DIST" &
