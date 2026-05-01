# 🚀 Team Task Manager (Full Stack)

A full-stack web application where users can create projects, assign tasks, and track progress.

---

## 🌐 Live Demo

Frontend: https://considerate-purpose-production-2082.up.railway.app/  
Backend API: https://team-task-manager-production-f529.up.railway.app/api

---

## 📌 Features

- 🔐 User Authentication (Signup/Login)
- 📁 Create & manage projects
- 📝 Create tasks under projects
- 👤 Assign tasks to users
- 📊 Task status (todo / doing / done)
- 🎯 Dashboard with all data

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios
- CSS (custom styling)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Aditya-Pal01/team-task-manager.git
cd team-task-manager

2️⃣ Backend Setup
cd backend
npm install

Create .env file inside backend folder:

MONGO_URI=mongodb+srv://2k22csds2212974_db_user:Adity-1234@cluster0.odtxlyw.mongodb.net/test
JWT_SECRET=mysecret123

Start backend server:

node server.js


3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Open in browser:

http://localhost:5173/


🔌 API Endpoints

🔐 Auth
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/users


📁 Projects
POST /api/projects
GET /api/projects


📝 Tasks
POST /api/tasks
GET /api/tasks


📂 Folder Structure
backend/
  ├── models/
  ├── routes/
  ├── server.js

frontend/
  ├── src/
  ├── pages/
  ├── api.js


##🚀 Future Improvements
Drag & Drop Kanban Board
Role-based access (Admin / Member)
Task filtering & search
Notifications


👨‍💻 Author
Aditya Pal
