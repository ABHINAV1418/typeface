# Typeface - File Sharing Application

A simplified Dropbox-like application that allows users to upload and download files through a web interface.

## Project Structure

```
typeface/
├── frontend/     # React frontend application
└── backend/      # Node.js Express backend application
```

## Features

- File upload and download functionality
- List all user files
- View file contents
- Support for common file formats (txt, jpg, png, json)

## Tech Stack

### Frontend
- React
- Material UI (for styling)
- Redux (for state management)

### Backend
- Node.js with Express
- MongoDB (database)
- Multer (for file handling)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file with necessary environment variables
 ## Environment Variables
> Create a .env file in the backend directory with the following content:
> ```
> PORT=5000
> MONGODB_URI=your_mongodb_connection_string_here
> ```
> Replace your_mongodb_connection_string_here with your own MongoDB URI.

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

- `POST /api/files/upload` - Upload a file
- `GET /api/files` - Get list of all files
- `GET /api/files/:id` - Download a specific file

## Development Guidelines

- Follow clean code principles
- Write modular and reusable code
- Implement proper error handling
- Document code where necessary
- Use meaningful variable and function names 