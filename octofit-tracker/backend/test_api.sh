#!/bin/bash

# Test API endpoints for OctoFit Tracker
# This script tests all REST API endpoints

# Set the base URL based on environment
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
else
    BASE_URL="http://localhost:8000"
fi

echo "Testing OctoFit Tracker API at: $BASE_URL"
echo "============================================"
echo ""

# Test API root
echo "1. Testing API Root:"
curl -s "${BASE_URL}/" | jq '.' || curl -s "${BASE_URL}/"
echo ""
echo ""

# Test Teams endpoint
echo "2. Testing Teams endpoint:"
curl -s "${BASE_URL}/api/teams/" | jq '.' || curl -s "${BASE_URL}/api/teams/"
echo ""
echo ""

# Test Users endpoint
echo "3. Testing Users endpoint:"
curl -s "${BASE_URL}/api/users/" | jq '.' || curl -s "${BASE_URL}/api/users/"
echo ""
echo ""

# Test Activities endpoint
echo "4. Testing Activities endpoint:"
curl -s "${BASE_URL}/api/activities/" | jq '.' || curl -s "${BASE_URL}/api/activities/"
echo ""
echo ""

# Test Workouts endpoint
echo "5. Testing Workouts endpoint:"
curl -s "${BASE_URL}/api/workouts/" | jq '.' || curl -s "${BASE_URL}/api/workouts/"
echo ""
echo ""

# Test Leaderboard endpoint
echo "6. Testing Leaderboard endpoint:"
curl -s "${BASE_URL}/api/leaderboard/" | jq '.' || curl -s "${BASE_URL}/api/leaderboard/"
echo ""
echo ""

echo "============================================"
echo "API testing complete!"
