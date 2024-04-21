app.post('/analyze', async (req, res) => {
  const { stock, email } = req.body;
  try {
    await axios.post('https://n8n-render-z96v.onrender.com/webhook/stockAnalysis', {
      stock,
      email
    });
    res.sendStatus(200);
  } catch (error) {
    console.error('Error executing n8n workflow:', error);
    res.sendStatus(500);
  }
});