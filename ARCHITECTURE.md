# Application Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Postman)                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP Requests
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER (index.js)                    │
│                     Port: 5000                                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Middleware Stack                             │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  1. express.json() - Parse JSON bodies                   │  │
│  │  2. express-session - Session management                 │  │
│  │  3. JWT Authentication - Verify tokens                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ Route to appropriate handler
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                        ROUTER LAYER                             │
├──────────────────┬──────────────────┬──────────────────────────┤
│                  │                  │                          │
│  General Routes  │  Auth Routes     │  Async Routes            │
│  (general.js)    │  (auth_users.js) │  (async_routes.js)       │
│                  │                  │                          │
│  Tasks 1-6       │  Tasks 7-9       │  Tasks 10-13             │
│  - Get books     │  - Login         │  - Async operations      │
│  - Search        │  - Add review    │  - Promise operations    │
│  - Register      │  - Delete review │                          │
│                  │                  │                          │
└────────┬─────────┴────────┬─────────┴──────────┬───────────────┘
         │                  │                    │
         │                  │                    │ Axios HTTP calls
         │                  │                    ▼
         │                  │         ┌──────────────────────┐
         │                  │         │   Internal API       │
         │                  │         │   (localhost:5000)   │
         │                  │         └──────────────────────┘
         │                  │
         ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DATA LAYER                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────┐         ┌──────────────────┐             │
│  │   booksdb.js     │         │   users array    │             │
│  │                  │         │                  │             │
│  │  - Book data     │         │  - User data     │             │
│  │  - Reviews       │         │  - Credentials   │             │
│  └──────────────────┘         └──────────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow Diagrams

### Flow 1: General User Request (Tasks 1-5)

```
Client (Postman)
    │
    │ GET /isbn/1
    ▼
Express Server
    │
    │ No authentication required
    ▼
general.js Router
    │
    │ Look up book in booksdb
    ▼
booksdb.js
    │
    │ Return book data
    ▼
Client receives response
```

### Flow 2: User Registration (Task 6)

```
Client (Postman)
    │
    │ POST /register
    │ Body: {username, password}
    ▼
Express Server
    │
    ▼
general.js Router
    │
    │ 1. Validate input
    │ 2. Check if user exists
    │ 3. Add to users array
    ▼
Client receives success message
```

### Flow 3: User Login (Task 7)

```
Client (Postman)
    │
    │ POST /customer/login
    │ Body: {username, password}
    ▼
Express Server
    │
    ▼
auth_users.js Router
    │
    │ 1. Validate credentials
    │ 2. Generate JWT token
    │ 3. Store in session
    ▼
Session Cookie Created
    │
    ▼
Client receives success + cookie
```

### Flow 4: Add Review (Task 8) - Protected Route

```
Client (Postman)
    │
    │ PUT /customer/auth/review/1
    │ Cookie: session token
    ▼
Express Server
    │
    │ Session middleware
    ▼
JWT Authentication Middleware
    │
    │ 1. Check session exists
    │ 2. Extract JWT token
    │ 3. Verify token
    │
    ├─ Valid ──────────────┐
    │                      │
    ▼                      ▼
auth_users.js Router    403 Forbidden
    │
    │ 1. Get username from session
    │ 2. Add review to book
    │ 3. Store in booksdb
    ▼
booksdb.js updated
    │
    ▼
Client receives success message
```

### Flow 5: Async Request (Tasks 10-13)

```
Client (Postman)
    │
    │ GET /async/books
    ▼
Express Server
    │
    ▼
async_routes.js Router
    │
    │ async/await or Promise
    ▼
Axios HTTP Client
    │
    │ Internal API call
    │ GET http://localhost:5000/
    ▼
Express Server (same instance)
    │
    ▼
general.js Router
    │
    ▼
booksdb.js
    │
    │ Return data
    ▼
Axios receives response
    │
    ▼
async_routes.js processes
    │
    ▼
Client receives response
```

## Authentication Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Authentication Flow                          │
└─────────────────────────────────────────────────────────────────┘

1. REGISTRATION
   ┌──────────┐
   │  Client  │
   └────┬─────┘
        │ POST /register {username, password}
        ▼
   ┌──────────────────┐
   │  Validate Input  │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐     YES    ┌──────────────────┐
   │  User Exists?    │────────────▶│  Return Error    │
   └────┬─────────────┘             └──────────────────┘
        │ NO
        ▼
   ┌──────────────────┐
   │  Add to Users[]  │
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │  Return Success  │
   └──────────────────┘

2. LOGIN
   ┌──────────┐
   │  Client  │
   └────┬─────┘
        │ POST /customer/login {username, password}
        ▼
   ┌──────────────────┐
   │  Authenticate    │
   └────┬─────────────┘
        │
        ├─ Valid ──────────┬─ Invalid ──────┐
        │                  │                │
        ▼                  ▼                ▼
   ┌──────────────┐   ┌──────────┐   ┌──────────┐
   │ Generate JWT │   │  Error   │   │  Error   │
   └────┬─────────┘   └──────────┘   └──────────┘
        │
        ▼
   ┌──────────────────┐
   │  Store in Session│
   └────┬─────────────┘
        │
        ▼
   ┌──────────────────┐
   │  Return Cookie   │
   └──────────────────┘

