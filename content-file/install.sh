#!/bin/bash

remote_url="https://www.kooboo.com/api/kooboo.deb"
temporary_file_template="${TMPDIR:-/tmp}/kooboo.XXXXXXXXX.deb"
local_deb="${local_deb:-$(mktemp "$temporary_file_template")}"
appdata="/var/lib/kooboo"

sudo apt update
sudo systemctl daemon-reload

if systemctl is-active --quiet kooboo; then
  echo "Kooboo service is running. Stopping it..."
  sudo systemctl stop kooboo
fi

if dpkg -l | grep -q kooboo; then
  echo "Uninstalling old Kooboo..."
  sudo apt remove kooboo -y
  sudo rm -rf /usr/share/kooboo
fi

echo "Downloading the deb file from $remote_url..."
wget -O "$local_deb" "$remote_url"
sudo chmod 644 "$local_deb"

echo "Installing $local_deb..."
sudo apt install "$local_deb"

if [[ ! -e $appdata ]]; then
  sudo mkdir $appdata
  sudo chmod -R 777 $appdata
fi

echo "Reload services"
sudo apt update
sudo systemctl daemon-reload
if dpkg -l | grep -q kooboo; then
  echo "Starting Kooboo service..."
  sudo systemctl start kooboo
  echo "Kooboo installed successfully."
else
  echo "Kooboo install failed."
fi

rm -f "$local_deb"
