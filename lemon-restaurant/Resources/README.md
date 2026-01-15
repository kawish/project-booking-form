# Lemon Restaurant Setup Guide

This guide will help you set up and link both the frontend and backend applications, along with the database setup for the Lemon Restaurant project.

---

## Prerequisites

Ensure you have the following installed on your system:

1. **Node.js** (v16 or higher)
2. **Python** (v3.9 or higher)
3. **pip** (Python package manager)
4. **Virtualenv** (for Python virtual environments)

---

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # For Windows
   source venv/bin/activate   # For macOS/Linux
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   - Create a new database in PostgreSQL (or your chosen database).
   - Update the `database.py` file with your database credentials.

5. Start the backend server:
   ```bash
   start.bat
   ```

---

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install the required Node.js packages:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

---

## Linking Frontend and Backend

1. Ensure the backend server is running on a specific port (e.g., `http://localhost:8000`).
2. Update the API endpoint in the frontend code:
   - Open `src/constants.js`.
   - Set the `API_BASE_URL` to the backend server URL, e.g.,:
     ```javascript
     export const API_BASE_URL = "http://localhost:8000";
     ```

---

## Testing the Application

1. Open your browser and navigate to the frontend development server (e.g., `http://localhost:3000`).
2. Test the application by performing actions like booking tables, viewing menus, etc.

---

## Troubleshooting

- **Backend Issues:**
  - Ensure the virtual environment is activated.
  - Check the database connection settings in `database.py`.

- **Frontend Issues:**
  - Ensure all Node.js dependencies are installed.
  - Check the API endpoint in `src/constants.js`.

---

## Additional Notes

- For production deployment, consider using tools like Docker, Nginx, and Gunicorn for the backend, and build the frontend using `npm run build`.
- Always keep your `.env` files secure and avoid committing sensitive information to version control.

---

## Folder Structure Overview

Here is the folder structure of the Lemon Restaurant project:

```
lemon-restaurant/
├── backend/
│   ├── requirements.txt       # Python dependencies
│   ├── start.bat              # Script to start the backend server
│   ├── app/
│   │   ├── __init__.py        # Backend initialization
│   │   ├── crud.py            # CRUD operations
│   │   ├── database.py        # Database connection setup
│   │   ├── main.py            # Entry point for the backend server
│   │   ├── models.py          # Database models
│   │   ├── schemas.py         # Data schemas
│   │   └── __pycache__/       # Compiled Python files
├── frontend/
│   ├── package.json           # Node.js dependencies
│   ├── README.md              # Frontend documentation
│   ├── public/
│   │   ├── index.html         # Main HTML file
│   │   ├── manifest.json      # Web app manifest
│   │   ├── robots.txt         # Robots exclusion file
│   │   └── assets/            # Static assets
│   ├── src/
│   │   ├── App.css            # Main CSS file
│   │   ├── App.js             # Main React component
│   │   ├── constants.js       # API endpoint configuration
│   │   ├── index.js           # React entry point
│   │   ├── components/        # React components
│   │   └── styles/            # Component-specific styles
├── Resources/
│   ├── README.md              # Project setup guide
│   └── Screenshot/            # Screenshots and images
```

This structure ensures a clear separation of concerns between the backend, frontend, and resources.

---

Happy coding!