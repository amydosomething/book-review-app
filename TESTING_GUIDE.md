# Testing Guide for Book Review Application

This guide provides step-by-step instructions for testing all 13 tasks using Postman.

## Prerequisites

1. Install Node.js and npm
2. Install Postman
3. Navigate to project directory and run:
   ```bash
   npm install
   npm start
   ```
4. Ensure server is running on `http://localhost:5000`

## Postman Configuration

### Important Settings:
- Enable "Automatically follow redirects"
- Enable "Save cookies" (for session management)
- Use the same Postman tab/session for Tasks 6-9

---

## Task 1: Get All Books

**Screenshot Name**: `1-getallbooks.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/`

**Expected Response**:
```json
{
    "1": {
        "author": "Chinua Achebe",
        "title": "Things Fall Apart",
        "reviews": {}
    },
    "2": {
        "author": "Hans Christian Andersen",
        "title": "Fairy tales",
        "reviews": {}
    },
    ...
}
```

---

## Task 2: Get Book Details by ISBN

**Screenshot Name**: `2-getdetailsISBN.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/isbn/1`

**Expected Response**:
```json
{
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
}
```

**Test with different ISBNs**: Try `/isbn/2`, `/isbn/8`, etc.

---

## Task 3: Get Books by Author

**Screenshot Name**: `3-getbooksbyauthor.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/author/Jane Austen`

**Expected Response**:
```json
[
    {
        "isbn": "8",
        "title": "Pride and Prejudice",
        "reviews": {}
    }
]
```

**Other authors to test**:
- `Chinua Achebe`
- `Hans Christian Andersen`
- `Unknown`

---

## Task 4: Get Books by Title

**Screenshot Name**: `4-getbooksbytitle.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/title/Pride and Prejudice`

**Expected Response**:
```json
[
    {
        "isbn": "8",
        "author": "Jane Austen",
        "reviews": {}
    }
]
```

**Other titles to test**:
- `Things Fall Apart`
- `Fairy tales`

---

## Task 5: Get Book Reviews

**Screenshot Name**: `5-getbookreview.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/review/1`

**Expected Response** (initially empty):
```json
{}
```

**Note**: After Task 8, this will show reviews added by users.

---

## Task 6: Register New User

**Screenshot Name**: `6-register.png`

**Request Details**:
- Method: `POST`
- URL: `http://localhost:5000/register`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
    "username": "testuser",
    "password": "password123"
}
```

**Expected Response**:
```json
{
    "message": "User successfully registered. Now you can login"
}
```

**Test Cases**:
1. Register with valid credentials (should succeed)
2. Register same user again (should fail with "User already exists!")
3. Register without username or password (should fail)

---

## Task 7: Login as Registered User

**Screenshot Name**: `7-login.png`

**Request Details**:
- Method: `POST`
- URL: `http://localhost:5000/customer/login`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
    "username": "testuser",
    "password": "password123"
}
```

**Expected Response**:
```
User successfully logged in
```

**Important**: 
- After successful login, Postman stores the session cookie
- Keep this Postman tab open for Tasks 8-9
- The session cookie contains the JWT token

**Test Cases**:
1. Login with correct credentials (should succeed)
2. Login with wrong password (should fail)
3. Login with non-existent user (should fail)

---

## Task 8: Add/Modify Book Review

**Screenshot Name**: `8-reviewadded.png`

**Prerequisites**: Must complete Task 7 (login) first in the same Postman session

**Request Details**:
- Method: `PUT`
- URL: `http://localhost:5000/customer/auth/review/1?review=This is an excellent book!`

**Expected Response**:
```json
{
    "message": "Review successfully added/updated"
}
```

**Test Cases**:
1. Add a new review (should succeed)
2. Modify existing review (should update)
3. Try without login (should fail with "User not logged in")

**Verification**:
- After adding review, use Task 5 endpoint to verify: `GET http://localhost:5000/review/1`
- Should show: `{"testuser": "This is an excellent book!"}`

---

## Task 9: Delete Book Review

**Screenshot Name**: `9-deletereview.png`

**Prerequisites**: 
- Must complete Task 7 (login) first
- Must have added a review in Task 8

**Request Details**:
- Method: `DELETE`
- URL: `http://localhost:5000/customer/auth/review/1`