3. PROTECTED REQUEST
   ┌──────────┐
   │  Client  │
   └────┬─────┘
        │ PUT /customer/auth/review/1
        │ Cookie: session_id
        ▼
   ┌──────────────────┐
   │  Check Session   │
   └────┬─────────────┘
        │
        ├─ Exists ─────────┬─ Missing ──────┐
        │                  │                │
        ▼                  ▼                ▼
   ┌──────────────┐   ┌──────────┐   ┌──────────┐
   │ Extract JWT  │   │  403     │   │  403     │
   └────┬─────────┘   └──────────┘   └──────────┘
        │
        ▼
   ┌──────────────────┐
   │  Verify JWT      │
   └────┬─────────────┘
        │
        ├─ Valid ──────────┬─ Invalid ──────┐
        │                  │                │
        ▼                  ▼                ▼
   ┌──────────────┐   ┌──────────┐   ┌──────────┐
   │ Process Req  │   │  403     │   │  403     │
   └──────────────┘   └──────────┘   └──────────┘
```

## Data Structure

### Books Database Structure
```javascript
{
  "1": {
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {
      "username1": "Great book!",
      "username2": "Excellent read!"
    }
  },
  "2": {
    "author": "Hans Christian Andersen",
    "title": "Fairy tales",
    "reviews": {}
  }
  // ... more books
}
```

### Users Array Structure
```javascript
[
  {
    "username": "testuser",
    "password": "password123"
  },
  {
    "username": "anotheruser",
    "password": "pass456"
  }
]
```

### Session Structure
```javascript
{
  "authorization": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "username": "testuser"
  }
}
```

## Middleware Chain

```
Request
   │
   ▼
┌─────────────────────┐
│  express.json()     │  Parse JSON body
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  express-session    │  Create/restore session
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Route Matching     │  Match URL to router
└──────┬──────────────┘
       │
       ├─ /customer/auth/* ──────┐
       │                         │
       │                         ▼
       │              ┌─────────────────────┐
       │              │  JWT Auth Middleware│
       │              └──────┬──────────────┘
       │                     │
       │                     ├─ Valid ──┐
       │                     │          │
       │                     ▼          ▼
       │              ┌──────────┐  ┌──────────┐
       │              │  Next()  │  │  403     │
       │              └────┬─────┘  └──────────┘
       │                   │
       ▼                   ▼
┌─────────────────────────────┐
│  Route Handler              │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Response           │
└─────────────────────┘
```

## File Dependencies

```
index.js
  │
  ├─ requires ──▶ express
  ├─ requires ──▶ jsonwebtoken
  ├─ requires ──▶ express-session
  ├─ requires ──▶ router/auth_users.js
  ├─ requires ──▶ router/general.js
  └─ requires ──▶ router/async_routes.js

router/general.js
  │
  ├─ requires ──▶ express
  ├─ requires ──▶ booksdb.js
  └─ requires ──▶ router/auth_users.js (for isValid, users)

router/auth_users.js
  │
  ├─ requires ──▶ express
  ├─ requires ──▶ jsonwebtoken
  └─ requires ──▶ booksdb.js

router/async_routes.js
  │
  ├─ requires ──▶ express
  └─ requires ──▶ axios

booksdb.js
  │
  └─ exports ──▶ books object
```

## Technology Stack Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│         (Postman Client)                │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Application Layer               │
│         (Express.js)                    │
│  - Routing                              │
│  - Middleware                           │
│  - Request/Response handling            │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Business Logic Layer            │
│  - Authentication (JWT)                 │
│  - Authorization                        │
│  - CRUD operations                      │
│  - Async operations (Axios)             │
└─────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         Data Layer                      │
│  - Books database (in-memory)           │
│  - Users array (in-memory)              │
│  - Session store (in-memory)            │
└─────────────────────────────────────────┘
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Session Management                                  │
│     - express-session                                   │
│     - Session cookie                                    │
│     - Secret: "fingerprint_customer"                    │
│                                                         │
│  2. JWT Authentication                                  │
│     - Token generation on login                         │
│     - Token stored in session                           │
│     - Token verification middleware                     │
│     - Secret: "access"                                  │
│     - Expiry: 1 hour                                    │
│                                                         │
│  3. Route Protection                                    │
│     - Public routes: No auth                            │
│     - /customer/auth/*: JWT required                    │
│     - Middleware checks token validity                  │
│                                                         │
│  4. User Validation                                     │
│     - Username uniqueness check                         │
│     - Password verification                             │
│     - Input validation                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Async Operations Flow

```
Task 10: Async/Await
┌──────────────────────────────────────────┐
│  async function (req, res) {             │
│    try {                                 │
│      const response = await axios.get()  │
│      res.json(response.data)             │
│    } catch (error) {                     │
│      res.status(500).json(error)         │
│    }                                     │
│  }                                       │
└──────────────────────────────────────────┘

Task 11: Promises
┌──────────────────────────────────────────┐
│  function (req, res) {                   │
│    axios.get()                           │
│      .then(response => {                 │
│        res.json(response.data)           │
│      })                                  │
│      .catch(error => {                   │
│        res.status(404).json(error)       │
│      })                                  │
│  }                                       │
└──────────────────────────────────────────┘

Task 12 & 13: Async/Await
┌──────────────────────────────────────────┐
│  async function (req, res) {             │
│    try {                                 │
│      const response = await axios.get()  │
│      res.json(response.data)             │
│    } catch (error) {                     │
│      res.status(404).json(error)         │
│    }                                     │
│  }                                       │
└──────────────────────────────────────────┘
```

---

This architecture provides a clear separation of concerns, secure authentication, and efficient async operations for the book review application.
