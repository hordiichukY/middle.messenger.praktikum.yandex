const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('/*', (req, res) => {
  return res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, (error) => {
  console.log(`App run on ${PORT}`);
});
