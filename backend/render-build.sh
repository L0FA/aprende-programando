#!/usr/bin/env bash
# exit on error
set -o errexit

npm install
npx prisma generate
# npx prisma db push # Optional: runs migrations on every deploy
