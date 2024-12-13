// these file initialize the app and starts the server
const app = require('./app');
const mongoose = require('mongoose');

// load the env var
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/logistics';

// we connect to mongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
});

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
