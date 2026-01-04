#!/usr/bin/env bash
set -e
# Generate Linux icon sizes from project root `logo.png` into src-tauri/icons/
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$DIR/logo.png"
DEST_DIR="$DIR/src-tauri/icons"

if [ ! -f "$SRC" ]; then
  echo "Error: $SRC not found. Place your logo.png at project root."
  exit 1
fi

if ! command -v convert >/dev/null 2>&1; then
  echo "ImageMagick 'convert' command not found. Install it (e.g. 'sudo apt install imagemagick') and re-run this script."
  exit 1
fi

mkdir -p "$DEST_DIR"
SIZES=(512 256 128 64 48 32)
for s in "${SIZES[@]}"; do
  OUT="$DEST_DIR/icon-${s}.png"
  echo "Generating $OUT"
  convert "$SRC" -resize "${s}x${s}" -background none -gravity center -extent "${s}x${s}" "$OUT"
done
# Create canonical icon.png (512)
cp -f "$DEST_DIR/icon-512.png" "$DEST_DIR/icon.png"

echo "Icons generated in $DEST_DIR"
