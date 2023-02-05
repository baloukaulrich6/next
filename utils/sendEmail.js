import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import {activateEmailTemplate} from '../emails/activateEmailTemplate'

const OAuth2 = google.auth.OAuth2
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground/"
const {
    MAILING_SERVICE_CLIENT_ID, 
    MAILING_SERVICE_CLIENT_SECRET, 
    MAILING_SERVICE_CLIENT_REFRESH_TOKEN, 
    SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID, 
    MAILING_SERVICE_CLIENT_SECRET, 
    MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
    OAUTH_PLAYGROUND 
)

//send the email

export const sendEmail = (to, url, txt, subject, template) =>{
    oauth2Client.setCredentials({
        refresh_token: MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
    });
    const accessToken = oauth2Client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            type: "OAuth2",
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_CLIENT_REFRESH_TOKEN,
            accessToken
        }
    });
    const mailOption ={
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: subject,
        html: template(to, url),
    }
    smtpTransport.sendMail(mailOption,(err, info)=>{
        if(err) return err
        return info
    })
}