**Expected Response**:
```json
{
    "message": "Review successfully deleted"
}
```

**Test Cases**:
1. Delete existing review (should succeed)
2. Try to delete non-existent review (should fail)
3. Try without login (should fail)

**Verification**:
- After deleting, use Task 5 endpoint: `GET http://localhost:5000/review/1`
- Should show empty object: `{}`

---

## Task 10: Get All Books (Async/Await)

**Screenshot Name**: `10-asyncgetallbooks.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/async/books`

**Expected Response**: Same as Task 1, but retrieved using async/await with Axios

**Implementation**: Uses `async/await` callback function

---

## Task 11: Search by ISBN (Promises)

**Screenshot Name**: `11-promiseisbn.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/async/isbn/1`

**Expected Response**: Same as Task 2, but retrieved using Promises

**Implementation**: Uses `.then()` and `.catch()` Promise syntax

---

## Task 12: Search by Author (Async/Await)

**Screenshot Name**: `12-asyncauthor.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/async/author/Jane Austen`

**Expected Response**: Same as Task 3, but retrieved using async/await

**Implementation**: Uses `async/await` with Axios

---

## Task 13: Search by Title (Async/Await)

**Screenshot Name**: `13-asynctitle.png`

**Request Details**:
- Method: `GET`
- URL: `http://localhost:5000/async/title/Pride and Prejudice`

**Expected Response**: Same as Task 4, but retrieved using async/await

**Implementation**: Uses `async/await` with Axios

---

## Common Issues and Solutions

### Issue 1: "User not authenticated" error
**Solution**: Make sure you've logged in (Task 7) in the same Postman session

### Issue 2: Async routes return errors
**Solution**: Ensure the main server is running. Async routes make internal API calls to localhost:5000

### Issue 3: Session not persisting
**Solution**: 
- Check Postman settings: Enable "Save cookies"
- Use the same Postman tab for Tasks 6-9
- Don't close/restart Postman between authentication tasks

### Issue 4: "Cannot find module" error
**Solution**: Run `npm install` to install all dependencies

### Issue 5: Port already in use
**Solution**: 
- Stop any other processes using port 5000
- Or change PORT in index.js

---

## Testing Workflow Summary

### Phase 1: General User Tests (No Auth)
1. Task 1: Get all books
2. Task 2: Get book by ISBN
3. Task 3: Get books by author
4. Task 4: Get books by title
5. Task 5: Get book reviews

### Phase 2: Authentication Tests
6. Task 6: Register user
7. Task 7: Login user

### Phase 3: Authenticated User Tests (Requires Login)
8. Task 8: Add review
9. Task 9: Delete review

### Phase 4: Async/Promise Tests
10. Task 10: Async get all books
11. Task 11: Promise-based ISBN search
12. Task 12: Async author search
13. Task 13: Async title search

---

## Screenshot Checklist

Before submission, ensure you have all screenshots:
- [ ] 1-getallbooks.png
- [ ] 2-getdetailsISBN.png
- [ ] 3-getbooksbyauthor.png
- [ ] 4-getbooksbytitle.png
- [ ] 5-getbookreview.png
- [ ] 6-register.png
- [ ] 7-login.png
- [ ] 8-reviewadded.png
- [ ] 9-deletereview.png
- [ ] 10-asyncgetallbooks.png
- [ ] 11-promiseisbn.png
- [ ] 12-asyncauthor.png
- [ ] 13-asynctitle.png

---

## Additional Testing Tips

1. **Use Postman Collections**: Save all requests in a collection for easy re-testing
2. **Environment Variables**: Create Postman environment with base URL variable
3. **Test Scripts**: Add Postman test scripts to automate validation
4. **Response Validation**: Check status codes (200, 404, 403, etc.)
5. **Edge Cases**: Test with invalid ISBNs, non-existent authors, etc.

---

## Task 14: GitHub Submission

1. Initialize git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Book Review Application"
   ```

2. Create GitHub repository and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. Submit your GitHub repository URL

---

## Grading Criteria

- Tasks 1-5: 2 points each (10 points total)
- Task 6: 3 points
- Task 7: 3 points
- Tasks 8-9: 2 points each (4 points total)
- Tasks 10-13: 2 points each (8 points total)
- Task 14: 2 points

**Total**: 30 points
