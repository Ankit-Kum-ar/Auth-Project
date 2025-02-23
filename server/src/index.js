const express = require('express');
const dbConnection = require('./config/dbConnection');
const authRouter = require('./routes/authRoutes');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Hello World from Express');
});

// Routes
app.use('/auth', authRouter);

const PORT = process.env.PORT || 5000;
dbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
});