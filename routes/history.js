const express = require('express');
const router = express.Router();
const pool = require('../db');
const config = require('../config');
const jwt = require('jsonwebtoken');

router.post('/addHistory', async (req, res) => {
  const { score } = req.body;
  const {id, username} = req.auth;
  const query = 'INSERT INTO game_history (userid, score, time) VALUES (?, ?, ?)';
  const timestamp = new Date();
  pool.query(query, [id, score, `${timestamp.getFullYear()}/${timestamp.getMonth() + 1}/${timestamp.getDate()}`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving record');
    }
    res.status(200).send('Saved successfully');
  });
  
});


// Create a new user
router.get('/getHistory', (req, res) => {
  const {id, username} = req.auth;
  const query = 'SELECT * FROM game_history WHERE userid = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error getting history');
    }
    res.status(200).send(results);
  });
});

module.exports = router;