
````markdown
# 📚 StudyHub

StudyHub is a full-stack web application built for students to upload, browse, and download academic study materials like notes, PDFs, forms, and templates. Admins can manage content through a protected dashboard, while users can access verified documents by branch and semester.

---

## 🚀 Features

- 📤 Upload study materials (PDFs)
- 🔍 Browse and search by branch, semester, or title
- 📥 View or download PDFs without forced downloads
- 👨‍🏫 Admin authentication and document verification
- 🌓 Light/Dark mode support
- 💬 Feedback and document status (Active/Draft)

---

## 🛠 Tech Stack

### Frontend:
- React.js + Tailwind CSS
- Axios for API calls
- React Router DOM

### Backend:
- Node.js + Express.js
- MongoDB with Mongoose
- Multer for file uploads
- JWT for admin authentication

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/StudyHub.git
cd StudyHub
````

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=3001
MONGO_URI=mongodb://localhost:27017/studyhub
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Start the React frontend:

```bash
npm start
```

---

## 📁 Folder Structure

```
StudyHub/
├── client/             # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── utils/
├── server/             # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── uploads/        # PDF storage
```

---

## 🔐 Admin Credentials

Admins can login via `/admin/login`. JWT-based authentication protects all admin routes.

---

## 📸 Screenshots

| 📂 Upload Page        | 📊 Dashboard          |
| --------------------- | --------------------- |
| *Add screenshot here* | *Add screenshot here* |

---

## 📄 License

This project is open source and free to use under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* Thanks to the college project team and contributors.
* Inspired by real student needs for organized academic materials.

