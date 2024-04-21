const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { companyName, sections, words, email } = req.body;

  try {
    await axios.post('https://n8n-render-z96v.onrender.com/webhook/stockAnalysis', {
      companyName,
      sections,
      words,
      email
    });

    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing n8n workflow:', error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
