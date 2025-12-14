📒 **iNotebook – Secure Cloud Notes App**

A full‑stack **MERN (MongoDB, Express, React, Node.js)** application that allows users to securely create, read, update, and delete personal notes with authentication and authorization.

🔗 *Live Demo:* https://inotebook-liart.vercel.app/

🚀 *Features*

 🔐 User Authentication (Signup / Login)
 🛡️ Secure JWT‑based authorization
 📝 Create, Edit, Delete personal notes
 ☁️ Notes stored securely in MongoDB Atlas
 🌐 Fully deployed (Frontend + Backend)
 📱 Responsive UI


## 🛠️ Tech Stack

### Frontend

 React.js
 React Router
 Context API
 Bootstrap / CSS

### Backend

 Node.js
 Express.js
 MongoDB (Mongoose)
 JWT Authentication
 bcrypt.js for password hashing

### Deployment

 Frontend: **Vercel**
 Backend: **Render**
 Database: **MongoDB Atlas**

## 🔑 Environment Variables

### Backend (`.env`)

```
MONGO_URI=Mongodb_connection_string
JWT_SECRET=JWT_secret_key
```

### Frontend (`.env`)

```
REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
```

---

## ⚙️ Installation & Setup (Local)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/diyatank2004/inotebook.git
```

### 2️⃣ Backend Setup

```bash
cd inotebook-backend
npm install
npm start
```

### 3️⃣ Frontend Setup

```bash
cd inotebook-frontend
npm install
npm start
```

---

## 🧪 API Endpoints

| Method | Endpoint                  | Description   |
| ------ | ------------------------- | ------------- |
| POST   | /api/auth/createuser      | Register user |
| POST   | /api/auth/login           | Login user    |
| GET    | /api/notes/fetchallnotes  | Get all notes |
| POST   | /api/notes/addnote        | Add new note  |
| PUT    | /api/notes/updatenote/:id | Update note   |
| DELETE | /api/notes/deletenote/:id | Delete note   |

---

## 🧠 Key Learnings

 Implemented secure authentication using JWT
 Managed global state using Context API
 Debugged real production deployment issues
 Integrated frontend & backend using environment variables
 Hands‑on experience with cloud deployment

## 👩‍💻 Author

**Diya Jogesh Tank**
Aspiring Full‑Stack Developer

GitHub: [https://github.com/diyatank2004](https://github.com/diyatank2004)
LinkedIn: https://www.linkedin.com/in/diya-tank-7b1445244/

---

⭐ If you like this project, give it a star!
