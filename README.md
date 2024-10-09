# Messenger App

## Features

- Real-time messaging with WebSockets
- User authentication and authorization
- Message history
- Set profile settings, change avatar
- Change password

## Running the App

Start the development server

- npm run dev

The app will be available at http://localhost:3000.

To build project and start preview use:

- npm run start

To launch test use:

- npm run test

Usage

- Register a new account or log in with existing credentials.
- Start a new chat by selecting a user from the list.
- Send messages in real-time and see updates instantly.

## Pages:

- Login http://localhost:3000
- Sign up http://localhost:3000/sign-up
- Chats http://localhost:3000/messenger
- Profile settings http://localhost:3000/settings
- Change password http://localhost:3000/settings/password
- 404 http://localhost:3000/not-found
- 500 http://localhost:3000//server-error

## Usefull links

- Link to the prototypes on Figma - https://www.figma.com/design/pW1a9hUMSbz0IQS7kmQHy0/Messenger-screens?node-id=21-5926&t=ISMBQTMHilqQYiGA-0
- Preview on Netlify - https://deploy-preview-4--jade-granita-389e23.netlify.app

## Technologies and Stack

This project utilizes the following technologies and tools:

### Frontend

- **React**: A library for building user interfaces. Used for creating components and managing the application's state.

### Testing

- **Mocha**: A JavaScript test framework for Node.js that allows asynchronous testing. It's used for organizing tests and reporting.
- **Chai**: An assertion library that works with Mocha, providing behavior-driven development (BDD) syntax for writing test assertions.

### Build Tools

- **Vite**: A modern build tool that provides a faster and leaner development experience for modern web projects. It supports hot module replacement and is optimized for speed.

### Development and Deployment

- **GitHub Actions**: A continuous integration and delivery (CI/CD) system for automating testing and deployment of the application.

### Links

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
