# Project Submission Checklist

Use this checklist to ensure you've completed all requirements before submission.

## ✅ Code Implementation

- [ ] **booksdb.js**: Book database with sample data
- [ ] **index.js**: Main server with Express and JWT configuration
- [ ] **router/general.js**: General user routes (Tasks 1-6)
- [ ] **router/auth_users.js**: Authentication and registered user routes (Tasks 7-9)
- [ ] **router/async_routes.js**: Async/Promise routes (Tasks 10-13)
- [ ] **package.json**: All dependencies listed

## ✅ Functionality Testing

### General Users (No Authentication)
- [ ] **Task 1**: Get all books - Returns complete book list
- [ ] **Task 2**: Get book by ISBN - Returns specific book details
- [ ] **Task 3**: Get books by author - Returns filtered books
- [ ] **Task 4**: Get books by title - Returns filtered books
- [ ] **Task 5**: Get book reviews - Returns reviews object

### Authentication
- [ ] **Task 6**: Register new user - Successfully creates user
- [ ] **Task 6**: Duplicate registration - Returns error
- [ ] **Task 7**: Login with valid credentials - Returns success
- [ ] **Task 7**: Login with invalid credentials - Returns error

### Registered Users (Requires Authentication)
- [ ] **Task 8**: Add new review - Successfully adds review
- [ ] **Task 8**: Modify existing review - Successfully updates review
- [ ] **Task 8**: Without login - Returns authentication error
- [ ] **Task 9**: Delete review - Successfully removes review
- [ ] **Task 9**: Without login - Returns authentication error

### Async/Promises
- [ ] **Task 10**: Async get all books - Uses async/await
- [ ] **Task 11**: Promise search by ISBN - Uses .then()/.catch()
- [ ] **Task 12**: Async search by author - Uses async/await
- [ ] **Task 13**: Async search by title - Uses async/await

## ✅ Screenshots Required

- [ ] `1-getallbooks.png` - Shows all books in JSON format
- [ ] `2-getdetailsISBN.png` - Shows single book details
- [ ] `3-getbooksbyauthor.png` - Shows filtered books by author
- [ ] `4-getbooksbytitle.png` - Shows filtered books by title
- [ ] `5-getbookreview.png` - Shows reviews object
- [ ] `6-register.png` - Shows successful registration message
- [ ] `7-login.png` - Shows successful login message
- [ ] `8-reviewadded.png` - Shows review added/updated message
- [ ] `9-deletereview.png` - Shows review deleted message
- [ ] `10-asyncgetallbooks.png` - Shows async response
- [ ] `11-promiseisbn.png` - Shows promise-based response
- [ ] `12-asyncauthor.png` - Shows async author search
- [ ] `13-asynctitle.png` - Shows async title search

## ✅ Screenshot Quality Check

Each screenshot should clearly show:
- [ ] Request URL in address bar
- [ ] HTTP method (GET, POST, PUT, DELETE)
- [ ] Request body (for POST/PUT requests)
- [ ] Response status code (200, 404, etc.)
- [ ] Response body with data
- [ ] Timestamp (optional but helpful)

## ✅ Code Quality

- [ ] All routes are properly defined
- [ ] Error handling is implemented
- [ ] JWT authentication is working
- [ ] Session management is configured
- [ ] Async/await is used correctly
- [ ] Promises are used correctly
- [ ] Code follows consistent style
- [ ] No syntax errors
- [ ] Server starts without errors

## ✅ Documentation

- [ ] README.md with API documentation
- [ ] TESTING_GUIDE.md with detailed instructions
- [ ] QUICK_START.md for quick setup
- [ ] Comments in code where necessary
- [ ] Clear variable and function names

## ✅ GitHub Repository (Task 14)

- [ ] Repository is created on GitHub
- [ ] All code files are committed
- [ ] .gitignore excludes node_modules
- [ ] README.md is visible on repository page
- [ ] Repository URL is ready for submission
- [ ] Repository is public (or accessible to graders)

## ✅ Pre-Submission Verification

### Test Server Startup
```bash
npm install
npm start
```
- [ ] Server starts successfully
- [ ] No error messages in console
- [ ] Shows "Server is running on port 5000"

### Test All Endpoints
- [ ] All 13 tasks work as expected
- [ ] Authentication flow works correctly
- [ ] Reviews can be added and deleted
- [ ] Async routes return correct data

### Verify Files
- [ ] All source files are present
- [ ] package.json has all dependencies
- [ ] No unnecessary files committed
- [ ] Screenshots are properly named

## ✅ Grading Breakdown (30 Points Total)

| Task | Points | Description | Status |
|------|--------|-------------|--------|
| 1 | 2 | Get all books | ☐ |
| 2 | 2 | Get book by ISBN | ☐ |
| 3 | 2 | Get books by author | ☐ |
| 4 | 2 | Get books by title | ☐ |
| 5 | 2 | Get book reviews | ☐ |
| 6 | 3 | Register new user | ☐ |
| 7 | 3 | Login as registered user | ☐ |
| 8 | 2 | Add/modify review | ☐ |
| 9 | 2 | Delete review | ☐ |
| 10 | 2 | Async get all books | ☐ |
| 11 | 2 | Promise search by ISBN | ☐ |
| 12 | 2 | Async search by author | ☐ |
| 13 | 2 | Async search by title | ☐ |
| 14 | 2 | GitHub submission | ☐ |
| **Total** | **30** | | |

## ✅ Final Checks Before Submission

- [ ] All 13 screenshots are taken and properly named
- [ ] GitHub repository is created and pushed
- [ ] Repository URL is copied for submission
- [ ] All tasks have been tested at least once
- [ ] Server can be started fresh with `npm install && npm start`
- [ ] No hardcoded values that would break on another machine
- [ ] README is clear and helpful

## 📝 Submission Items

1. **Screenshots** (13 files):
   - Upload each screenshot to the corresponding task in the submission form

2. **GitHub URL** (Task 14):
   - Format: `https://github.com/yourusername/book-review-app`
   - Ensure repository is accessible

## 🎯 Common Mistakes to Avoid

- ❌ Forgetting to login before testing Tasks 8-9
- ❌ Using different Postman sessions for authentication
- ❌ Not starting server before testing async routes
- ❌ Screenshots missing request details
- ❌ Wrong screenshot file names
- ❌ GitHub repository is private
- ❌ Missing node_modules in .gitignore
- ❌ Hardcoded port without checking availability

## ✨ Bonus Points (Optional)

- [ ] Add input validation for all endpoints
- [ ] Add more books to the database
- [ ] Implement password hashing
- [ ] Add API documentation with Swagger
- [ ] Add unit tests
- [ ] Add environment variables for configuration
- [ ] Add rate limiting
- [ ] Add CORS configuration

---

## Ready to Submit?

If you've checked all the boxes above, you're ready to submit your project! 

**Good luck! 🎉**

---

**Estimated Time**: 2 hours
**Difficulty**: Intermediate
**Technologies**: Node.js, Express, JWT, Axios, Postman
