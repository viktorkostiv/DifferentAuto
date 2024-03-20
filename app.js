const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
const xss = require('xss-clean');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
// const admin = require("firebase-admin");

// const AuthRouter = require('./routes/AuthRouter');

// const serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://villa-cielgacha-default-rtdb.europe-west1.firebasedatabase.app",
//     storageBucket: "villa-cielgacha.appspot.com",
// });

const app = express();
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.use(express.json());

// app.use(helmet());

const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    massage: "Too many requests from this IP, please try again in an hour",
});
app.use('/', limiter);
app.use(cors());
app.use(xss());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression())

// app.use('/auth', AuthRouter);
// app.use('/api/rooms', RoomsRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

module.exports = app;