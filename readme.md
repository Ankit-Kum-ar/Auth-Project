# 🔐 Auth Project

![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4+-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-47A248?logo=mongodb&logoColor=white)


A modern full-stack authentication system built with **React**, **Redux Toolkit**, **Node.js**, **Express**, and **MongoDB**. Features include user registration, login, email verification, password reset, JWT authentication, and beautiful UI with Tailwind CSS.

---

## ✨ Features

- **User Registration & Login**
- **Email Verification** (with 6-digit code)
- **JWT Authentication** (stored in HTTP-only cookies)
- **Password Reset** (request & set new password via email)
- **Responsive UI** with Tailwind CSS & Framer Motion
- **Redux Toolkit** for state management
- **MongoDB** for persistent storage
- **Mailtrap** integration for email testing
- **Protected Routes** (frontend & backend)
- **Password Strength Meter**
- **Professional UX** with loading spinners, toasts, and error handling

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Mailtrap](https://mailtrap.io/) account for email testing

### 1. Clone the Repository

```sh
git clone https://github.com/Ankit-Kum-ar/auth-project.git
cd auth-project
```

### 2. Setup the Server

```sh
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MAILTRAP_TOKEN=your_mailtrap_api_token
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Start the server:

```sh
npm run dev
```

### 3. Setup the Client

```sh
cd ../client
npm install
npm run dev
```

The client will run at [http://localhost:5173](http://localhost:5173).

---

## 🗂️ Project Structure

```
auth-project/
│
├── client/         # React frontend (Vite, Redux, Tailwind)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── utils/
│
└── server/         # Node.js backend (Express, MongoDB)
    └── src/
        ├── config/
        ├── controllers/
        ├── mailtrap/
        ├── middlewares/
        ├── models/
        ├── routes/
        └── utils/
```

---

## ⚙️ Tech Stack

| Layer       | Technologies & Tools                                                                                                                                                                                                                                                                                                                                                 |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Frontend** | [![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)](https://react.dev/) [![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/) [![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/) [![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) |
| **Backend**  | [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/) [![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)](https://mongoosejs.com/) [![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)](https://jwt.io/) [![Mailtrap](https://img.shields.io/badge/Mailtrap-009688?logo=mailtrap&logoColor=white)](https://mailtrap.io/) |
| **Other**    | [![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/) [![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/) [![dotenv](https://img.shields.io/badge/dotenv-8DD6F9?logo=dotenv&logoColor=white)](https://github.com/motdotla/dotenv) [![bcryptjs](https://img.shields.io/badge/bcryptjs-00599C?logo=javascript&logoColor=white)](https://www.npmjs.com/package/bcryptjs) [![cookie-parser](https://img.shields.io/badge/cookie--parser-FFCA28?logo=cookiecutter&logoColor=white)](https://www.npmjs.com/package/cookie-parser) [![validator](https://img.shields.io/badge/validator-00BFFF?logo=checkmarx&logoColor=white)](https://www.npmjs.com/package/validator) |
---

## 📧 Email Testing

All emails (verification, password reset) are sent using [Mailtrap](https://mailtrap.io/). Check your Mailtrap inbox to view test emails.

---

## 🛡️ Security

- Passwords are hashed with bcryptjs.
- JWT tokens are stored in HTTP-only cookies.
- Email verification and password reset tokens are time-limited.
- All sensitive data is managed via environment variables.

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Mailtrap](https://mailtrap.io/)
- [MongoDB](https://www.mongodb.com/)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Contact

For questions or feedback, please contact [mail](mailto:ankitcode2511@gmail.com).