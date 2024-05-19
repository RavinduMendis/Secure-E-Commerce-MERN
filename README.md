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
- https://drive.google.com/file/d/1YHl-DZuxQiVqBwd-grWJSxgex5deQMA5/view?usp=sharing (/frontend/src/)

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
    FRONTEND_URL = "http://react-ui:3000/"
    ```
4. change the /Secure-E-Commerce-MERN/frontend/common/index.js backend domain as "http://node-api:8080"
5. build and run the Docker
    ```sh
    docker-compose up -d 
    ```
