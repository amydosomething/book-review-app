# Step-by-Step Execution Guide

This guide walks you through executing and testing all 13 tasks in the correct order.

## ⚙️ Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd d:\NOTES\coursera2
npm install
```

**Expected Output:**
```
added 57 packages, and audited 58 packages in 3s
```

### Step 2: Start the Server
```bash
npm start
```

**Expected Output:**
```
Server is running on port 5000
```

**✅ Checkpoint**: Server should be running without errors.

---

## 📋 Phase 1: General User Tests (10 minutes)

### Task 1: Get All Books

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/`
- Click "Send"

**Expected Response (Status 200):**
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

**Screenshot:** Take screenshot and save as `1-getallbooks.png`

---

### Task 2: Get Book by ISBN

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/isbn/1`
- Click "Send"

**Expected Response (Status 200):**
```json
{
    "author": "Chinua Achebe",
    "title": "Things Fall Apart",
    "reviews": {}
}
```

**Test Multiple ISBNs:**
- Try: `/isbn/2`, `/isbn/5`, `/isbn/8`
- Try invalid: `/isbn/999` (should return 404)

**Screenshot:** Take screenshot and save as `2-getdetailsISBN.png`

---

### Task 3: Get Books by Author

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/author/Jane Austen`
- Click "Send"

**Expected Response (Status 200):**
```json
[
    {
        "isbn": "8",
        "title": "Pride and Prejudice",
        "reviews": {}
    }
]
```

**Test Multiple Authors:**
- `Chinua Achebe`
- `Hans Christian Andersen`
- `Unknown`
- `Samuel Beckett`

**Screenshot:** Take screenshot and save as `3-getbooksbyauthor.png`

---

### Task 4: Get Books by Title

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/title/Pride and Prejudice`
- Click "Send"

**Expected Response (Status 200):**
```json
[
    {
        "isbn": "8",
        "author": "Jane Austen",
        "reviews": {}
    }
]
```

**Test Multiple Titles:**
- `Things Fall Apart`
- `Fairy tales`
- `The Divine Comedy`

**Screenshot:** Take screenshot and save as `4-getbooksbytitle.png`

---

### Task 5: Get Book Reviews

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/review/1`
- Click "Send"

**Expected Response (Status 200):**
```json
{}
```

**Note:** Reviews will be empty initially. After Task 8, this will show reviews.

**Screenshot:** Take screenshot and save as `5-getbookreview.png`

**✅ Checkpoint**: All 5 general user tasks completed.

---

## 🔐 Phase 2: Authentication (5 minutes)

### Task 6: Register New User

**Postman Setup:**
- Method: `POST`
- URL: `http://localhost:5000/register`
- Headers: 
  - `Content-Type: application/json`
- Body (raw JSON):
```json
{
    "username": "testuser",
    "password": "password123"
}
```
- Click "Send"

**Expected Response (Status 200):**
```json
{
    "message": "User successfully registered. Now you can login"
}
```

**Test Cases:**
1. ✅ First registration - should succeed
2. ❌ Same username again - should fail with "User already exists!"
3. ❌ Missing username - should fail
4. ❌ Missing password - should fail

**Screenshot:** Take screenshot of successful registration and save as `6-register.png`

---

### Task 7: Login as Registered User

**⚠️ IMPORTANT:** Keep this Postman tab open for Tasks 8-9!

**Postman Setup:**
- Method: `POST`
- URL: `http://localhost:5000/customer/login`
- Headers: 
  - `Content-Type: application/json`
- Body (raw JSON):
```json
{
    "username": "testuser",
    "password": "password123"
}
```
- Click "Send"

**Expected Response (Status 200):**
```
User successfully logged in
```

**Verify Session:**
- In Postman, go to "Cookies" (below Send button)
- You should see a cookie for `localhost:5000`
- This cookie contains your session ID

**Test Cases:**
1. ✅ Correct credentials - should succeed
2. ❌ Wrong password - should fail
3. ❌ Non-existent user - should fail

**Screenshot:** Take screenshot and save as `7-login.png`

**✅ Checkpoint**: You are now logged in. Session cookie is stored.

