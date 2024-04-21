const express = require('express');
const axios = require('axios'); // Ensure axios is required

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.post('/analyze', async (req, res) => {
  const { stock, email } = req.body;
  try {
    await axios.post('https://n8n-render-z96v.onrender.com/webhook/stockAnalysis', {
      stock,
      email
    });
    res.sendStatus(200); // OK status
  } catch (error) {
    console.error('Error executing n8n workflow:', error);
    if (error.response) {
      // Request made and server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      res.sendStatus(500); // Internal Server Error status
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      res.status(500).send(error.message);
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
