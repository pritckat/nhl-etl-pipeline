const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
    res.send('Hello, World!')
});

app.listen(port, () => {
  console.log(`NHL ETL pipeline running on port ${port}`);
});