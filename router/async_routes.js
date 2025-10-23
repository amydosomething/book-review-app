const express = require('express');
const axios = require('axios');
const async_routes = express.Router();

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books using async callback function
async_routes.get('/books', async function (req, res) {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({message: "Error fetching books", error: error.message});
  }
});

// Task 11: Search by ISBN using Promises
async_routes.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  
  axios.get(`${BASE_URL}/isbn/${isbn}`)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(404).json({message: "Book not found", error: error.message});
    });
});

// Task 12: Search by Author using async/await
async_routes.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({message: "No books found by this author", error: error.message});
  }
});

// Task 13: Search by Title using async/await
async_routes.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({message: "No books found with this title", error: error.message});
  }
});

module.exports.async_routes = async_routes;
