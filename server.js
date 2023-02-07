const express = require('express');
const cors = require('cors');

const mainRoutes = require('./routes/main')

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set('view engine', 'ejs')

app.use('/', mainRoutes)

app.listen(port, () => {
  console.log(`NHL ETL pipeline running on port ${port}`);
});