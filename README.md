# Registration/Login Web App using MongoDB

This is a simple web application for user registration and login, built using Node.js, Express, MongoDB, and bcrypt for password hashing.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/registration-login-app.git
   
2. Navigate to the project directory:

   ```bash
   cd registration-login-app
   
3. Install dependencies:

   ```bash
   npm install


### Configuration
1. Create a .env file in the project root and add the following configurations:
   ```bash
   PORT=3000
   MONGO_URL = mongodb+srv://gulim:gulim212386@main.4o7rqo1.mongodb.net/my_db?retryWrites=true&w=majority
Adjust the **PORT** and **MONGODB_URI** as needed.

### Running the application
1. Start the MongoDB server.
2. Run the application:
   ```bash
   npm run server
The server will be running at http://localhost:3000

### Usage
1. Open your web browser and go to http://localhost:3000
2. Follow the on-screen instructions to register or login.

### API Endpoints
* **POST /register**: Register a new user.
* **POST /login**: Login with an existing user.
* **GET /users**: Get a list of all registered users.
* **DELETE /users/delete**: Delete all registered users.

### Built with
- Node.js
- Express
- MongoDB
- bcrypt

### License
No license :D

Contact me
gulimzhan.orynbasar@gmail.com





