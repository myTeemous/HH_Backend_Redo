require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

//import routes
const registerRoutes = require('./routes/register');

app.use(bodyParser.urlencoded({extended: false}));

//mount routes
app.use(registerRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

