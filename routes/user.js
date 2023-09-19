const express = require('express');
const router = express.Router();
const pool = require('../db');
const config = require('../config');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  pool.execute(query, [username, password], (err, results) => {
    if (err || results.length === 0) {
      console.error(err);
      return res.status(500).send('User does not exist');
    }
    const user = {
      username: results[0].username,
      id: results[0].id
    };
    const accessToken = jwt.sign(user, config.secretKey, { algorithm: 'HS256' });

    res.json({ message: 'Login successful', token: accessToken });
  });
});


// Create a new user
router.post('/createUser', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  pool.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error creating user');
    }
    const user = {
      username: username,
      id: results.insertId
    };
    const accessToken = jwt.sign(user, config.secretKey, { algorithm: 'HS256' });
    res.status(200).send({ message: 'User created successfully', token: accessToken });
  });
});

module.exports = router;