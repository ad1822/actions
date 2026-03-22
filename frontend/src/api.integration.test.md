# Integration Tests

## Overview
Integration tests for backend API endpoints running on `localhost:8080`.

## Prerequisites
- Backend server must be running on port 8080
- Endpoints tested:
  - `GET /health` - Health check endpoint
  - `GET /products` - Products listing endpoint

## Running Tests

### Run all tests (unit + integration)
```bash
npm test
```

### Run only integration tests
```bash
npm run test:integration
```

### Run only unit tests
```bash
npm run test:unit
```

## Test Coverage

### Health Endpoint Tests
- ✓ Returns 200 status
- ✓ Responds quickly (< 1 second)
- ✓ Returns valid response format

### Products Endpoint Tests
- ✓ Returns 200 status
- ✓ Returns array of products
- ✓ Products have valid structure (name, price)
- ✓ Returns JSON content-type
- ✓ Responds within acceptable time (< 2 seconds)

### Error Handling Tests
- ✓ Handles non-existent endpoints gracefully

### Backend Availability Tests
- ✓ Confirms backend is running on port 8080

## Troubleshooting

### Backend Not Running
If you see "Backend is not running on localhost:8080":
1. Start your backend server
2. Verify it's listening on port 8080
3. Run the tests again

### Tests Timing Out
If tests timeout:
- Check backend server performance
- Increase timeout in the test file (default: 5000ms)
- Verify network connectivity to localhost

## Configuration
The tests use:
- Base URL: `http://localhost:8080`
- Request timeout: 5000ms (5 seconds)
- All status codes are accepted (no automatic errors)
