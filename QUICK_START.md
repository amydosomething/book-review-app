# Quick Start Guide

## Installation & Setup (2 minutes)

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```
   
   You should see: `Server is running on port 5000`

## Quick Test with Postman (10 minutes)

### Option 1: Import Postman Collection
1. Open Postman
2. Click "Import" → Select `Book_Review_API.postman_collection.json`
3. All 13 tasks are ready to test!

### Option 2: Manual Testing

#### Test Tasks 1-5 (No Authentication)
```
GET http://localhost:5000/                           → Task 1
GET http://localhost:5000/isbn/1                     → Task 2
GET http://localhost:5000/author/Jane Austen         → Task 3
GET http://localhost:5000/title/Pride and Prejudice  → Task 4
GET http://localhost:5000/review/1                   → Task 5
```

#### Test Tasks 6-7 (Authentication)
```
POST http://localhost:5000/register                  → Task 6
Body: {"username": "testuser", "password": "test123"}

POST http://localhost:5000/customer/login            → Task 7
Body: {"username": "testuser", "password": "test123"}
```

#### Test Tasks 8-9 (Requires Login First!)
```
PUT http://localhost:5000/customer/auth/review/1?review=Great book!  → Task 8
DELETE http://localhost:5000/customer/auth/review/1                  → Task 9
```

#### Test Tasks 10-13 (Async/Promises)
```
GET http://localhost:5000/async/books                → Task 10
GET http://localhost:5000/async/isbn/1               → Task 11
GET http://localhost:5000/async/author/Jane Austen   → Task 12
GET http://localhost:5000/async/title/Fairy tales    → Task 13
```

## Taking Screenshots

1. **Execute each request in Postman**
2. **Take screenshot showing**:
   - Request URL
   - Request method
   - Response body
   - Status code (200, 404, etc.)

3. **Save with correct names**:
   - `1-getallbooks.png`
   - `2-getdetailsISBN.png`
   - `3-getbooksbyauthor.png`
   - `4-getbooksbytitle.png`
   - `5-getbookreview.png`
   - `6-register.png`
   - `7-login.png`
   - `8-reviewadded.png`
   - `9-deletereview.png`
   - `10-asyncgetallbooks.png`
   - `11-promiseisbn.png`
   - `12-asyncauthor.png`
   - `13-asynctitle.png`

## Common Mistakes to Avoid

❌ **Don't**: Close Postman between Tasks 7-9
✅ **Do**: Keep the same session for authentication

❌ **Don't**: Forget to login before Tasks 8-9
✅ **Do**: Complete Task 7 first in the same tab

❌ **Don't**: Forget to start the server for Tasks 10-13
✅ **Do**: Ensure server is running (async routes need it)

## GitHub Submission (Task 14)

```bash
git init
git add .
git commit -m "Book Review Application - Final Project"
git remote add origin <your-repo-url>
git push -u origin main
```

## Need Help?

- Check `TESTING_GUIDE.md` for detailed instructions
- Check `README.md` for API documentation
- Verify server is running: `http://localhost:5000/`

## Project Structure

```
book-review-app/
├── index.js                    # Main server
├── booksdb.js                  # Book data
├── router/
│   ├── general.js              # Tasks 1-6
│   ├── auth_users.js           # Tasks 7-9
│   └── async_routes.js         # Tasks 10-13
├── package.json
├── README.md
├── TESTING_GUIDE.md
├── QUICK_START.md
└── Book_Review_API.postman_collection.json
```

## Troubleshooting

**Server won't start?**
- Check if port 5000 is available
- Run `npm install` first

**Authentication not working?**
- Make sure you registered first (Task 6)
- Make sure you logged in (Task 7)
- Use the same Postman session

**Async routes failing?**
- Verify main server is running
- These routes make internal API calls

---

**Good luck with your project! 🚀**
