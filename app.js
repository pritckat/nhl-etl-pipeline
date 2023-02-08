const express = require('express');
const cors = require('cors');

const mainRoutes = require('./routes/main')

const app = express();

app.use(cors());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.set('view engine', 'ejs')

app.use('/', mainRoutes)

module.exports = app;