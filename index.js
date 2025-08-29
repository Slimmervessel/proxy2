const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing url parameter');

  try {
    const response = await fetch(targetUrl);
    const body = await response.text();

    // Forward content-type headers (optional, you can customize this)
    res.set('Content-Type', response.headers.get('content-type') || 'text/html');
    res.send(body);
  } catch (err) {
    res.status(500).send('Failed to fetch URL');
  }
});

module.exports = app;
