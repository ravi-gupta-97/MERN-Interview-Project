import cron from 'node-cron';
import nodemailer from 'nodemailer'
import userModel from '../models/userModel.js';
import { getDateDifference } from './helper.js';

const sendMail = async (selectedEmails) => {
    nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: '',
            pass: ''
        }
    });

    const mailOptions = {
        from: 'Node Project',
        to: selectedEmails,
        subject: 'Remainder to Login',
        html: '<p>Its an remainder for you to login in to your app</p>'
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('mail has been sent', info.response);
        }
    })

}


export const sendMailToUsers = () => {
    cron.schedule('30 2 * * *', async function () {
        let users = await userModel.find({});
        if (users.length > 0) {
            var emails = [];
            users.map((key) => {
                const currentDate = new Date();
                const numOfDays = getDateDifference(currentDate, key.lastLogin);
                if (numOfDays > 5) {
                    emails.push(key.email);
                }
            })
            sendMail(emails);
        }
    })
}
