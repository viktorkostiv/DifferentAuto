const catchAsync = require('../utils/catchAsync');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getAll = catchAsync(async (req, res, next) => {
    try {
        const ref = admin.firestore().collection('messages');
        const snapshot = await ref.get();
        const data = [];

        snapshot.forEach(doc => {
            data.push(doc.data());
        });

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.getById = catchAsync(async (req, res, next) => {
    try {
        const id = req.params.id;
        const ref = admin.firestore().collection('messages').doc(id);

        const message = (await ref.get()).data();

        if (!message) {
            throw new Error('Message not found');
        }

        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.setStatus = catchAsync(async (req, res, next) => {
    try {
        const {
            data,
        } = req.body;

        const ref = admin.firestore().collection('messages').doc(data.id);
        const el = (await ref.get()).data();

        if (!el) {
            throw new Error('Message not found');
        }

        await ref.update({
            status: data.status,
        }).then(() => {
            console.log('Message status updated');
        });

        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.delete = catchAsync(async (req, res, next) => {
    try {
        const id = req.params.id;

        const ref = admin.firestore().collection('messages').doc(id);
        const message = await ref.get();

        if (!message.exists) {
            return res.status(404).json({
                status: 'error',
                message: 'Message not found'
            });
        }

        await ref.delete();

        res.status(200).json({
            status: 'success',
            message: `Message ${id} deleted successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});

exports.create = catchAsync(async (req, res, next) => {
    try {
        const {
            data,
        } = req.body;

        data.createdAt = new Date(data.createdAt);

        const ref = admin.firestore().collection('messages');

        const querySnapshot = await ref.where('email', '==', data.email).orderBy('createdAt').get();
        const messages = [];
        querySnapshot.forEach(doc => {
            messages.push(doc.data());
        });

        if (messages.length >= 5) {
            const oldestMessage = messages[0];
            await ref.doc(oldestMessage.id).delete();
            console.log(`Oldest message with id ${oldestMessage.id} was deleted`);
        }

        ref.doc(data.id).set(data);
        console.log(`Message was created with id ${data.id}`);

        const emailBody = `
        <img style="width: 180px; margin: 0 auto" src="http://cdn.mcauto-images-production.sendgrid.net/96b5621ed44f8e09/b63b2a78-ba22-4532-ad4c-cb322cfb6dbe/497x186.png" alt="logo">
        <br>
        <br>
        <p>Nome: <b>${data.name}</b></p>
        <p>Email: <b>${data.email}</b></p>
        <br>
        <br>
        <p>Message:<br><br>${data.message}</p>
    `;

        const msg = {
            to: process.env.EMAIL_TO,
            from: process.env.EMAIL_FROM,
            subject: 'Different Auto Email',
            html: emailBody,
        };

        try {
            await sgMail.send(msg);
            console.log('Email sent');
        } catch (error) {
            console.error(error);
        }

        res.status(200).json({
            status: 'success'
        });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.code);
    }
});