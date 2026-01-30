#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting standalone build process..."

# Run the Next.js build
# This will trigger lingui compile and next build as per package.json
npm run build

# Check if standalone directory exists
if [ -d ".next/standalone" ]; then
    echo "📦 Copying public and static files to standalone directory..."
    
    # Copy public folder
    cp -r public .next/standalone/
    
    # Copy static files
    mkdir -p .next/standalone/.next/static
    cp -r .next/static .next/standalone/.next/
    
    echo "✅ Standalone build ready in .next/standalone"
    echo "🚀 You can start the server with: node .next/standalone/server.js"
else
    echo "❌ Error: .next/standalone directory not found."
    echo "Make sure 'output: \"standalone\"' is set in next.config.ts"
    exit 1
fi
