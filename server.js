const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

app.use(express.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  if (username.length > 20 || password.length > 20) {
    return res.status(400).json({ error: 'Username and password cannot be longer than 20 characters' });
  }
  if (username.trim() === '' || password.trim() === '') {
    return res.status(400).json({ error: 'Username and password cannot be empty' });
  }
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.get('/api/messages', authenticate, (req, res) => {
  res.json([{ username: 'admin', message: 'Hello, world!' }]);
});

app.post('/api/messages', authenticate, (req, res) => {
  const { username, message } = req.body;
  res.json({ username, message });
});

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'You are not authorized' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.username = decoded.username;
    next();
  });
}

app.listen(3001, () => {
  console.log('Server started on port 3001');
});