---

## 👤 Phase 3: Registered User Operations (5 minutes)

**⚠️ PREREQUISITE:** Must have completed Task 7 (login) in the same Postman session!

### Task 8: Add/Modify Book Review

**Postman Setup:**
- Method: `PUT`
- URL: `http://localhost:5000/customer/auth/review/1?review=This is an excellent book! Highly recommended.`
- **No need to add headers** - Session cookie is automatically sent
- Click "Send"

**Expected Response (Status 200):**
```json
{
    "message": "Review successfully added/updated"
}
```

**Test Cases:**
1. ✅ Add new review - should succeed
2. ✅ Modify same review - should update
3. ❌ Without login - should return 403

**Verify Review Was Added:**
- Make a GET request to: `http://localhost:5000/review/1`
- You should see:
```json
{
    "testuser": "This is an excellent book! Highly recommended."
}
```

**Add More Reviews:**
- Try adding reviews to different books (ISBN 2, 3, etc.)
- Try with different review text

**Screenshot:** Take screenshot and save as `8-reviewadded.png`

---

### Task 9: Delete Book Review

**Postman Setup:**
- Method: `DELETE`
- URL: `http://localhost:5000/customer/auth/review/1`
- **No need to add headers** - Session cookie is automatically sent
- Click "Send"

**Expected Response (Status 200):**
```json
{
    "message": "Review successfully deleted"
}
```

**Verify Review Was Deleted:**
- Make a GET request to: `http://localhost:5000/review/1`
- You should see:
```json
{}
```

**Test Cases:**
1. ✅ Delete existing review - should succeed
2. ❌ Delete again - should fail (review doesn't exist)
3. ❌ Without login - should return 403

**Screenshot:** Take screenshot and save as `9-deletereview.png`

**✅ Checkpoint**: Authentication and review management completed.

---

## 🔄 Phase 4: Async/Promise Operations (5 minutes)

**⚠️ IMPORTANT:** Server must be running for these to work!

### Task 10: Get All Books (Async/Await)

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/async/books`
- Click "Send"

**Expected Response (Status 200):**
Same as Task 1, but retrieved using async/await with Axios

**Code Implementation:**
```javascript
async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({message: "Error", error: error.message});
  }
}
```

**Screenshot:** Take screenshot and save as `10-asyncgetallbooks.png`

---

### Task 11: Search by ISBN (Promises)

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/async/isbn/1`
- Click "Send"

**Expected Response (Status 200):**
Same as Task 2, but retrieved using Promises

**Code Implementation:**
```javascript
function (req, res) {
  axios.get('http://localhost:5000/isbn/1')
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(404).json({message: "Not found", error: error.message});
    });
}
```

**Test Multiple ISBNs:**
- `/async/isbn/2`
- `/async/isbn/8`

**Screenshot:** Take screenshot and save as `11-promiseisbn.png`

---

### Task 12: Search by Author (Async/Await)

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/async/author/Jane Austen`
- Click "Send"

**Expected Response (Status 200):**
Same as Task 3, but retrieved using async/await

**Test Multiple Authors:**
- `/async/author/Chinua Achebe`
- `/async/author/Unknown`

**Screenshot:** Take screenshot and save as `12-asyncauthor.png`

---

### Task 13: Search by Title (Async/Await)

**Postman Setup:**
- Method: `GET`
- URL: `http://localhost:5000/async/title/Pride and Prejudice`
- Click "Send"

**Expected Response (Status 200):**
Same as Task 4, but retrieved using async/await

**Test Multiple Titles:**
- `/async/title/Things Fall Apart`
- `/async/title/Fairy tales`

**Screenshot:** Take screenshot and save as `13-asynctitle.png`

**✅ Checkpoint**: All async/promise operations completed.

---

## 📸 Screenshot Verification Checklist

Before proceeding, verify you have all 13 screenshots:

