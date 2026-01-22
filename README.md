# 🚗 Uber Clone

A full-stack web application that replicates the core functionality of Uber. This project includes user registration, authentication, and ride management features built with Node.js, Express, and MongoDB.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

- 👤 **User Registration & Authentication** - Secure user account creation with password hashing
- 🔐 **JWT Authentication** - Token-based authentication for secure API access
- 📧 **Email Validation** - Ensures valid email addresses during registration
- 🔒 **Password Security** - Passwords are hashed using bcrypt before storage
- 📱 **User Profile Management** - Store and retrieve user information
- 🗺️ **Real-time Updates** - Socket.IO integration for live features (coming soon)

---

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** Bcrypt
- **Validation:** Express Validator

### Frontend
- **Coming Soon** 🚀

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas (cloud)
- **Git** - [Download](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone
```

---

## 📦 Installation

### 1. Install Backend Dependencies

Navigate to the Backend folder and install all required packages:

```bash
cd Backend
npm install
```

This will install:
- express - Web framework
- mongoose - MongoDB object modeling
- bcrypt - Password hashing
- jsonwebtoken - JWT authentication
- express-validator - Input validation
- dotenv - Environment variable management

### 2. Install Frontend Dependencies (Optional)

```bash
cd ../Frontend
npm install
```

---

## ⚙️ Configuration

### Create Environment Variables

Create a `.env` file in the `Backend` folder with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/uber-clone
# or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/uber-clone

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development
```

### Generate a Secure JWT Secret

Run this command to generate a random secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` in the `.env` file.

---

## ▶️ Running the Project

### Start the Backend Server

From the `Backend` folder:

```bash
npm start
```

Or for development with auto-restart on file changes (install nodemon first):

```bash
npm install -g nodemon
nodemon app.js
```

The server will start at: `http://localhost:5000`

### Check if Server is Running

Open your browser and visit:
```
http://localhost:5000
```

---

## 📡 API Endpoints

### User Endpoints

#### Register a New User
```
POST /user/register
```

**Required Data:**
```json
{
  "email": "john@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "password123"
}
```

**Requirements:**
- Email must be valid (e.g., user@example.com)
- First name must be at least 3 characters
- Password must be at least 6 characters
- Last name (optional)

**Success Response (201 Created):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

---

#### Login User
```
POST /user/login
```

**Required Data:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Requirements:**
- Email must be valid (e.g., user@example.com)
- Password must be at least 6 characters
- User must already be registered

**Success Response (200 OK):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

**Error Responses:**

1. **Invalid Credentials (401 Unauthorized):**
```json
{
  "message": "Invalid email or password"
}
```

2. **Validation Error (400 Bad Request):**
```json
{
  "error": [
    {
      "type": "field",
      "msg": "Invalid Email",
      "path": "email",
      "location": "body"
    }
  ]
}
```

**Login Process:**
1. User provides email and password
2. System checks if user exists in database
3. System compares provided password with stored hashed password
4. If match, JWT token is generated and returned
5. User can now use this token for authenticated requests

---

## 📁 Project Structure

```
Uber Clone/
├── Backend/
│   ├── app.js                 # Main Express app setup
│   ├── server.js              # Server initialization
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables (create this)
│   ├── controllers/
│   │   └── user.controller.js # User registration logic
│   ├── routes/
│   │   └── user.route.js      # User API routes
│   ├── models/
│   │   └── user.model.js      # User database schema
│   ├── services/
│   │   └── user.service.js    # Business logic for users
│   └── db/
│       └── db.js              # Database connection
│
├── Frontend/                   # React frontend (coming soon)
│
└── README.md                  # This file
```

### Folder Descriptions

- **controllers/** - Handles HTTP requests and responses
- **routes/** - Defines API endpoints
- **models/** - Mongoose schemas for database collections
- **services/** - Business logic and data processing
- **db/** - Database connection configuration

---

## 🔧 Troubleshooting

### Common Issues

#### 1. "Cannot find module 'express'"
**Solution:** Run `npm install` in the Backend folder

#### 2. "MongoDB connection failed"
**Solution:** 
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- If using MongoDB Atlas, verify your IP whitelist

#### 3. "JWT_SECRET is not defined"
**Solution:** Create a `.env` file with `JWT_SECRET=your_secret_key`

#### 4. "Port 5000 is already in use"
**Solution:** Either close the app using that port or change the PORT in `.env`

#### 5. "Invalid Email" error when registering
**Solution:** Make sure email format is correct (e.g., user@example.com)

---

## 👥 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository** on GitHub
2. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit them:
   ```bash
   git commit -m "Add your feature description"
   ```
4. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Create a Pull Request** with a clear description of your changes

### Guidelines
- Follow the existing code style
- Add comments for complex logic
- Test your code before submitting
- Update documentation if needed

---

## 📝 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 📞 Support

If you have any questions or face any issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Open an issue on GitHub
3. Contact the development team

---

## 🎯 Roadmap

- [ ] Driver registration and authentication
- [ ] Ride booking functionality
- [ ] Real-time ride tracking with Socket.IO
- [ ] Payment integration
- [ ] Rating and review system
- [ ] Mobile app development
- [ ] Admin dashboard

---

## 🙌 Acknowledgments

- Node.js and Express.js communities
- MongoDB documentation
- bcrypt and JWT libraries
- All contributors and supporters

---

**Happy coding! 🚀**

*Last Updated: January 2026*
