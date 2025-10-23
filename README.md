# Online Book Review Application

A server-side online book review application built with Node.js and Express, featuring JWT authentication and REST API endpoints.

## Features

- **General User Access**: Browse books, search by ISBN/Author/Title, view reviews
- **User Authentication**: Register and login with JWT token-based authentication
- **Registered User Features**: Add, modify, and delete book reviews
- **Async Operations**: Endpoints using Promises and Async/Await with Axios

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### General User Routes (No Authentication Required)

#### Task 1: Get all books
- **Method**: GET
- **URL**: `http://localhost:5000/`
- **Description**: Returns list of all books available in the shop

#### Task 2: Get book by ISBN
- **Method**: GET
- **URL**: `http://localhost:5000/isbn/:isbn`
- **Example**: `http://localhost:5000/isbn/1`
- **Description**: Returns book details for the specified ISBN

#### Task 3: Get books by Author
- **Method**: GET
- **URL**: `http://localhost:5000/author/:author`
- **Example**: `http://localhost:5000/author/Chinua Achebe`
- **Description**: Returns all books by the specified author

#### Task 4: Get books by Title
- **Method**: GET
- **URL**: `http://localhost:5000/title/:title`
- **Example**: `http://localhost:5000/title/Things Fall Apart`
- **Description**: Returns all books with the specified title

#### Task 5: Get book reviews
- **Method**: GET
- **URL**: `http://localhost:5000/review/:isbn`
- **Example**: `http://localhost:5000/review/1`
- **Description**: Returns reviews for the specified book

### Authentication Routes

#### Task 6: Register a new user
- **Method**: POST
- **URL**: `http://localhost:5000/register`
- **Body** (JSON):
```json
{
  "username": "testuser",
  "password": "testpass"
}
```
- **Description**: Registers a new user

#### Task 7: Login as registered user
- **Method**: POST
- **URL**: `http://localhost:5000/customer/login`
- **Body** (JSON):
```json
{
  "username": "testuser",
  "password": "testpass"
}
```
- **Description**: Logs in and creates a session with JWT token

### Registered User Routes (Authentication Required)

**Note**: After logging in, the session cookie is automatically stored. Make sure to use the same Postman session.

#### Task 8: Add/Modify a book review
- **Method**: PUT
- **URL**: `http://localhost:5000/customer/auth/review/:isbn?review=Your review text`
- **Example**: `http://localhost:5000/customer/auth/review/1?review=Great book!`
- **Description**: Adds or modifies a review for the specified book
- **Authentication**: Required (must be logged in)

#### Task 9: Delete a book review
- **Method**: DELETE
- **URL**: `http://localhost:5000/customer/auth/review/:isbn`
- **Example**: `http://localhost:5000/customer/auth/review/1`
- **Description**: Deletes the user's review for the specified book
- **Authentication**: Required (must be logged in)

### Async/Promise Routes (Tasks 10-13)

#### Task 10: Get all books (Async/Await)
- **Method**: GET
- **URL**: `http://localhost:5000/async/books`
- **Description**: Returns all books using async callback function

#### Task 11: Search by ISBN (Promises)
- **Method**: GET
- **URL**: `http://localhost:5000/async/isbn/:isbn`
- **Example**: `http://localhost:5000/async/isbn/1`
- **Description**: Returns book details using Promises

#### Task 12: Search by Author (Async/Await)
- **Method**: GET
- **URL**: `http://localhost:5000/async/author/:author`
- **Example**: `http://localhost:5000/async/author/Jane Austen`
- **Description**: Returns books by author using async/await

#### Task 13: Search by Title (Async/Await)
- **Method**: GET
- **URL**: `http://localhost:5000/async/title/:title`
- **Example**: `http://localhost:5000/async/title/Pride and Prejudice`
- **Description**: Returns books by title using async/await

## Testing with Postman

### Setup
1. Download and install [Postman](https://www.postman.com/downloads/)
2. Start the server: `npm start`
3. Create a new collection in Postman

### Testing Steps

#### For Tasks 1-5 (General Users):
1. Create GET requests for each endpoint
2. Take screenshots showing the response

#### For Tasks 6-7 (Authentication):
1. **Register**: Create POST request to `/register` with username and password in body
2. **Login**: Create POST request to `/customer/login` with credentials
3. After login, Postman will store the session cookie automatically

#### For Tasks 8-9 (Registered Users):
1. First, complete Task 7 (login) in the same Postman session
2. The session cookie will be used for authentication
3. Create PUT request for adding review
4. Create DELETE request for deleting review

#### For Tasks 10-13 (Async Routes):
1. **Important**: The server must be running for these to work
2. These endpoints use Axios to make internal API calls
3. Create GET requests for each async endpoint

### Screenshot Naming Convention
- Task 1: `1-getallbooks.png`
- Task 2: `2-getdetailsISBN.png`
- Task 3: `3-getbooksbyauthor.png`
- Task 4: `4-getbooksbytitle.png`
- Task 5: `5-getbookreview.png`
- Task 6: `6-register.png`
- Task 7: `7-login.png`
- Task 8: `8-reviewadded.png`
- Task 9: `9-deletereview.png`
- Task 10: `10-asyncgetallbooks.png`
- Task 11: `11-promiseisbn.png`
- Task 12: `12-asyncauthor.png`
- Task 13: `13-asynctitle.png`

## Project Structure

```
book-review-app/
├── index.js                 # Main server file
├── booksdb.js              # Book database
├── package.json            # Dependencies
├── router/
│   ├── general.js          # General user routes (Tasks 1-6)
│   ├── auth_users.js       # Authentication & registered user routes (Tasks 7-9)
│   └── async_routes.js     # Async/Promise routes (Tasks 10-13)
└── README.md              # This file
```

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **JWT (jsonwebtoken)**: Token-based authentication
- **express-session**: Session management
- **Axios**: HTTP client for async operations
- **body-parser**: Parse incoming request bodies

## Notes

- Default port is 5000
- Sessions are stored in memory (for production, use a session store)
- JWT tokens expire after 1 hour
- Book reviews are stored per user (username as key)

## License

ISC
