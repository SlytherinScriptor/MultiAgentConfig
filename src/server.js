const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let messages = [];

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.post('/api/messages', (req, res) => {
  const { username, message } = req.body;
  messages.push({ username, message });
  res.json({ username, message });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
