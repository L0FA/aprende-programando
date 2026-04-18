#!/usr/bin/env bash
# exit on error
set -o errexit

npm install --legacy-peer-deps
npx prisma@5.22.0 generate
npx prisma@5.22.0 db push --skip-generate