- [ ] `1-getallbooks.png`
- [ ] `2-getdetailsISBN.png`
- [ ] `3-getbooksbyauthor.png`
- [ ] `4-getbooksbytitle.png`
- [ ] `5-getbookreview.png`
- [ ] `6-register.png`
- [ ] `7-login.png`
- [ ] `8-reviewadded.png`
- [ ] `9-deletereview.png`
- [ ] `10-asyncgetallbooks.png`
- [ ] `11-promiseisbn.png`
- [ ] `12-asyncauthor.png`
- [ ] `13-asynctitle.png`

**Each screenshot should show:**
- ✅ Request URL
- ✅ HTTP Method
- ✅ Request body (if applicable)
- ✅ Response status code
- ✅ Response body

---

## 🐙 Task 14: GitHub Submission (10 minutes)

### Step 1: Initialize Git Repository
```bash
cd d:\NOTES\coursera2
git init
```

### Step 2: Add All Files
```bash
git add .
```

### Step 3: Commit
```bash
git commit -m "Book Review Application - Final Project

- Implemented all 13 tasks
- General user routes (Tasks 1-5)
- Authentication system (Tasks 6-7)
- Registered user features (Tasks 8-9)
- Async/Promise operations (Tasks 10-13)
- Complete documentation"
```

### Step 4: Create GitHub Repository
1. Go to https://github.com
2. Click "New Repository"
3. Name: `book-review-app` (or your preferred name)
4. Description: "Online Book Review Application with JWT Authentication"
5. **Make it PUBLIC** (so graders can access it)
6. **Do NOT** initialize with README (we already have one)
7. Click "Create Repository"

### Step 5: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/book-review-app.git
git branch -M main
git push -u origin main
```

### Step 6: Verify Repository
1. Visit your repository URL
2. Verify all files are present
3. Check README.md displays correctly
4. Copy the repository URL

**Repository URL Format:**
```
https://github.com/YOUR_USERNAME/book-review-app
```

**✅ Checkpoint**: GitHub repository is ready for submission.

---

## 📤 Final Submission

### Upload Screenshots (Tasks 1-13)
For each task in the submission form:
1. Click "Upload File"
2. Select the corresponding screenshot
3. Verify filename matches requirement

### Submit GitHub URL (Task 14)
1. Paste your repository URL
2. Format: `https://github.com/YOUR_USERNAME/book-review-app`
3. Verify URL is accessible (open in incognito/private window)

---

## ✅ Completion Checklist

- [ ] All dependencies installed
- [ ] Server starts successfully
- [ ] All 13 tasks tested and working
- [ ] All 13 screenshots taken with correct names
- [ ] Screenshots show all required information
- [ ] Git repository initialized
- [ ] Code committed to Git
- [ ] GitHub repository created (PUBLIC)
- [ ] Code pushed to GitHub
- [ ] Repository URL verified and accessible
- [ ] Screenshots uploaded to submission form
- [ ] GitHub URL submitted

---

## 🎉 Congratulations!

You have successfully completed all 13 tasks of the Book Review Application project!

**Total Time Spent:** ~2 hours
**Tasks Completed:** 13/13
**Points:** 30/30

---

## 📞 Troubleshooting

### Issue: Server won't start
**Solution:**
```bash
npm install
npm start
```

### Issue: Port 5000 already in use
**Solution:**
Edit `index.js` and change `const PORT = 5000;` to another port like `5001`

### Issue: Authentication not working
**Solution:**
1. Make sure you completed Task 6 (register)
2. Make sure you completed Task 7 (login)
3. Use the same Postman tab/session
4. Check if session cookie is present in Postman

### Issue: Async routes returning errors
**Solution:**
1. Verify main server is running
2. These routes make internal calls to `localhost:5000`
3. Check server console for error messages

### Issue: Can't push to GitHub
**Solution:**
1. Verify you created the repository on GitHub
2. Check your GitHub credentials
3. Use HTTPS URL format
4. Try: `git remote -v` to verify remote is set correctly

---

## 📚 Additional Resources

- **API Documentation**: See `README.md`
- **Detailed Testing**: See `TESTING_GUIDE.md`
- **Quick Reference**: See `QUICK_START.md`
- **Architecture**: See `ARCHITECTURE.md`
- **Submission Checklist**: See `PROJECT_CHECKLIST.md`

---

**Good luck with your peer review! 🚀**
