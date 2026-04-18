#!/usr/bin/env bash
# exit on error
set -o errexit

npm install --legacy-peer-deps
npx prisma generate
npx prisma db push --skip-generate
