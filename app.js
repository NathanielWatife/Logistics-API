const express = require('express');
require('dotenv').config();
const app = express();


app.use(express.json());

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

app.listen(5000, () => console.log('Server is running on port 5000'));