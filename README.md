# Tutor Connect

Tutor Connect is a web application designed to connect tutors and students, providing tools and expertise needed to excel in studies. This project is built using React, Redux, and Vite.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Role-based access control (Admin, Tutor, Student)
- Profile management
- Subject management for tutors
- Real-time notifications
- WebSocket integration for video calls
- Responsive design

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Aditya-Naresh/TutorConnect-frontend.git
    cd tutorconnect
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

- Open your browser and navigate to `http://localhost:5173` to see the application running.
- Use the provided login credentials or sign up to create a new account.

## Folder Structure

```plaintext
tutorconnect/
├── public/               # Static files
├── src/                  # Source files
│   ├── assets/           # Assets like images, fonts, etc.
│   ├── components/       # Reusable components
│   ├── features/         # Feature-specific modules
│   ├── pages/            # Pages of the application
│   ├── services/         # Services for API calls
│   ├── store/            # Redux store configuration
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── .gitignore            # Git ignore file
├── package.json          # NPM package configuration
├── README.md             # Project README
└── vite.config.js        # Vite configuration


## Deployment

The project is hosted on Vercel. You can visit the live application at [Tutor Connect on Vercel](https://tutor-connect-ruddy.vercel.app/).



