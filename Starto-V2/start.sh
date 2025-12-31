#!/bin/bash

# Run migrations (optional, uncomment if needed)
# npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate

# Start the application
npm run start
