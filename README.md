# Task Master - MERN Stack Application

A premium, full-stack Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a complete CRUD workflow with a modern, responsive user interface.

## 🚀 Features

-   **Modern UI/UX**: Built with React and Tailwind CSS for a sleek, responsive design.
-   **Task Management**:
    -   Create new tasks with titles and descriptions.
    -   View tasks in a chronologically sorted list.
    -   Edit existing tasks.
    -   Delete tasks.
    -   Toggle completion status with visual feedback (strikethrough).
-   **API Integration**: Robust RESTful API backend.
-   **Data Persistence**: All changes are saved to a MongoDB database.

## 🛠️ Tech Stack

### Frontend (`/client`)
-   **React**: UI Library (Vite)
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **JavaScript (ES6+)**: Core logic.

### Backend (`/server`)
-   **Node.js & Express**: Server-side runtime and framework.
-   **MongoDB & Mongoose**: NoSQL database and Object Data Modeling.
-   **Cors**: Middleware to enable Cross-Origin Resource Sharing.
-   **Dotenv**: Environment variable management.

## 📂 Project Structure

```text
TaskList/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (TaskItem, TaskList, TaskForm)
│   │   ├── App.jsx         # Main application logic
│   │   └── index.css       # Tailwind directives
│   ├── tailwind.config.js  # Tailwind configuration
│   └── vite.config.js      # Vite configuration
├── server/                 # Node.js Backend
│   ├── models/             # Mongoose Models (Task.js)
│   ├── routes/             # Express Routes (tasks.js)
│   ├── index.js            # Server entry point
│   └── .env                # (Create this file) Environment variables
├── verify_api.js           # Script to test backend API
└── README.md               # Project documentation
```

## ⚙️ Setup & Installation

### Prerequisites
-   **Node.js**: [Download & Install](https://nodejs.org/)
-   **MongoDB**: Ensure MongoDB is installed and running locally on port `27017`.

### 1. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  (Optional) Create a `.env` file in `server/` if you want to customize the port or DB URI:
    ```env
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/tasklist
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    The server runs on `http://localhost:5000`.

### 2. Frontend Setup
1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:5173`.

## 📡 API Documentation

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description | Body (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Fetch all tasks | - |
| `POST` | `/` | Create a new task | `{ "title": "Buy Milk", "description": "..." }` |
| `PUT` | `/:id` | Update a task | `{ "title": "...", "isCompleted": true }` |
| `DELETE` | `/:id` | Delete a task | - |

## 🧪 Verification

To verify the backend API automatically, run the included script from the root directory:
```bash
node verify_api.js
```

