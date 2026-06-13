# BrightRoots - API Design Document

## Overview

The BrightRoots API follows RESTful design principles.

All protected endpoints require JWT authentication.

Base URL:

```text
/api/v1

```

---

# Authentication APIs

## Register User

### Endpoint

```http
POST /api/v1/auth/register

```

### Purpose

Create a new parent account.

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

```

### Success Response

```json
{
  "success": true,
  "message": "User registered successfully"
}

```

---

## Login User

### Endpoint

```http
POST /api/v1/auth/login

```

### Purpose

Authenticate user and generate JWT token.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}

```

### Success Response

```json
{
  "success": true,
  "token": "jwt_token"
}

```

---

# Child Profile APIs

## Create Child

### Endpoint

```http
POST /api/v1/children

```

### Authentication

Required

### Request Body

```json
{
  "name": "Emma",
  "age": 6,
  "gender": "Female"
}

```

### Success Response

```json
{
  "success": true,
  "message": "Child profile created"
}

```

---

## Get All Children

### Endpoint

```http
GET /api/v1/children

```

### Authentication

Required

### Success Response

```json
{
  "success": true,
  "children": []
}

```

---

## Get Child By ID

### Endpoint

```http
GET /api/v1/children/:id

```

### Authentication

Required

---

## Update Child

### Endpoint

```http
PUT /api/v1/children/:id

```

### Authentication

Required

---

## Delete Child

### Endpoint

```http
DELETE /api/v1/children/:id

```

### Authentication

Required

---

# Screen Time APIs

## Add Screen Time Log

### Endpoint

```http
POST /api/v1/screen-time

```

### Authentication

Required

### Request Body

```json
{
  "childId": "child_id",
  "date": "2026-06-15",
  "durationMinutes": 120
}

```

### Success Response

```json
{
  "success": true,
  "message": "Screen time log created"
}

```

---

## Get Screen Time History

### Endpoint

```http
GET /api/v1/screen-time/:childId

```

### Authentication

Required

---

# Sleep Tracking APIs

## Add Sleep Log

### Endpoint

```http
POST /api/v1/sleep

```

### Authentication

Required

### Request Body

```json
{
  "childId": "child_id",
  "date": "2026-06-15",
  "sleepHours": 8
}

```

### Success Response

```json
{
  "success": true,
  "message": "Sleep log created"
}

```

---

## Get Sleep History

### Endpoint

```http
GET /api/v1/sleep/:childId

```

### Authentication

Required

---

# Outdoor Activity APIs

## Add Outdoor Activity Log

### Endpoint

```http
POST /api/v1/outdoor-activity

```

### Authentication

Required

### Request Body

```json
{
  "childId": "child_id",
  "date": "2026-06-15",
  "activityMinutes": 45
}

```

### Success Response

```json
{
  "success": true,
  "message": "Outdoor activity recorded"
}

```

---

## Get Outdoor Activity History

### Endpoint

```http
GET /api/v1/outdoor-activity/:childId

```

### Authentication

Required

---

# Recommendation APIs

## Generate Recommendations

### Endpoint

```http
POST /api/v1/recommendations/generate/:childId

```

### Authentication

Required

### Purpose

Generate personalized recommendations based on:

- Screen Time
- Sleep
- Outdoor Activity

### Success Response

```json
{
  "success": true,
  "message": "Recommendations generated"
}

```

---

## Get Recommendations

### Endpoint

```http
GET /api/v1/recommendations/:childId

```

### Authentication

Required

### Success Response

```json
{
  "success": true,
  "recommendations": []
}

```

---

# Resource Library APIs

## Get All Resources

### Endpoint

```http
GET /api/v1/resources

```

### Authentication

Not Required

### Purpose

Fetch all parenting resources.

---

## Get Resource By ID

### Endpoint

```http
GET /api/v1/resources/:id

```

### Authentication

Not Required

---

# Dashboard APIs

## Get Dashboard Summary

### Endpoint

```http
GET /api/v1/dashboard/:childId

```

### Authentication

Required

### Purpose

Return dashboard statistics.

### Response Includes

- Child Profile Summary
- Screen Time Statistics
- Sleep Statistics
- Outdoor Activity Statistics
- Latest Recommendations

---

# Authentication Strategy

Protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>

```

---

# Error Response Format

All API errors should follow:

```json
{
  "success": false,
  "message": "Error description"
}

```

---

# Future API Expansion

Future endpoints may include:

- AI Assistant APIs
- Goal Tracking APIs
- Family Challenge APIs
- Notification APIs
- Community APIs

These endpoints are intentionally excluded from the MVP.