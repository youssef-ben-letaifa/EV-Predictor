#!/usr/bin/env bash
set -e
# Installs the desktop entry and icon for the EV Predictor app for the current user.
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ICON_SRC="$DIR/logo.png"
if [ ! -f "$ICON_SRC" ]; then
  echo "Error: $ICON_SRC not found. Put your app icon at $ICON_SRC"
  exit 1
fi
ICON_DST="$HOME/.local/share/icons/hicolor/256x256/apps/ev-predictor.png"
DESKTOP_DST="$HOME/.local/share/applications/ev-predictor.desktop"
mkdir -p "$(dirname "$ICON_DST")" "$(dirname "$DESKTOP_DST")"
cp "$ICON_SRC" "$ICON_DST"
sed "s|%APPDIR%|$DIR|g; s|%ICONPATH%|$ICON_DST|g" "$DIR/ev-predictor.desktop.template" > "$DESKTOP_DST"
chmod 644 "$DESKTOP_DST"
echo "Installed icon to $ICON_DST"
echo "Installed desktop entry to $DESKTOP_DST"
echo "You can run the app from your desktop menu or with:"
echo "  $DESKTOP_DST"
update-desktop-database "$HOME/.local/share/applications" 2>/dev/null || true
