#!/bin/bash

curl -X POST http://localhost:3000/api/auth/new \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
