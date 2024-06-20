# MERN Admin Panel

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Environment Variables](#environment-variables)
- [License](#license)

## Description

This project is a MERN (MongoDB, Express, React, Node.js) stack admin panel designed to manage user authentication, user profiles, and other administrative tasks. It is built with a React frontend and an Express backend, connected to a MongoDB database.

## Features

- User Authentication (Login, Register, Logout)
- User Profile Management
- Admin Panel for Managing Users
- Image Uploads with Multer
- Protected Routes and Role-Based Access Control

## Technologies Used

- **Backend:** Node.js, Express, Mongoose, JSON Web Token (JWT), bcryptjs, multer
- **Frontend:** React, Redux, React Router, Bootstrap, React Bootstrap, React Icons, React Toastify
- **Dev Tools:** Vite, ESLint, Concurrently, Nodemon

## Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd admin-panel
    ```

2. **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**
    ```bash
    cd ../frontend/admin-panel
    npm install
    ```

4. **Set up environment variables:**
    - Create a `.env` file in the `backend` directory based on `.env-example`.

## Usage

1. **Start the development server:**
    ```bash
    cd admin-panel
    npm run dev
    ```

    This will concurrently start both the backend server (with nodemon) and the frontend development server.

## API Routes

### Authentication Routes
- **POST /api/auth/login**
  - Authenticate user and return JWT.
  
- **POST /api/auth/register**
  - Register a new user (with profile image upload).
  
- **POST /api/auth/logout**
  - Log out the current user.

### User Routes
- **GET /api/users**
  - Get a list of all users (Admin only).

- **GET /api/user**
  - Get the profile of the logged-in user.

- **GET /api/user/:userid**
  - Get the profile of a specific user by user ID.

- **PUT /api/user**
  - Edit the profile of the logged-in user (with profile image upload).

- **DELETE /api/user**
  - Delete the logged-in user (Admin only).

## Environment Variables

The backend uses environment variables for configuration. Create a `.env` file in the `backend` directory with the following variables:

```
# .env-example

NODE_ENV=developement or production
PORT=A port number(5000)
JWT_SECRET=a secret for jwt
DB_URL=mongodb url
```


## License

This project is licensed under the ISC License.
