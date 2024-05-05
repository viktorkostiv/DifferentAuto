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
        <div style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <img src="http://cdn.mcauto-images-production.sendgrid.net/96b5621ed44f8e09/b63b2a78-ba22-4532-ad4c-cb322cfb6dbe/497x186.png" alt="Company Logo" style="display: block; margin: 0 auto; max-width: 80%;">
                <div style="margin-top: 60px;">
                    <p>Recebemos um novo pedido de um utilizador através do formulário de contacto no nosso site. Aqui estão os detalhes do pedido:</p>
                    <br>
                    <p><b>Nome do Utilizador:</b> ${data.name}</p>
                    <p><b>E-mail:</b> ${data.email}</p>
                    <p><b>Mensagem:</b> ${data.message}</p>
                    <br>
                    <p>Por favor, entre em contacto com o utilizador assim que possível e forneça uma resposta ao seu pedido. Se tiver alguma dúvida ou precisar de mais informações, por favor, avise-me.</p>
                    <br>
                    <p>Obrigado.</p>
                </div>
            </div>
        </div>
        `;

        const userEmailBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <img src="http://cdn.mcauto-images-production.sendgrid.net/96b5621ed44f8e09/b63b2a78-ba22-4532-ad4c-cb322cfb6dbe/497x186.png" alt="Company Logo" style="display: block; margin: 0 auto; max-width: 80%;">
                <div style="margin-top: 60px;">
                    <p>Caro  ${data.name},</p>
                    <p>Obrigado pela sua mensagem! Recebemos o seu pedido e entraremos em contacto consigo em breve.</p>
                    <p>Se tiver alguma pergunta urgente ou precisar de mais assistência, sinta-se à vontade para nos contactar diretamente por telefone através do <b>+351967174525</b> ou por email em <b>differentauto19@gmail.com</b>.</p>
                    <p>Mais uma vez, obrigado por nos contactar!</p>
                    <p style="margin-top: 20px; font-style: italic;">Cumprimentos,<br>Equipa Different Auto</p>
                </div>
                <div style="margin-top: 40px; margin-bottom: 40px; background: #ffffff; height: 1px; width: 100%;"></div>
                <div>
                    <p>Dear ${data.name},</p>
                    <p>Thank you for your message! We have received your inquiry and will get back to you shortly.</p>
                    <p>If you have any urgent questions or need further assistance, please feel free to contact us directly by phone at <b>+351967174525</b> or by email at <b>differentauto19@gmail.com</b>.</p>
                    <p>Once again, thank you for reaching out to us!</p>
                    <p style="margin-top: 20px; font-style: italic;">Best regards,<br>Different Auto Team</p>
                </div>
            </div>
        </div>
        `

        const msg = {
            to: process.env.EMAIL_TO,
            from: process.env.EMAIL_FROM,
            subject: 'Different Auto Email',
            html: emailBody,
        };

        const userMsg = {
            to: data.email,
            from: process.env.EMAIL_FROM,
            subject: 'Different Auto Email',
            html: userEmailBody,
        }

        try {
            await sgMail.send(msg);
            await sgMail.send(userMsg);
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