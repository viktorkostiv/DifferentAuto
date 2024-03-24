const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
const xss = require('xss-clean');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const admin = require("firebase-admin");

const AuthRouter = require('./routes/AuthRouter');
const CarsRouter = require('./routes/CarsRouter');

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyDZ1ungctjmSX0sgbpnqiXIVNY-GQmza9c",
    authDomain: "different-auto.firebaseapp.com",
    databaseURL: "https://different-auto-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "different-auto",
    storageBucket: "different-auto.appspot.com",
    messagingSenderId: "1001724905023",
    appId: "1:1001724905023:web:69a13cf03d57b1c6b21a8a",
    measurementId: "G-65WCXWJ7BX"
});

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

app.use('/auth', AuthRouter);
app.use('/api/cars', CarsRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

module.exports = app;