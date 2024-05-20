# Full Stack Secure E-Commerce MERN App

## Group members
#### IT21822612 - Mendis H.R.M.
#### IT21831904 - Weerasinghe K.M.

This is a full stack secure e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Getting Started

Make sure you have the following download and installed:

- Node.js
- npm (Node package manager)
- Docker (optional)
- Assets - https://drive.google.com/file/d/1XTGjJb7dJk-Kys9zocqezdsmNGkHjEvD/view?usp=sharing (/frontend/src/)
- mongosh (optional - if run through docker)

## Installation Process

1. Clone the repository:
    ```sh
    git clone https://github.com/RavinduMendis/Secure-E-Commerce-MERN.git
    ```
2. Navigate to the backend directory and install dependencies:
    ```sh
    cd Secure-E-Commerce-MERN/backend
    npm install
    ```
3. Navigate to the frontend directory and install dependencies:
    ```sh
    cd ../frontend
    npm install
    ```

4. Setup environment variables:

    - **Backend**: Create a `.env` file in the `backend` directory with the following content:
        ```plaintext
        MONGODB_URI="your_mongodb_connection_string"
        TOKEN_SECRET_KEY="your_secret_key"
        FRONTEND_URL="http://localhost:3000"
        ```

    - **Frontend**: Create a `.env` file in the `frontend` directory with the following content:
        ```plaintext
        REACT_APP_CLOUD_NAME_CLOUDINARY = ddwo8iuhl
        ```

Now all the dependencies are installed and the environment variables are set up, you can run the project.

## Running the Application

1. Start the backend server:
    ```sh
    cd ../backend
    npm start
    ```
2. Start the frontend development server:
    ```sh
    cd ../frontend
    npm start
    ```

Open your browser and navigate to `http://localhost:3000` to see the application running.

### note: create admin account - first create general account. go to mongodb and change the role as "ADMIN"

## Running on DOCKER (optional)
1. Clone the repository:
    ```sh
    git clone https://github.com/RavinduMendis/Secure-E-Commerce-MERN.git
    ```
2. Navigate to the Directory:
    ```sh
    cd Secure-E-Commerce-MERN
    ```
3. change the environmental variable (.env) backend:
    ```sh
    MONGODB_URI = ("mongodb://mongo-db/<database-name>")
    TOKEN_SECRET_KEY = "your key"
    FRONTEND_URL = "http://<host-IP>:3000/"
    ```
4. change the /Secure-E-Commerce-MERN/frontend/common/index.js backend domain as "http://host-IP:8080"
5. build and run the Docker
    ```sh
    docker-compose up -d 
    ```
### note: create admin account
1. create a general account
2. go to mongo-db docker
   ```sh
    docker exec -it mongo-db bash
    ```
3. run mongosh
    ```sh
    mongosh
    ```
4.use database
     ```sh
    use sss-assignment
    ```
5.run this command
     ```sh
    db.users.updateOne({ email: "<given email>" },{ $set: { role: "ADMIN" } });
    ```

