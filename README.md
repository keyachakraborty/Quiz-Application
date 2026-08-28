TechQuiz Pro

A full-stack technical quiz platform built with HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, and JWT authentication.

TechQuiz Pro provides an interactive platform where users can create an account, choose a technical category, attempt timed quizzes, receive instant feedback, view results, save scores, compete on leaderboards, review quiz history, and generate printable completion certificates.

---

Features

Authentication

- User registration and login
- Password hashing using "bcrypt"
- JWT-based authentication
- Protected API endpoints
- User information displayed after login
- Logout functionality
- Session management using "localStorage"

Quiz System

- Multiple technical quiz categories
- 20-question quiz structure
- 15-second timer for each question
- Instant answer feedback
- Correct/incorrect answer highlighting
- Automatic score calculation
- Performance-based result page

Quiz Categories

- HTML & CSS
- JavaScript
- Database
- Linux
- Cyber Security
- Computer Fundamentals

Leaderboard

- Global Top 10 leaderboard
- Category-wise Top 10 leaderboard
- Scores stored in MongoDB
- Backend-based score submission
- Duplicate score submission prevention

Quiz History

- View previous quiz attempts
- Total quizzes taken
- Best score
- Average score
- Categories attempted
- Filter history by category
- Delete individual attempts

Certificate

- Learner name and quiz category
- Completion date
- Print-friendly certificate
- Browser-based print/save functionality

---

Tech Stack

Frontend

Technology| Purpose
HTML5| Page structure
CSS3| Styling and responsive design
JavaScript| Application logic
Fetch API| API communication
LocalStorage| Session/token storage
Font Awesome| Icons
Google Fonts| Typography

Backend

Technology| Purpose
Node.js| JavaScript runtime
Express.js| Backend framework
MongoDB| Database
Mongoose| MongoDB ODM
JWT| Authentication
bcrypt| Password hashing
CORS| Cross-origin communication
cookie-parser| Cookie handling
dotenv| Environment configuration
Nodemon| Development server

---

Project Structure

TechQuiz Pro/
│
├── backend/
│   │
│   ├── server.js
│   ├── package.json
│   │
│   └── src/
│       │
│       ├── app.js
│       │
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── history.controller.js
│       │   ├── leaderboard.controller.js
│       │   └── quiz.controller.js
│       │
│       ├── data/
│       │   ├── importQuestions.js
│       │   └── questions.json
│       │
│       ├── DB/
│       │   └── db.connect.js
│       │
│       ├── middleware/
│       │   └── auth.middleware.js
│       │
│       ├── models/
│       │   ├── Question.model.js
│       │   ├── Score.model.js
│       │   └── User.model.js
│       │
│       └── routes/
│           ├── auth.route.js
│           ├── history.route.js
│           ├── leaderboard.route.js
│           └── quiz.route.js
│
├── frontend/
│   │
│   ├── assets/
│   │   └── favicon.ico
│   │
│   ├── css/
│   │   ├── certificate.css
│   │   └── style.css
│   │
│   ├── html/
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── category.html
│   │   ├── quiz.html
│   │   ├── result.html
│   │   ├── history.html
│   │   └── certificate.html
│   │
│   └── js/
│       ├── auth.js
│       ├── category.js
│       ├── certificate.js
│       ├── data.js
│       ├── history.js
│       ├── home.js
│       ├── login.js
│       ├── quiz.js
│       ├── register.js
│       └── result.js
│
├
└── README.md

---

Application Flow

User
  ↓
Register / Login
  ↓
JWT Authentication
  ↓
Select Quiz Category
  ↓
Start Quiz
  ↓
Answer Questions
  ↓
Score Calculation
  ↓
View Result
  ↓
Save Score / History
  ↓
Leaderboard
  ↓
Certificate

---

Authentication Flow

1. User registers with name, email, and password.
2. Backend checks whether the email already exists.
3. Password is hashed using "bcrypt".
4. User logs in with email and password.
5. Backend verifies the password.
6. A JWT token is generated.
7. Frontend stores the token in "localStorage".
8. Protected requests send the authentication token.
9. Authentication middleware verifies the JWT.
10. Backend identifies the authenticated user and provides access to protected resources.

---

Database

The application uses MongoDB with Mongoose.

User Model

Stores:

- Name
- Email
- Hashed password

Question Model

Stores:

- Question
- Answer options
- Correct answer
- Category

Score Model

Stores:

- User
- Category
- Score
- Attempt information
- Date/time

---

API Modules

Authentication API

Handles:

- User registration
- User login
- JWT authentication
- User information

Quiz API

Handles:

- Quiz categories
- Quiz questions
- Quiz data

Leaderboard API

Handles:

- Global rankings
- Category-wise rankings
- Score submission

History API

Handles:

- Quiz history
- Quiz attempt retrieval
- Category filtering
- Attempt deletion

---

Getting Started

Prerequisites

- Node.js
- npm
- MongoDB / MongoDB Atlas
- Git

1. Clone the Repository

git clone https://github.com/keyachakraborty/Quiz-Application.git
cd Quiz-Application

2. Install Backend Dependencies

cd backend
npm install

3. Configure Environment Variables

Create a ".env" file inside the "backend" directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Do not commit ".env" or expose database credentials and JWT secrets.

4. Start the Backend

npm run dev

The backend runs on:

http://localhost:5000

5. Run the Frontend

Open the "frontend" folder using a local development server such as Live Server.

---

Security

The application uses:

- bcrypt password hashing
- JWT authentication
- Protected API endpoints
- Authentication middleware
- Environment variables for sensitive information
- CORS configuration
- Secure database authentication

---

Team Project

TechQuiz Pro was developed as a 4-member team project.


---

Future Improvements

- Admin dashboard
- Question management
- Difficulty levels
- Randomized questions
- Advanced performance analytics
- User profile management
- Password reset
- Multiplayer quiz mode
- Progressive Web App support

---

License

This project is licensed under the MIT License.



GitHub: "keyachakraborty" (https://github.com/keyachakraborty)


