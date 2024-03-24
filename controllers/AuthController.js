const catchAsync = require('../utils/catchAsync');
const admin = require('firebase-admin');
const {
    getAuth,
    sendPasswordResetEmail,
} = require("firebase/auth");
const {
    initializeApp
} = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyDZ1ungctjmSX0sgbpnqiXIVNY-GQmza9c",
    authDomain: "different-auto.firebaseapp.com",
    databaseURL: "https://different-auto-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "different-auto",
    storageBucket: "different-auto.appspot.com",
    messagingSenderId: "1001724905023",
    appId: "1:1001724905023:web:69a13cf03d57b1c6b21a8a",
    measurementId: "G-65WCXWJ7BX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

exports.userAuth = catchAsync(async (req, res, next) => {
    try {
        const idToken = req.headers.auth;

        await admin.auth().verifyIdToken(idToken).then(async () => {
            const decodedToken = await admin.auth().verifyIdToken(idToken);
            const uid = decodedToken.uid;
            const user = await admin.auth().getUser(uid);
            res.status(200).json({
                status: 'success',
                user
            });
        }).catch(() => {
            res.status(403).send('Unauthorized')
        })
    } catch {
        res.status(403).send('Unauthorized')
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    try {
        const {
            email
        } = req.body;

        const userRef = admin.firestore().collection('admins');
        const query = userRef.where('email', '==', email).limit(1);
        const snapshot = await query.get();

        if (snapshot.empty) {
            throw new Error(`User Not Found ${email}`, 'auth/user-not-found');
        }

        sendPasswordResetEmail(auth, email).then(() => {
            console.log('Password reset email sent');
        });

        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            code: error.code
        });
    }
});

exports.getUser = catchAsync(async (req, res, next) => {
    try {
        const uid = req.headers.uid
        const userRef = admin.firestore().collection('admins').doc(uid);
        const userInf = await userRef.get();
        const user = {
            email: userInf._fieldsProto.email ? userInf._fieldsProto.email.stringValue : '',
            role: userInf._fieldsProto.role ? userInf._fieldsProto.role.stringValue : 'user',
            uid: userInf._fieldsProto.uid.stringValue,
        };

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({
            message: error.message
        });
    }
});
