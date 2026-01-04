#!/usr/bin/env bash
set -e
# Helper to install Rust toolchain and tauri-cli (user must confirm)
if command -v rustc >/dev/null 2>&1; then
  echo "Rust already installed: $(rustc --version)"
else
  echo "Installing Rust via rustup..."
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  source "$HOME/.cargo/env"
fi
if ! command -v cargo >/dev/null 2>&1; then
  echo "cargo not found after rustup. Please restart your shell and re-run this script."
  exit 1
fi
if ! command -v tauri >/dev/null 2>&1; then
  echo "Installing tauri-cli via cargo..."
  cargo install tauri-cli
else
  echo "tauri-cli already installed: $(tauri --version)"
fi

echo "Done. You can now run: npm run tauri:dev or npm run tauri:build"
