#!/bin/bash
# Security Check Script for MongoDB Credentials
# Run this script to verify no sensitive data is exposed

echo "🔍 MongoDB Security Check"
echo "========================"

echo "1. Checking for .env files in Git..."
if git ls-files | grep -q "\.env"; then
    echo "❌ WARNING: .env files found in Git repository!"
    git ls-files | grep "\.env"
else
    echo "✅ No .env files found in Git repository"
fi

echo ""
echo "2. Checking Git history for MongoDB credentials..."
if git log --all --full-history -- "*" | grep -qi "mongodb+srv.*password"; then
    echo "❌ WARNING: MongoDB credentials found in Git history!"
else
    echo "✅ No MongoDB credentials found in Git history"
fi

echo ""
echo "3. Checking for hardcoded credentials in source code..."
if grep -r "mongodb+srv://" . --exclude-dir=node_modules --exclude-dir=.git; then
    echo "❌ WARNING: Hardcoded MongoDB URIs found!"
else
    echo "✅ No hardcoded MongoDB URIs found"
fi

echo ""
echo "4. Checking .gitignore for security files..."
if grep -q "\.env" .gitignore && grep -q "\*\.key" .gitignore; then
    echo "✅ .gitignore properly configured for security files"
else
    echo "❌ WARNING: .gitignore may not be properly configured"
fi

echo ""
echo "5. Checking for any credential patterns..."
if grep -r -E "(password|secret|key|token).*=.*['\"].*['\"]" . --exclude-dir=node_modules --exclude-dir=.git --exclude="*.md"; then
    echo "❌ WARNING: Potential hardcoded credentials found!"
else
    echo "✅ No obvious hardcoded credentials found"
fi

echo ""
echo "🔒 Security Check Complete!"
echo "If any warnings were found, please address them immediately."
