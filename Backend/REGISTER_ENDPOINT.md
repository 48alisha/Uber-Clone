# User Registration Endpoint Documentation

## Endpoint Overview

### POST /user/register

This endpoint registers a new user and returns an authentication token along with user details.

---

## Description

The `/user/register` endpoint allows new users to create an account by providing their email, password, and full name (first and last name). The password is hashed using bcrypt before storage in the database. Upon successful registration, the user receives a JWT authentication token.

---

## Request Details

### Method
```
POST
```

### URL
```
http://localhost:[PORT]/user/register
```

### Content-Type
```
application/json
```

### Request Body

The request body must be a valid JSON object with the following structure:

```json
{
  "email": "user@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

### Field Requirements

| Field | Type | Required | Validation |
|-------|------|----------|-----------|
| `email` | String | ✅ Yes | Must be a valid email format (e.g., user@example.com) |
| `fullname.firstname` | String | ✅ Yes | Minimum 3 characters |
| `fullname.lastname` | String | ❌ No | Minimum 3 characters (if provided) |
| `password` | String | ✅ Yes | Minimum 6 characters |

---

## Response

### Success Response (201 Created)

**Status Code:** `201`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "user@example.com",
    "socketId": null
  }
}
```

---

### Error Responses

#### Invalid Validation (400 Bad Request)

**Status Code:** `400`

Returned when validation fails on any of the required fields.

**Example Response:**

```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "First name must be at least 3 characters long",
      "path": "fullname.firstname",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "Password must be 6 characters long",
      "path": "password",
      "location": "body"
    }
  ]
}
```

**Common Validation Errors:**

| Error Message | Reason | Solution |
|---------------|--------|----------|
| `Invalid Email` | Email format is incorrect | Use valid email format (e.g., user@example.com) |
| `First name must be at least 3 characters long` | First name is less than 3 characters | Enter at least 3 characters for first name |
| `Password must be 6 characters long` | Password is less than 6 characters | Use a password with minimum 6 characters |

---

## Example Requests

### Using Postman

1. **Set Request Type:** POST
2. **Set URL:** `http://localhost:5000/user/register`
3. **Set Headers:** 
   - `Content-Type: application/json`
4. **Set Body (raw JSON):**

```json
{
  "email": "john.doe@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securePassword123"
}
```

### Using cURL

```bash
curl -X POST http://localhost:5000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "password": "securePassword123"
  }'
```

### Using JavaScript (Fetch API)

```javascript
fetch('http://localhost:5000/user/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    fullname: {
      firstname: 'John',
      lastname: 'Doe'
    },
    password: 'securePassword123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

## Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| `201` | Created | User successfully registered |
| `400` | Bad Request | Validation failed - check error details |
| `500` | Internal Server Error | Server-side error occurred |

---

## Notes

- Passwords are **hashed using bcrypt** (10 salt rounds) before being stored in the database
- The returned **JWT token** is used for authentication in subsequent requests
- Ensure the email is **unique** - duplicate emails will cause an error
- All fields are **case-sensitive**
- The response excludes the actual password for security reasons

---

## Environment Variables Required

Make sure your `.env` file contains:
```
JWT_SECRET=your_secret_key_here
```

