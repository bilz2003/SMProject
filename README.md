# Chirrup

Welcome to Chirrup, a Twitter-like platform designed for seamless social interaction. This guide will walk you through setting up and running the project locally.

## Getting Started

To run Chirrup, you'll need to start both the frontend and the backend simultaneously from the terminal. Follow the instructions below.

### Prerequisites

Ensure you have the following installed:
u
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Running the Frontend

1. Open your terminal and navigate to the frontend directory:

   ```sh
    cd Full\ Sack\ Vue
    ```
2. Install the necessary dependencies (only required the first time):
   ```sh
   npm install
   ```    
3. Start the development server:
    
    ```sh
   npm run dev
   ```
    
    The frontend development server should start, and you'll see the local host URL in the terminal (usually `http://localhost:5173`).
    

### Running the Backend

1. Open a new terminal window and navigate to the backend directory:
    
    ```sh
    cd fsd_chirrup_server/
   ```
    
2. Install the necessary dependencies:
    
    ```sh
    npm install
    ```
3. Start the backend server:
    
    ```sh
    npm run dev
   ```
    
    The backend server should start, and you'll see the local host URL in the terminal (usually `http://localhost:3333`).
    

### Accessing Chirrup

Open your web browser and navigate to the local host URL provided by the frontend terminal window. This will take you to the Chirrup platform.

## Creating an Account

To create an account on Chirrup, your password must meet the following criteria:

- Minimum of 8 characters
- Must contain at least one special character
- Must contain at least one number
- Must contain at least one uppercase letter
