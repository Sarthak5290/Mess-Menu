# Mess Menu Management System

A web application for managing a mess menu, allowing administrators to edit menu items, authenticate users, and manage access to different functionalities. This project utilizes React for the frontend, Node.js for the backend, and MongoDB for database management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (login and registration)
- Admin dashboard for managing menu items
- Edit and update menu items dynamically
- Responsive design for mobile and desktop
- Environment variable management
- Token-based authentication for secure access

## Technologies Used

- **Frontend**: 
  - React
  - Tailwind CSS
  - React Router
  
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT (JSON Web Tokens)
  
- **Development Tools**:
  - Git
  - npm
  - dotenv
  - bcrypt for password hashing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mess-menu-management-system.git













```
Mess Menu
├─ backend
│  ├─ .env
│  ├─ config
│  │  └─ db.js
│  ├─ constants.js
│  ├─ controllers
│  │  ├─ adminController.js
│  │  └─ menuController.js
│  ├─ middleware
│  │  └─ authMiddleware.js
│  ├─ models
│  │  ├─ menuModel.js
│  │  └─ userModel.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ routes
│  │  ├─ adminRoutes.js
│  │  └─ menuRoutes.js
│  ├─ server.js
│  └─ utils
│     └─ generateToken.js
├─ frontend
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.js
│  │  ├─ App.test.js
│  │  ├─ components
│  │  │  ├─ Auth
│  │  │  │  ├─ Login.js
│  │  │  │  └─ Register.js
│  │  │  ├─ Menu
│  │  │  │  ├─ Menu.js
│  │  │  │  ├─ MenuEditor.js
│  │  │  │  └─ MenuItem.js
│  │  │  └─ Navbar.js
│  │  ├─ context
│  │  │  └─ AuthContext.js
│  │  ├─ index.css
│  │  ├─ index.js
│  │  ├─ logo.svg
│  │  ├─ pages
│  │  │  ├─ AdminDashboard.js
│  │  │  └─ Home.js
│  │  ├─ reportWebVitals.js
│  │  ├─ setupTests.js
│  │  └─ tailwind.config.js
│  └─ tailwind.config.js
├─ New Text Document.txt
└─ README.md

```



